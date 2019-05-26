import { INode } from "../Node";
export interface IDepthParams {
  tops: INode[];
  gap: [number, number];
}
export declare function allocateDepth(
  results: any,
  pendingNodes: any,
  depth: number
): any;
/**
 *
 * @param results
 * @param middle
 * @param gap
 * @param marginTop
 */
export declare function locateCoordinate(
  results: any,
  middle: any,
  gap: any,
  marginTop: any
): number;
export declare function depth(params: IDepthParams): void;
