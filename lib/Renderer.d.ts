import { IDepthParams, IForceParams } from "./model";
import { INode } from "./Node";
export interface ITopo {
  dom: HTMLElement | null;
  model(name: "depth", params: IDepthParams): ITopo;
  model(name: "force", params: any): ITopo;
}
export declare class Topo implements ITopo {
  dom: HTMLElement | null;
  private _modelName;
  private _modelParams;
  private rootGroupRenderObject;
  private nodeGroupRenderObject;
  private linkGroupRenderObject;
  constructor(Nodes: INode[]);
  model(name: "depth", params: IDepthParams): ITopo;
  model(name: "force", params: IForceParams): ITopo;
  /**
   * 绘制拓扑入口函数
   * 该方法会重新生成所有的renderObject
   * @param links
   * @param tops
   */
  render(dom: HTMLElement, nodes: INode[]): void;
  renderNodes(nodes: any): void;
  renderLinks(links: any): void;
  /**
   * 初始化linkRenderer
   * @param links
   */
  initLinksRenderObjects(links: any): void;
  update(): void;
  enableZoom(): void;
  /**
   * 使拓扑水平居中
   * @param center
   */
  center(center: any): void;
}
