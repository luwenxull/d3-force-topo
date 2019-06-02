/**
 * 计算多边形的每个点的位置
 *
 * @export
 * @param {[number, number]} center
 * @param {number} radius
 * @param {number} num
 * @returns {[number, number][]}
 */
export function getPolygonPoints(center, radius, num) {
  const radianGap = (Math.PI * 2) / num;
  const points = [];
  let i = 0;
  while (i < num) {
    points.push([
      center[0] + radius * Math.cos(i * radianGap + Math.PI / 2),
      center[1] + radius * Math.sin(i * radianGap + Math.PI / 2)
    ]);
    i += 1;
  }
  return points;
}
/**
 * 计算贝塞尔曲线的controlpoint
 * 控制点落在两点连线外侧
 * TODO: bug fix 当 y1=y2 时
 *
 * @param {[number, number]} [x1, y1]
 * @param {[number, number]} [x2, y2]
 * @param {number} d
 * @returns {[number, number]}
 */
function getControlPoint([x1, y1], [x2, y2], d) {
  const slope = (x1 - x2) / (y2 - y1);
  const radian = Math.atan(slope);
  let dx = d * Math.cos(radian);
  let dy = d * Math.sin(radian);
  const middleX = (x1 + x2) / 2;
  const middleY = (y1 + y2) / 2;
  if ((middleX > 0 && dx < 0) || (middleX < 0 && dx > 0)) {
    dx = -dx;
    dy = -dy;
  }
  return [middleX + dx, middleY + dy];
}
/**
 * 将直线连接的points转成稍微有弧度的path
 *
 * @export
 * @param {[number, number][]} points
 * @param {number} d
 * @returns {string}
 */
export function roundedPoints(points, d) {
  points.push(points[0]);
  return points.reduce((acc, ep, i) => {
    if (i === 0) {
      acc = `M${ep.toString()}`;
    } else {
      const sp = points[i - 1];
      const cp = getControlPoint(sp, ep, d);
      acc += `Q ${cp.toString()} ${ep.toString()}`;
    }
    return acc;
  }, "");
}
