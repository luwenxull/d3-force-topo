import { IRenderObject } from "@luwenxull/svg-render-object";
import { INode } from "../node";
export interface ILink {
  id: string | number;
  renderObject: IRenderObject;
  from: INode;
  to: INode;
  on(event: string, callback: (node: ILink) => void): ILink;
  sync(): ILink;
}
export interface ITopoLinkOption {
  id: string | number;
  from: INode;
  to: INode;
  color?: string;
  width?: number;
}
export declare class Link implements ILink {
  id: string | number;
  renderObject: IRenderObject;
  from: INode;
  to: INode;
  protected pathRenderObject: IRenderObject;
  constructor(option: ITopoLinkOption);
  on(event: string, callback: (node: Link) => void): this;
  sync(): this;
}
