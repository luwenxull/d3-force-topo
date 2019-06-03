import { flow } from '@luwenxull/svg-render-object';
import { Link, ILink, ITopoLinkOption } from './Link';

export class FlowLink extends Link implements ILink {
  private animationRecorder: { flowId?: number };
  constructor(option: ITopoLinkOption) {
    super(option);
    this.animationRecorder = {};
  }

  public active() {
    if (this.renderObject.ele_selection) {
      this.renderObject.attr['stroke-dasharray'] = '5 2';
      this.renderObject.needUpdateSurface = true;
      this.renderObject.update();
      flow(
        this.renderObject.ele_selection,
        this.animationRecorder,
        -0.1
      );
    }
  }

  public deactive() {
    if (typeof this.animationRecorder.flowId === 'number') {
      this.renderObject.attr['stroke-dasharray'] = '0';
      this.renderObject.needUpdateSurface = true;
      this.renderObject.update();
      cancelAnimationFrame(this.animationRecorder.flowId);
    }
  }
}
