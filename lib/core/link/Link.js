import { RenderObject } from '@luwenxull/svg-render-object';
export class Link {
  constructor(option) {
    const { id, from, to, color = '#000', width = 1 } = option;
    this.id = id;
    this.from = from;
    this.to = to;
    this.renderObject = new RenderObject('g');
    this.pathRenderObject = new RenderObject('path', {
      attr: {
        stroke: color,
        'stroke-width': width
      }
    });
    this.renderObject.add(this.pathRenderObject);
  }
  on(event, callback) {
    this.renderObject.on(event, () => {
      callback(this);
    });
    return this;
  }
  sync() {
    const { from, to } = this;
    this.pathRenderObject.attr.d = `M${from.position.x},${from.position.y} L${
      to.position.x
    },${to.position.y}`;
    return this;
  }
}
