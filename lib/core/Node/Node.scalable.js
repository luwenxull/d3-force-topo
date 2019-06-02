import { RenderObject, scale } from "@luwenxull/svg-render-object";
import { roundedPoints, getPolygonPoints } from "../../util";
import { Node } from "./Node";
export class ScalableNode extends Node {
  constructor(id, option) {
    // this.connects = []
    super(id, option);
    this.id = id;
    const { img, size } = option;
    this.backRenderObject = new RenderObject("path", {
      attr: {
        d: roundedPoints(getPolygonPoints([0, 0], size / 2, 6), 1),
        fill: "none",
        stroke: "#000"
      },
      visible: false
    });
    debugger;
    this.renderObject.add(this.backRenderObject);
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
