import { RenderObject, scale } from '@luwenxull/svg-render-object';
import { roundedPoints, getPolygonPoints } from '../../util';
import { Node } from './Node';
export class ScaleNode extends Node {
  constructor(option) {
    // this.connects = []
    super(option);
    const { img, size } = option;
    this.backRenderObject = new RenderObject('path', {
      attr: {
        d: roundedPoints(getPolygonPoints([0, 0], size / 2, 6), 1),
        fill: 'none',
        stroke: '#000'
      },
      visible: false
    });
    this.renderObject.add(this.backRenderObject);
  }
  active() {
    this.backRenderObject.visible = true;
    this.backRenderObject.update();
    if (this.backRenderObject.ele_selection) {
      scale(this.backRenderObject.ele_selection, 1.3);
    }
    return this;
  }
  deActive() {
    if (this.backRenderObject.ele_selection) {
      scale(this.backRenderObject.ele_selection, 1, () => {
        this.backRenderObject.visible = false;
        this.backRenderObject.update();
      });
    }
    return this;
  }
}
