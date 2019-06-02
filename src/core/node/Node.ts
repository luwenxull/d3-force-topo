import { IRenderObject, RenderObject } from "@luwenxull/svg-render-object";

export interface INode {
  id: string;
  renderObject: IRenderObject;
  connects: Set<INode>;
  position: { x: number; y: number };
  depth?: number;
  connectTo(taget: INode): INode;
  on(event: string, callback: (node: INode) => void): INode;
}

export interface ITopoNodeOption {
  img: string;
  size: number;
}

export class Node implements INode {
  public renderObject: IRenderObject;
  public connects: Set<Node>;
  public position: { x: number; y: number };
  public depth?: number;
  protected imageRenderObject: IRenderObject;
  constructor(public id: string, option: ITopoNodeOption) {
    // this.connects = []
    const { img, size } = option;
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
    this.connects = new Set();
    this.position = { x: 0, y: 0 };
    this.renderObject.add(this.imageRenderObject);
  }

  /**
   * 链接另一点
   * *TopoNode的链接不区分方向, 方向由TopoLink负责区分
   *
   * @param {Node} target
   * @returns {this}
   * @memberof TopoNode
   */
  public connectTo(target: Node): this {
    this.connects.add(target);
    // 添加双向链接
    target.connects.add(this);
    return this;
  }

  on(event: string, callback: (node: Node) => void): this {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }
}
