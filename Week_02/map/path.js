function sleep(delay = 100) {
  return new Promise(function (res) {
    setTimeout(res, delay);
  });
}

async function path(map, start, end) {
  const mapCopy = Object.create(map);
  const queue = [start];

  async function insert(x, y, previousPosition) {
    const isOutRange = x < 0 || x >= 100 || y < 0 || y >= 100;
    if (isOutRange) return;

    const index = x + y * 100;
    if (mapCopy[index]) return;

    await sleep(5);
    container.children[index].classList.add("search");

    mapCopy[index] = previousPosition;
    queue.push([x, y]);
  }

  while (queue.length) {
    let [x, y] = queue.shift();
    const [endX, endY] = end;
    if (x === endX && y === endY) {
      const path = [];
      const [startX, startY] = start;
      while (x !== startX || y !== startY) {
        const index = x + y * 100;
        path.push(map[index]);
        [x, y] = mapCopy[index];
        await sleep(5);
        container.children[index].classList.add("path");
      }
      return path;
    }

    await insert(x - 1, y, [x, y]);
    await insert(x, y - 1, [x, y]);
    await insert(x + 1, y, [x, y]);
    await insert(x, y + 1, [x, y]);
    await insert(x - 1, y - 1, [x, y]);
    await insert(x + 1, y - 1, [x, y]);
    await insert(x - 1, y + 1, [x, y]);
    await insert(x + 1, y + 1, [x, y]);
  }
  return null;
}
