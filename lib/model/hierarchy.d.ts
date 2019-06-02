import { INode } from "../core/Node/Node";
export interface IHierarchyParams {
  tops: INode[];
  gap: [number, number];
}
/**
 * 分配depth
 *
 * @export
 * @param {{ depth: number; nodes: INode[] }[]} results
 * @param {INode[]} levelNodes
 * @param {number} depth
 * @returns
 */
export declare function allocateDepth(
  results: {
    depth: number;
    nodes: INode[];
  }[],
  levelNodes: INode[],
  depth: number
): {
  depth: number;
  nodes: INode[];
}[];
/**
 * 分配postion
 *
 * @export
 * @param {{ depth: number; nodes: INode[] }[]} results
 * @param {[number, number]} gap
 * @returns
 */
export declare function locateCoordinate(
  results: {
    depth: number;
    nodes: INode[];
  }[],
  gap: [number, number]
): number;
/**
 * 生成层级拓扑模型
 *
 * @export
 * @param {IHierarchyParams} params
 * @returns {() => number}
 */
export declare function hierarchyModel(params: IHierarchyParams): () => number;
