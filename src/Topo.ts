import { IRenderObject, RenderObject } from "@luwenxull/svg-render-object";
import { select, Selection } from "d3-selection";
import { zoom, zoomTransform, zoomIdentity, ZoomBehavior } from "d3-zoom";
import { ILink, INode } from "./core";

export interface ITopo {
  dom: HTMLElement | null;
  nodes: INode[];
  model(fn: () => number): ITopo;
}

export class Topo implements ITopo {
  public dom: HTMLElement | null;
  private _model?: () => number;
  private _svg?: Selection<SVGSVGElement, any, any, any>;
  private rootGroupRenderObject: IRenderObject;
  private nodeGroupRenderObject: IRenderObject;
  private linkGroupRenderObject: IRenderObject;
  private zoomBehavior?: ZoomBehavior<SVGSVGElement, any>;
  constructor(public nodes: INode[], public links: ILink[]) {
    this.dom = null;
    this.rootGroupRenderObject = new RenderObject("g", {
      attr: {
        "data-name": "root-group"
      }
    });
    this.nodeGroupRenderObject = new RenderObject("g", {
      attr: {
        "data-name": "node-group"
      }
    });
    this.linkGroupRenderObject = new RenderObject("g", {
      attr: {
        "data-name": "link-group"
      }
    });
    this.rootGroupRenderObject
      .add(this.linkGroupRenderObject)
      .add(this.nodeGroupRenderObject);
  }

  // hook(hooks) {
  //   _.assign(this.hooks, hooks)
  // }

  model(fn: () => number): ITopo {
    this._model = fn;
    return this;
  }

  /**
   * 绘制拓扑入口函数
   * 该方法会重新生成所有的renderObject
   * @param links
   * @param tops
   */
  render(dom: HTMLElement) {
    if (this._model) {
      this.dom = dom;
      dom.textContent = ""; // 清空已有内容
      this._svg = select(dom)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");
      // 基于模型计算位置
      const center = this._model();
      this.nodes.forEach(node => {
        node.sync();
        this.nodeGroupRenderObject.add(node.renderObject);
      });
      this.links.forEach(link => {
        link.sync();
        this.linkGroupRenderObject.add(link.renderObject);
      });
      this.rootGroupRenderObject.renderTo(this._svg.node() as SVGElement);
      this.enableZoom();
      this.center(center);
    } else {
      throw new Error("Need a model! model can be force or hierarchy.");
    }
  }

  // update() {
  //   _.forEach(this.nodeRenderObjects, obj => obj.update())
  //   _.forEach(this.linkRenderObjects, obj => obj.update())
  // }

  enableZoom() {
    if (this._svg) {
      let zoomBehavior = zoom<SVGSVGElement, any>().scaleExtent([0.4, 4]);
      // .filter(() => event.type === 'wheel')
      this._svg.call(
        zoomBehavior.on("zoom", () => {
          if (this._svg) {
            const transform = zoomTransform(this._svg.node() as SVGElement);
            this.rootGroupRenderObject.attr.transform = transform.toString();
            this.rootGroupRenderObject.needUpdateSurface = true;
            this.rootGroupRenderObject.update();
          }
        })
      );
      this.zoomBehavior = zoomBehavior;
    }
  }

  /**
   * 使拓扑水平居中
   * @param {number} center
   * @memberof Topo
   */
  center(center: number) {
    if (this.dom && this._svg && this.zoomBehavior) {
      this._svg.call(
        this.zoomBehavior.transform,
        zoomIdentity.translate(this.dom.clientWidth / 2 - center, 100)
      );
    }
  }
}
