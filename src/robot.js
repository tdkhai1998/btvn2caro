const lc = n => {
  const set = [];
  for (let i = -n; i <= n; i += 1) {
    set.push([n, i]);
  }
  for (let i = -n; i <= n; i += 1) {
    set.push([-n, i]);
  }
  for (let i = -n + 1; i <= n - 1; i += 1) {
    set.push([i, n]);
  }
  for (let i = -n + 1; i <= n - 1; i += 1) {
    set.push([i, -n]);
  }
  return set;
};
function shuffle(b) {
  const a = b.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const check = (x, y) => x >= 0 && x < 20 && (y >= 0 && y < 20);
export default (array, value) => {
  const x = Math.floor(value / 20);
  const y = value % 20;
  let c = 1;
  while (c < 20) {
    const arr = shuffle(lc(c));
    for (let i = 0; i < arr.length; i += 1) {
      const xT = x + arr[i][0];
      const yT = y + arr[i][1];
      if (check(xT, yT) && array[xT * 20 + yT] === null) {
        return xT * 20 + yT;
      }
    }
    c += 1;
  }
  return null;
};
