import { INode, Node, ITopoNodeOption } from "./Node";
export declare class ScalableNode extends Node implements INode {
  id: string;
  private backRenderObject;
  constructor(id: string, option: ITopoNodeOption);
  active(): this;
  deActive(): this;
}
