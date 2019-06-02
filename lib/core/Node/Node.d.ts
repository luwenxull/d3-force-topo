import { IRenderObject } from "@luwenxull/svg-render-object";
export interface INode {
  id: string;
  renderObject: IRenderObject;
  connects: Set<INode>;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  connectTo(taget: INode): INode;
  on(event: string, callback: (node: INode) => void): INode;
}
export interface ITopoNodeOption {
  img: string;
  size: number;
}
export declare class Node implements INode {
  id: string;
  renderObject: IRenderObject;
  connects: Set<Node>;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  protected imageRenderObject: IRenderObject;
  constructor(id: string, option: ITopoNodeOption);
  /**
   * 链接另一点
   * *TopoNode的链接不区分方向, 方向由TopoLink负责区分
   *
   * @param {Node} target
   * @returns {this}
   * @memberof TopoNode
   */
  connectTo(target: Node): this;
  on(event: string, callback: (node: Node) => void): this;
}
