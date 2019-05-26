export function allocateDepth(results, pendingNodes, depth) {
  const nextPendingNodes = [];
  if (depth === 0) {
    pendingNodes.forEach(node => {
      node.depth = depth;
    });
  }
  pendingNodes.forEach(node => {
    node.connects.forEach(({ node }) => {
      // 尚未分配深度
      if (typeof node.depth !== "number") {
        node.depth = depth + 1;
        nextPendingNodes.push(node);
      }
    });
  });
  if (nextPendingNodes.length) {
    results = results.concat(allocateDepth(nextPendingNodes, depth + 1));
  }
  return results;
}
/**
 *
 * @param results
 * @param middle
 * @param gap
 * @param marginTop
 */
export function locateCoordinate(results, middle, gap, marginTop) {
  const [w, h] = gap;
  let minx = 0;
  let maxX = 0;
  _.forEach(results, ({ depth, nodes }) => {
    const expectX = _.reduce(
      nodes,
      (acc, node) => {
        // 手机父节点x坐标
        const parentsNeedSkip = new Set();
        const parentX = _.reduce(
          node.connects,
          (acc, { node: { id, depth, position } }) => {
            if (!parentsNeedSkip.has(id) && depth === node.depth - 1) {
              acc.push(position.x);
              parentsNeedSkip.add(id);
            }
            return acc;
          },
          [] /* 记录父节点的所有x坐标 */
        );
        // 预期x坐标
        acc.push(
          _.reduce(parentX, (acc, x) => acc + x, 0) / (parentX.length || 1)
        );
        return acc;
      },
      []
    );
    const standardX =
      _.reduce(expectX, (acc, x) => acc + x, 0) / (expectX.length || 1);
    const standardIndex = (nodes.length - 1) / 2;
    let depthMaxX = 0;
    let depthMinX = 0;
    _.forEach(expectX, x => {
      depthMinX = Math.min(depthMinX, x);
      depthMaxX = Math.max(depthMaxX, x);
    });
    const gapX = Math.max(
      (depthMaxX - depthMinX) / (expectX.length - 1 || 1),
      w
    );
    _.forEach(nodes, (node, i) => {
      const x = (i - standardIndex) * gapX + standardX;
      minx = Math.min(minx, x);
      maxX = Math.max(maxX, x);
      node.position = {
        x,
        y: depth * h
      };
    });
  });
  return (maxX + minx) / 2;
}
export function depth(params) {}
