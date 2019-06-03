import { IRenderObject } from "@luwenxull/svg-render-object";
export interface INode {
  id: string | number;
  renderObject: IRenderObject;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  on(event: string, callback: (node: INode) => void): INode;
  sync(): INode;
}
export interface ITopoNodeOption {
  id: string | number;
  img: string;
  size: number;
}
export declare class Node implements INode {
  id: string | number;
  renderObject: IRenderObject;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  protected imageRenderObject: IRenderObject;
  constructor(option: ITopoNodeOption);
  on(event: string, callback: (node: Node) => void): this;
  sync(): this;
}
