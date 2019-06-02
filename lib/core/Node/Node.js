import { RenderObject } from "@luwenxull/svg-render-object";
export class Node {
  constructor(id, option) {
    this.id = id;
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
}
