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

export const useFlowChart = () => {
  const refContainer = useRef<HTMLDivElement>(null)

  const refStencil = useRef<HTMLDivElement | null>(null)

  const [graph, setGraph] = useState<Graph | null>(null)

  const ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top'
      },
      {
        group: 'right'
      },
      {
        group: 'bottom'
      },
      {
        group: 'left'
      }
    ]
  }

  const initGraph = (data: Model.FromJSONData) => {
    const graph = new Graph({
      container: refContainer.current as HTMLElement,
      background: {
        color: '#F2F7FA'
      },
      autoResize: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1 // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4 // 主次网格线间隔
          }
        ]
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'jumpover'
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#000000',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            },
            zIndex: 0
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        }
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF'
            }
          }
        }
      }
    })

    graph
      .use(
        new Transform({
          resizing: true,
          rotating: true
        })
      )
      .use(
        new Selection({
          rubberband: true,
          showNodeSelectionBox: true
        })
      )
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History())

    graph.fromJSON(data)
    graph.centerContent()

    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo()
      }
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo()
      }
      return false
    })

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes()
      if (nodes) {
        graph.select(nodes)
      }
    })

    // delete
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom()
      if (zoom < 1.5) {
        graph.zoom(0.1)
      }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom()
      if (zoom > 0.5) {
        graph.zoom(-0.1)
      }
    })

    // 控制连接桩显示/隐藏
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    graph.on('node:mouseenter', () => {
      const container = document.getElementById('graph-container')!
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
      const container = document.getElementById('graph-container')!
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
      showPorts(ports, false)
    })
    setGraph(graph)
    return { graph }
  }
  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        text: {
          fontSize: 12,
          fill: '#262626'
        }
      },
      ports: { ...ports }
    },
    true
  )

  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        text: {
          fontSize: 12,
          fill: '#262626'
        }
      },
      ports: {
        ...ports,
        items: [
          {
            group: 'top'
          },
          {
            group: 'bottom'
          }
        ]
      }
    },
    true
  )

  Graph.registerNode(
    'custom-circle',
    {
      inherit: 'circle',
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF'
        },
        text: {
          fontSize: 12,
          fill: '#262626'
        }
      },
      ports: { ...ports }
    },
    true
  )

  const handleStencilInit = (graph: Graph) => {
    const stencil = new Stencil({
      title: '流程图',
      target: graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 200,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1'
        }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 200,
        rowHeight: 55
      }
    })
    if (refStencil.current) {
      refStencil.current.appendChild(stencil.container)
    }
    const r1 = graph?.createNode({
      shape: 'custom-rect',
      label: '开始',
      attrs: {
        body: {
          rx: 20,
          ry: 26
        }
      }
    })
    const r2 = graph?.createNode({
      shape: 'custom-rect',
      label: '过程'
    })
    const r3 = graph?.createNode({
      shape: 'custom-rect',
      attrs: {
        body: {
          rx: 6,
          ry: 6
        }
      },
      label: '可选过程'
    })
    const r4 = graph?.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20'
        }
      },
      label: '决策'
    })
    const r5 = graph?.createNode({
      shape: 'custom-polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20'
        }
      },
      label: '数据'
    })
    const r6 = graph?.createNode({
      shape: 'custom-circle',
      label: '连接'
    })

    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
  }

  const handleZoom = (command: string) => {
    switch (command) {
      case 'translate':
        graph?.translate(20, 20)
        break
      case 'zoomIn':
        graph?.zoom(0.2)
        break
      case 'zoomOut':
        graph?.zoom(-0.2)
        break
      case 'zoomTo':
        graph?.zoomTo(1)
        break
      case 'zoomToFit':
        graph?.zoomToFit()
        break
      case 'centerContent':
        graph?.centerContent()
        break
      default:
        break
    }
  }

  useEffect(() => {}, [])

  return {
    initGraph,
    refContainer,
    refStencil,
    graph,
    handleStencilInit,
    handleZoom
  }
}
