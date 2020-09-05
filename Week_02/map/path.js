function sleep(delay = 100) {
  return new Promise(function (res) {
    setTimeout(res, delay);
  });
}

class Sorted {
  constructor(data = [], compare = (a, b) => a - b) {
    this.data = [data];
    this.compare = compare;
  }

  /**
   * 取出数组中最小的一项
   */
  take() {
    if (!this.data.length) return;

    let min = this.data[0];
    let minIndex = 0;

    this.data.forEach((item, index) => {
      if (this.compare(item, min) < 0) {
        min = item;
        minIndex = index;
      }
    });

    /**将数组最小项赋值为最后一项，并推出最后一项 */
    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();

    return min;
  }

  give(item) {
    this.data.push(item);
  }

  get length() {
    return this.data.length;
  }
}

/**
 * 比较用，为了节约运算，没有开方
 */
function distance([x, y], [endX, endY]) {
  return (x - endX) ** 2 + (y - endY) ** 2;
}

async function path(map, start, end) {
  const mapCopy = Object.create(map);
  const queue = new Sorted(
    start,
    (a, b) => distance(a, end) - distance(b, end)
  );

  async function insert(x, y, previousPosition) {
    const isOutRange = x < 0 || x >= 100 || y < 0 || y >= 100;
    if (isOutRange) return;

    const index = x + y * 100;
    if (mapCopy[index]) return;

    await sleep(5);
    container.children[index].classList.add("search");

    mapCopy[index] = previousPosition;
    queue.give([x, y]);
  }

  while (queue.length) {
    let [x, y] = queue.take();
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
