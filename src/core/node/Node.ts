import { IRenderObject, RenderObject } from "@luwenxull/svg-render-object";

export interface INode {
  id: string | number;
  renderObject: IRenderObject;
  position: { x: number; y: number };
  depth?: number;
  on(event: string, callback: (node: INode) => void): INode;
  sync(): INode;
}

export interface ITopoNodeOption {
  id: string | number;
  img: string;
  size: number;
}

export class Node implements INode {
  public id: string | number;
  public renderObject: IRenderObject;
  public position: { x: number; y: number };
  public depth?: number;
  protected imageRenderObject: IRenderObject;
  constructor(option: ITopoNodeOption) {
    const { id, img, size } = option;
    this.id = id;
    this.renderObject = new RenderObject("g");
    this.imageRenderObject = new RenderObject("image", {
      attr: {
        href: img,
        width: size,
        height: size,
        x: -size / 2,
        y: -size / 2
      }
    });
    this.position = { x: 0, y: 0 };
    this.renderObject.add(this.imageRenderObject);
  }

  public on(event: string, callback: (node: Node) => void): this {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }

  public sync(): this {
    this.renderObject.position = this.position;
    return this;
  }
}
