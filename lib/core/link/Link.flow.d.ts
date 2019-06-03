import { Link, ILink, ITopoLinkOption } from './Link';
export declare class FlowLink extends Link implements ILink {
  private animationRecorder;
  constructor(option: ITopoLinkOption);
  active(): void;
  deactive(): void;
}
