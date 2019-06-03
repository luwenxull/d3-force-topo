import { INode, Node, ITopoNodeOption } from "./Node";
export declare class ScalableNode extends Node implements INode {
  private backRenderObject;
  constructor(option: ITopoNodeOption);
  active(): this;
  deActive(): this;
}
