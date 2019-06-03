import { RenderObject } from "@luwenxull/svg-render-object";
export class Node {
  constructor(option) {
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
  on(event, callback) {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }
  sync() {
    this.renderObject.position = this.position;
    return this;
  }
}
