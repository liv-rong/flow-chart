import { Graph, type Model, Shape } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'

const commands = [
  {
    key: 'zoomIn',
    label: 'ZoomIn(0.2)'
  },
  {
    key: 'zoomOut',
    label: 'ZoomOut(-0.2)'
  },
  {
    key: 'zoomTo',
    label: 'ZoomTo(1)'
  },
  {
    key: 'zoomToFit',
    label: 'ZoomToFit'
  },
  {
    key: 'centerContent',
    label: 'CenterContent'
  }
]
interface Props {
  data?: Model.FromJSONData
}

function FlowChart({ data }: Props) {
  const { initGraph, handleZoom, refContainer, refStencil, graph, handleStencilInit } =
    useFlowChart(data as Model.FromJSONData)
  // const refContainer = useRef<HTMLDivElement>(null)

  // const refStencil = useRef<HTMLDivElement | null>(null)

  // const [graph, setGraph] = useState<Graph | null>(null)

  // const initGraph = () => {
  //   const graph = new Graph({
  //     container: refContainer.current as HTMLElement,
  //     background: {
  //       color: '#F2F7FA'
  //     },
  //     mousewheel: {
  //       enabled: true,
  //       zoomAtMousePosition: true,
  //       modifiers: 'ctrl',
  //       minScale: 0.5,
  //       maxScale: 3
  //     },
  //     grid: {
  //       visible: true,
  //       type: 'doubleMesh',
  //       args: [
  //         {
  //           color: '#eee', // 主网格线颜色
  //           thickness: 1 // 主网格线宽度
  //         },
  //         {
  //           color: '#ddd', // 次网格线颜色
  //           thickness: 1, // 次网格线宽度
  //           factor: 4 // 主次网格线间隔
  //         }
  //       ]
  //     },
  //     connecting: {
  //       router: 'manhattan',
  //       connector: {
  //         name: 'normal'
  //       },
  //       anchor: 'center',
  //       connectionPoint: 'anchor',
  //       allowBlank: false,
  //       snap: {
  //         radius: 20
  //       },
  //       createEdge() {
  //         return new Shape.Edge({
  //           attrs: {
  //             line: {
  //               stroke: '#000000',
  //               strokeWidth: 2,
  //               targetMarker: {
  //                 name: 'block',
  //                 width: 12,
  //                 height: 8
  //               }
  //             }
  //           },
  //           zIndex: 0
  //         })
  //       },
  //       validateConnection({ targetMagnet }) {
  //         return !!targetMagnet
  //       }
  //     },
  //     highlighting: {
  //       magnetAdsorbed: {
  //         name: 'stroke',
  //         args: {
  //           attrs: {
  //             fill: '#5F95FF',
  //             stroke: '#5F95FF'
  //           }
  //         }
  //       }
  //     }
  //   })

  //   graph
  //     .use(
  //       new Transform({
  //         resizing: true,
  //         rotating: true
  //       })
  //     )
  //     .use(
  //       new Selection({
  //         rubberband: true,
  //         showNodeSelectionBox: true
  //       })
  //     )
  //     .use(new Snapline())
  //     .use(new Keyboard())
  //     .use(new Clipboard())
  //     .use(new History())

  //   setGraph(graph)
  //   const stencil = new Stencil({
  //     title: '流程图',
  //     target: graph,
  //     stencilGraphWidth: 300,
  //     stencilGraphHeight: 200,
  //     collapsable: true,
  //     groups: [
  //       {
  //         title: '基础流程图',
  //         name: 'group1'
  //       },
  //       {
  //         title: '系统设计图',
  //         name: 'group2',
  //         graphHeight: 250,
  //         layoutOptions: {
  //           rowHeight: 70
  //         }
  //       }
  //     ],
  //     layoutOptions: {
  //       columns: 2,
  //       columnWidth: 200,
  //       rowHeight: 55
  //     }
  //   })
  //   if (refStencil.current) {
  //     refStencil.current.appendChild(stencil.container)
  //   }

  //   graph.bindKey(['meta+c', 'ctrl+c'], () => {
  //     const cells = graph.getSelectedCells()
  //     if (cells.length) {
  //       graph.copy(cells)
  //     }
  //     return false
  //   })
  //   graph.bindKey(['meta+x', 'ctrl+x'], () => {
  //     const cells = graph.getSelectedCells()
  //     if (cells.length) {
  //       graph.cut(cells)
  //     }
  //     return false
  //   })
  //   graph.bindKey(['meta+v', 'ctrl+v'], () => {
  //     if (!graph.isClipboardEmpty()) {
  //       const cells = graph.paste({ offset: 32 })
  //       graph.cleanSelection()
  //       graph.select(cells)
  //     }
  //     return false
  //   })

  //   // undo redo
  //   graph.bindKey(['meta+z', 'ctrl+z'], () => {
  //     if (graph.canUndo()) {
  //       graph.undo()
  //     }
  //     return false
  //   })
  //   graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
  //     if (graph.canRedo()) {
  //       graph.redo()
  //     }
  //     return false
  //   })

  //   // select all
  //   graph.bindKey(['meta+a', 'ctrl+a'], () => {
  //     const nodes = graph.getNodes()
  //     if (nodes) {
  //       graph.select(nodes)
  //     }
  //   })

  //   // delete
  //   graph.bindKey('backspace', () => {
  //     const cells = graph.getSelectedCells()
  //     if (cells.length) {
  //       graph.removeCells(cells)
  //     }
  //   })

  //   // zoom
  //   graph.bindKey(['ctrl+1', 'meta+1'], () => {
  //     const zoom = graph.zoom()
  //     if (zoom < 1.5) {
  //       graph.zoom(0.1)
  //     }
  //   })
  //   graph.bindKey(['ctrl+2', 'meta+2'], () => {
  //     const zoom = graph.zoom()
  //     if (zoom > 0.5) {
  //       graph.zoom(-0.1)
  //     }
  //   })

  //   // 控制连接桩显示/隐藏
  //   const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  //     for (let i = 0, len = ports.length; i < len; i += 1) {
  //       ports[i].style.visibility = show ? 'visible' : 'hidden'
  //     }
  //   }
  //   graph.on('node:mouseenter', () => {
  //     const container = document.getElementById('graph-container')!
  //     const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
  //     showPorts(ports, true)
  //   })
  //   graph.on('node:mouseleave', () => {
  //     const container = document.getElementById('graph-container')!
  //     const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
  //     showPorts(ports, false)
  //   })
  // }

  // graph.fromJSON(data as Model.FromJSONData)
  // graph.centerContent()

  useEffect(() => {
    const { graph: customGraph } = initGraph()
    // handleStencilInit(customGraph)
    return () => {
      graph?.dispose()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-green-50">
      {/* <Button onClick={() => {}}>导出JSON</Button>
      <Button.Group>
        {commands.map((item) => (
          <Button
            onClick={() => handleZoom(item.key)}
            key={item.key}
          >
            {item.label}
          </Button>
        ))}
      </Button.Group> */}

      <div className="bg-red-100 w-full h-full flex justify-between items-center">
        <LeftOperate className="w-20 h-full bg-red-200">
          132312
          {/* <div
            ref={refStencil}
            className="!w-20 !h-20 bg-blue-400"
          ></div> */}
        </LeftOperate>
        <div className="w-[calc(100%-20px)] h-full">
          <div
            id="container"
            ref={refContainer}
            className="w-full h-full"
          ></div>
        </div>
      </div>
    </div>
  )
}

export default FlowChart
