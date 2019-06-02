import { RenderObject } from "@luwenxull/svg-render-object";
import { roundedPoints, getPolygonPoints } from "../util";
import scale from "@luwenxull/svg-render-object/lib/animations/scale";
export class Link {
  constructor(id, option) {
    this.id = id;
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
        d: roundedPoints(getPolygonPoints([0, 0], size / 2, 6), 1),
        fill: "none",
        stroke: "#000"
      },
      visible: false
    });
    this.renderObject.add(this.backRenderObject).add(this.frontRenderObject);
    this.connects = new Set();
    this.position = { x: 0, y: 0 };
  }
  /**
   * 链接另一点
   * *TopoNode的链接不区分方向, 方向由TopoLink负责区分
   *
   * @param {Link} target
   * @returns {this}
   * @memberof TopoNode
   */
  connectTo(target) {
    this.connects.add(target);
    // 添加双向链接
    target.connects.add(this);
    return this;
  }
  on(event, callback) {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }
  active() {
    this.backRenderObject.visible = true;
    this.backRenderObject.update();
    scale(this.backRenderObject, 1.3);
    return this;
  }
  deActive() {
    scale(this.backRenderObject, 1, () => {
      this.backRenderObject.visible = false;
      this.backRenderObject.update();
    });
    return this;
  }
}
