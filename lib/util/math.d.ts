/**
 * 计算多边形的每个点的位置
 *
 * @export
 * @param {[number, number]} center
 * @param {number} radius
 * @param {number} num
 * @returns {[number, number][]}
 */
export declare function getPolygonPoints(center: [number, number], radius: number, num: number): [number, number][];
/**
 * 将直线连接的points转成稍微有弧度的path
 *
 * @export
 * @param {[number, number][]} points
 * @param {number} d
 * @returns {string}
 */
export declare function roundedPoints(points: [number, number][], d: number): string;
