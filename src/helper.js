function countDirection(dir, i, square, width, height) {
  let count = 0;
  console.log('ii', i);
  const turn = square[i].value;
  let block = 0;
  const mark = [];
  const check = (x, y) => x >= 0 && x < width && (y >= 0 && y < height);
  const countByTrend = trend => {
    let x = i % width;
    let y = Math.floor(i / width);
    let index = i;
    while (
      check(x, y) &&
      square[index] != null &&
      square[index].value === turn
    ) {
      count += 1;
      mark.push(index);
      x += dir[trend][0];
      y += dir[trend][1];
      index = y * width + x;
    }
    if (check(x, y) && square[index] != null && square[index].value !== turn) {
      block += 1;
    }
  };
  countByTrend(0); //  up trend
  countByTrend(1); //  down trend
  count -= 1;
  if (count === 5 && block === 2) return false;
  if (count < 5) return false;
  return mark;
}
function haveWinner(square, i, width = 20, height = 20) {
  const myWidth = Number(width);
  const myHeight = Number(height);
  const dir = [
    [[-1, -1], [1, 1]],
    [[0, -1], [0, +1]],
    [[1, -1], [-1, 1]],
    [[-1, 0], [1, 0]]
  ];
  for (let j = 0; j < 4; j += 1) {
    const result = countDirection(dir[j], i, square, myWidth, myHeight);
    if (result !== false)
      // have a winner
      return {
        arr: result,
        dir: j
      };
  }
  return false;
}
export default haveWinner;
