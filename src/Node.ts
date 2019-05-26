import { IRenderObject, RenderObject } from "@luwenxull/svg-render-object";
import { roundedPoints, getPolygonPoints } from "./util";
import scale from "@luwenxull/svg-render-object/lib/animations/scale";

export interface INode {
  id: string;
  renderObject: IRenderObject;
  connects: Set<INode>;
  position: { x: number; y: number };
  depth?: number;
  connectTo(taget: INode): INode;
  on(event: string, callback: (node: INode) => void): INode;
  active(): INode;
  deActive(): INode;
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
  private frontRenderObject: IRenderObject;
  private backRenderObject: IRenderObject;
  constructor(public id: string, option: ITopoNodeOption) {
    // this.connects = []
    const { img, size } = option;
    this.renderObject = new RenderObject("g");
    this.frontRenderObject = new RenderObject("image", {
      attr: {
        href: img,
        width: size,
        height: size,
        x: -size / 2,
        y: -size / 2
      }
    });
    this.backRenderObject = new RenderObject("path", {
      attr: {
        d: roundedPoints(
          getPolygonPoints([0, 0], size / 2, 6),
          1
        ),
        fill: 'none',
        stroke: '#000'
      },
      visible: false,
    });
    this.renderObject.add(this.backRenderObject).add(this.frontRenderObject);
    this.connects = new Set();
    this.position = { x: 0, y: 0 };
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

  active(): this {
    this.backRenderObject.visible = true
    this.backRenderObject.update()
    scale(this.backRenderObject, 1.3)
    return this;
  }

  deActive(): this {
    scale(this.backRenderObject, 1, () => {
      this.backRenderObject.visible = false
      this.backRenderObject.update()
    })
    return this
  }
}
