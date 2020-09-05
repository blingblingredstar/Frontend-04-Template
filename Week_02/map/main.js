const MAP = "map";

const mouseStatus = {
  mousedown: false,
  clear: false,
};

const saveButton = document.querySelector("#save");

saveButton.addEventListener("click", () => {
  localStorage.setItem(MAP, JSON.stringify(map));
});

const map = localStorage.getItem(MAP)
  ? JSON.parse(localStorage.getItem(MAP))
  : Array(10000).fill(0);

const container = document.querySelector("#container");

map.forEach((cell, index) => {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add("cell");
  cellDiv.setAttribute(`data-index`, index);

  if (cell === 1) cellDiv.classList.add("fill");

  container.appendChild(cellDiv);
});

container.addEventListener("mousemove", (e) => {
  if (!mouseStatus.mousedown) return;

  const cellDiv = e.target;
  const { index } = cellDiv.dataset;

  if (!index) return;

  if (mouseStatus.clear) {
    cellDiv.classList.remove("fill");
    map[index] = 0;
  } else {
    cellDiv.classList.add("fill");
    map[index] = 1;
  }
});

document.addEventListener("mousedown", (e) => {
  mouseStatus.mousedown = true;
  mouseStatus.clear = e.which === 3;
});

document.addEventListener("mouseup", () => {
  mouseStatus.mousedown = false;
});

document.addEventListener("contextmenu", (e) => e.preventDefault());
