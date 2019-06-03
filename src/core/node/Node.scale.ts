import {
  IRenderObject,
  RenderObject,
  scale
} from '@luwenxull/svg-render-object';
import { roundedPoints, getPolygonPoints } from '../../util';
import { INode, Node, ITopoNodeOption } from './Node';

export class ScaleNode extends Node implements INode {
  private backRenderObject: IRenderObject;
  constructor(option: ITopoNodeOption) {
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

  public active(): this {
    this.backRenderObject.visible = true;
    this.backRenderObject.update();
    if (this.backRenderObject.ele_selection) {
      scale(this.backRenderObject.ele_selection, 1.3);
    }
    return this;
  }

  public deActive(): this {
    if (this.backRenderObject.ele_selection) {
      scale(this.backRenderObject.ele_selection, 1, () => {
        this.backRenderObject.visible = false;
        this.backRenderObject.update();
      });
    }
    return this;
  }
}
