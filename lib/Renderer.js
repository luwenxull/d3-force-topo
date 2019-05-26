import { zoom, zoomTransform, zoomIdentity } from "d3-zoom";
import { RenderObject } from "@luwenxull/svg-render-object";
export class Topo {
  constructor(Nodes) {
    this.dom = null;
    this.rootGroupRenderObject = new RenderObject("group", {
      attr: {
        "data-name": "root-group"
      }
    });
    this.nodeGroupRenderObject = new RenderObject("group", {
      attr: {
        "data-name": "node-group"
      }
    });
    this.linkGroupRenderObject = new RenderObject("group", {
      attr: {
        "data-name": "link-group"
      }
    });
    this.rootGroupRenderObject
      .add(this.linkGroupRenderObject)
      .add(this.nodeGroupRenderObject);
    // this._zoomGenerator = null
    // this.enableZoom()
  }
  model(name, params) {
    this._modelName = name;
    this._modelParams = params;
    return this;
  }
  /**
   * 绘制拓扑入口函数
   * 该方法会重新生成所有的renderObject
   * @param links
   * @param tops
   */
  render(dom, nodes) {
    if (this._modelName === "depth" || this._modelName === "force") {
      this.dom = dom;
      dom.textContent = ""; // 清空已有内容
      nodes.forEach(node => {
        node.renderTo();
      });
    } else {
      throw new Error("Need a model! can be force or depth.");
    }
  }
  renderNodes(nodes) {
    _.forEach(nodes, node => {
      if (node.position) {
        const object = new NodeRenderObject(node, this.options, this.hooks);
        this.nodeRenderObjects.push(object);
        object.renderTo(this._nodeGroupSelection);
      }
    });
  }
  renderLinks(links) {
    this.initLinksRenderObjects(links);
    _.forEach(this.linkRenderObjects, object => {
      object.renderTo(this._linkGroupSelection);
    });
  }
  /**
   * 初始化linkRenderer
   * @param links
   */
  initLinksRenderObjects(links) {
    const linkRenderObjectFinder = {};
    const objects = [];
    _.forEach(links, link => {
      const {
        source: { id: sid, position: sp },
        target: { id: tid, position: tp }
      } = link;
      if (sp && tp) {
        linkRenderObjectFinder[sid] = linkRenderObjectFinder[sid] || {};
        linkRenderObjectFinder[tid] = linkRenderObjectFinder[tid] || {};
        // 一对node之间可能有好几条link，但是只需要一个object
        if (
          !linkRenderObjectFinder[sid][tid] /* 记录是双向的，所以只需判断单向 */
        ) {
          const object = { sid, tid, links: [] }; // 临时记录，此时links还是空的
          objects.push(object);
          linkRenderObjectFinder[sid][tid] = object;
          linkRenderObjectFinder[tid][sid] = object;
        }
        linkRenderObjectFinder[sid][tid].links.push(link);
      }
    });
    this.linkRenderObjects = _.map(objects, ({ sid, tid, links }) => {
      const robj = new LinkRenderObject(links, this.hooks);
      linkRenderObjectFinder[sid][tid] = robj;
      linkRenderObjectFinder[tid][sid] = robj;
      return robj;
    });
    this.linkRenderObjectFinder = linkRenderObjectFinder;
  }
  update() {
    _.forEach(this.nodeRenderObjects, obj => obj.update());
    _.forEach(this.linkRenderObjects, obj => obj.update());
  }
  enableZoom() {
    let zoomGenerator = zoom().scaleExtent([0.4, 4]);
    // .filter(() => event.type === 'wheel')
    this._SVGSelection.call(
      zoomGenerator.on("zoom", () => {
        const transform = zoomTransform(this._SVGSelection.node());
        this._rootGroupSelection.attr("transform", transform);
      })
    );
    this._zoomGenerator = zoomGenerator;
  }
  /**
   * 使拓扑水平居中
   * @param center
   */
  center(center) {
    this._SVGSelection.call(
      this._zoomGenerator.transform,
      zoomIdentity.translate(this.dom.clientWidth / 2 - center, 100)
    );
  }
}
