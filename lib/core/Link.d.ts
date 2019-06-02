import { IRenderObject } from "@luwenxull/svg-render-object";
export interface ILink {
  id: string;
  renderObject: IRenderObject;
  connects: Set<ILink>;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  connectTo(taget: ILink): ILink;
  on(event: string, callback: (node: ILink) => void): ILink;
  active(): ILink;
  deActive(): ILink;
}
export interface ITopoNodeOption {
  img: string;
  size: number;
}
export declare class Link implements ILink {
  id: string;
  renderObject: IRenderObject;
  connects: Set<Link>;
  position: {
    x: number;
    y: number;
  };
  depth?: number;
  private frontRenderObject;
  private backRenderObject;
  constructor(id: string, option: ITopoNodeOption);
  /**
   * 链接另一点
   * *TopoNode的链接不区分方向, 方向由TopoLink负责区分
   *
   * @param {Link} target
   * @returns {this}
   * @memberof TopoNode
   */
  connectTo(target: Link): this;
  on(event: string, callback: (node: Link) => void): this;
  active(): this;
  deActive(): this;
}
