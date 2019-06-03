import { ILink, INode } from './core';
export interface ITopo {
  dom: HTMLElement | null;
  nodes: INode[];
  model(fn: () => number): ITopo;
}
export declare class Topo implements ITopo {
  nodes: INode[];
  links: ILink[];
  dom: HTMLElement | null;
  private _model?;
  private _svg?;
  private rootGroupRenderObject;
  private nodeGroupRenderObject;
  private linkGroupRenderObject;
  private zoomBehavior?;
  constructor(nodes: INode[], links: ILink[]);
  model(fn: () => number): ITopo;
  /**
   * 绘制拓扑入口函数
   * 该方法会重新生成所有的renderObject
   * @param links
   * @param tops
   */
  render(dom: HTMLElement): void;
  enableZoom(): void;
  /**
   * 使拓扑水平居中
   * @param {number} center
   * @memberof Topo
   */
  center(center: number): void;
}
