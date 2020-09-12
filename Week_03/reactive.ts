let callbacks: Map<
  Object,
  Map<string | symbol | number, Function[]>
> = new Map();

let reactivities = new Map();

let usedReactivities: Array<[Object, string | symbol | number]> = [];

function effect(callback: Function) {
  usedReactivities = [];
  callback();
  usedReactivities.forEach(([obj, key]) => {
    if (!callbacks.has(obj)) callbacks.set(obj, new Map());

    if (!callbacks.get(obj)!.has(key)) callbacks.get(obj)!.set(key, []);

    callbacks.get(obj)!.get(key)?.push(callback);
  });
}

function reactive(object: any) {
  if (reactivities.has(object)) return reactivities.get(object);

  const proxy: any = new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val;
      callbacks
        .get(obj)
        ?.get(prop)
        ?.forEach((callback) => {
          callback();
        });
      return true;
    },
    get(obj, prop) {
      usedReactivities.push([obj, prop]);
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop]);
      }
      return obj[prop];
    },
  });

  reactivities.set(object, proxy);

  return proxy;
}

const object = {
  r: 1,
  g: 1,
  b: 1,
};

const po = reactive(object);

const ids = ["r", "g", "b"];

ids.forEach((id) => {
  const inputEl = document.getElementById(id) as HTMLInputElement;
  effect(() => {
    inputEl.value = po[id];
  });
  inputEl.addEventListener("input", (e) => {
    po[id] = (e.target as HTMLInputElement).value;
  });
});

effect(() => {
  const color = `rgb(${po.r}, ${po.g}, ${po.b})`;
  const divEl = document.getElementById("color") as HTMLDivElement;
  divEl.style.backgroundColor = color;
  divEl.textContent = color;
});
