import { INode } from "../core/Node/Node";
export interface IConnects {
  [prop: string]: INode[];
}
export interface IHierarchyParams {
  tops: INode[];
  gap: [number, number];
  connects: IConnects;
}
/**
 * 分配depth
 *
 * @export
 * @param {{ depth: number; nodes: INode[] }[]} results
 * @param {IConnects} connects
 * @param {INode[]} nodesOfCurrentDepth
 * @param {number} depth
 * @returns
 */
export declare function allocateDepth(
  results: {
    depth: number;
    nodes: INode[];
  }[],
  connects: IConnects,
  nodesOfCurrentDepth: INode[],
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
 * @param {IConnects} connects
 * @param {[number, number]} gap
 * @returns
 */
export declare function locateCoordinate(
  results: {
    depth: number;
    nodes: INode[];
  }[],
  connects: IConnects,
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
