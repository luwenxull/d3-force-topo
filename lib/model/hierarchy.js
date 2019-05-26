/**
 * 分配depth
 *
 * @export
 * @param {{ depth: number; nodes: INode[] }[]} results
 * @param {INode[]} levelNodes
 * @param {number} depth
 * @returns
 */
export function allocateDepth(results, levelNodes, depth) {
    const deeperNodes = [];
    levelNodes.forEach(node => {
        node.depth = depth;
        node.connects.forEach(node => {
            /**
             * 一个节点的深度取最小的一个
             */
            if (typeof node.depth !== "number" /* 防止深层次节点覆盖低层次节点的depth */) {
                /**
                 * !立即写depth
                 * 基于节点a，depth=0,检索到[b,c], depth=1
                 * 然后基于b，depth=1,检索到[c]
                 * 如果c此时没有写入过depth，会被错误的写入depth=2
                 */
                node.depth = depth + 1;
                deeperNodes.push(node);
            }
        });
    });
    results.push({
        depth,
        nodes: levelNodes
    });
    if (deeperNodes.length) {
        allocateDepth(results, deeperNodes, depth + 1);
    }
    return results;
}
/**
 * 分配postion
 *
 * @export
 * @param {{ depth: number; nodes: INode[] }[]} results
 * @param {[number, number]} gap
 * @returns
 */
export function locateCoordinate(results, gap) {
    const [w, h] = gap;
    let minx = 0;
    let maxX = 0;
    results.forEach(({ depth, nodes }) => {
        const xOfSameDepth = nodes.reduce(
        // 获取每个node的预期x
        (xs, node) => {
            // 首先收集父节点x坐标
            const parentsNeedSkip = new Set();
            const parentsX = Array.from(node.connects).reduce((acc, { id, depth, position }) => {
                if (!parentsNeedSkip.has(id) &&
                    depth === node.depth - 1) {
                    acc.push(position.x);
                    parentsNeedSkip.add(id);
                }
                return acc;
            }, [] /* 记录父节点的所有x坐标 */);
            // 预期x坐标
            xs.push(parentsX.length ? 0 : parentsX.reduce((acc, x) => acc + x, 0));
            return xs;
        }, []);
        const standardX = xOfSameDepth.reduce((acc, x) => acc + x, 0) / xOfSameDepth.length;
        const standardIndex = (nodes.length - 1) / 2;
        let levelMaxX = 0;
        let levelMinX = 0;
        xOfSameDepth.forEach(x => {
            levelMinX = Math.min(levelMinX, x);
            levelMaxX = Math.max(levelMaxX, x);
        });
        const gapX = Math.max((levelMaxX - levelMinX) / (xOfSameDepth.length - 1 || 1), w);
        nodes.forEach((node, i) => {
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
/**
 * 生成层级拓扑模型
 *
 * @export
 * @param {IHierarchyParams} params
 * @returns {() => number}
 */
export function hierarchyModel(params) {
    return () => {
        return locateCoordinate(allocateDepth([], params.tops, 0), params.gap);
    };
}
