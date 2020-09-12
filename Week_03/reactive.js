"use strict";
let callbacks = new Map();
let reactivities = new Map();
let usedReactivities = [];
function effect(callback) {
    usedReactivities = [];
    callback();
    usedReactivities.forEach(([obj, key]) => {
        if (!callbacks.has(obj))
            callbacks.set(obj, new Map());
        if (!callbacks.get(obj).has(key))
            callbacks.get(obj).set(key, []);
        callbacks.get(obj).get(key)?.push(callback);
    });
}
function reactive(object) {
    if (reactivities.has(object))
        return reactivities.get(object);
    const proxy = new Proxy(object, {
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
    const inputEl = document.getElementById(id);
    effect(() => {
        inputEl.value = po[id];
    });
    inputEl.addEventListener("input", (e) => {
        po[id] = e.target.value;
    });
});
effect(() => {
    const color = `rgb(${po.r}, ${po.g}, ${po.b})`;
    const divEl = document.getElementById("color");
    divEl.style.backgroundColor = color;
    divEl.textContent = color;
});
