import { IRenderObject, RenderObject } from "@luwenxull/svg-render-object";
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

export class Link implements ILink {
  public id: string | number;
  public renderObject: IRenderObject;
  public from: INode;
  public to: INode;
  protected pathRenderObject: IRenderObject;
  constructor(option: ITopoLinkOption) {
    const { id, from, to, color = "#000", width = 1 } = option;
    this.id = id;
    this.from = from;
    this.to = to;
    this.renderObject = new RenderObject("g");
    this.pathRenderObject = new RenderObject("path", {
      attr: {
        d: `M${from.position.x},${from.position.y} L${to.position.x},${
          to.position.y
        }`,
        stroke: color,
        "stroke-width": width
      }
    });
    this.renderObject.add(this.pathRenderObject);
  }

  public on(event: string, callback: (node: Link) => void): this {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }

  public sync(): this {
    const { from, to } = this;
    this.pathRenderObject.attr.d = `M${from.position.x},${from.position.y} L${
      to.position.x
    },${to.position.y}`;
    return this;
  }
}
