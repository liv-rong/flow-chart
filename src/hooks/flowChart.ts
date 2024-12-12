import { Graph, type Model, Shape, Node, type Edge } from '@antv/x6'

import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Export } from '@antv/x6-plugin-export'

interface Props {
  setTextValue: React.Dispatch<React.SetStateAction<string>>
  textValue: string
}
export const useFlowChart = (props: Props) => {
  const { setTextValue, textValue } = props

  const refContainer = useRef<HTMLDivElement>(null)

  const refStencil = useRef<HTMLDivElement | null>(null)

  const [graph, setGraph] = useState<Graph | null>(null)

  const [currentNode, setCurrentNode] = useState<(Edge<Edge.Properties> | Node<Node.Properties>)[]>(
    []
  )

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
      interacting: {
        nodeMovable: true,
        magnetConnectable: true,
        edgeMovable: true,
        edgeLabelMovable: true
      },
      panning: {
        enabled: true,
        modifiers: ['space'],
        eventTypes: ['leftMouseDown']
      },
      translating: {
        restrict: true //设置节点移动范围在画布内
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
        router: {
          name: 'orth'
        },
        anchor: 'center',
        connectionPoint: {
          name: 'boundary',
          args: {
            sticky: true
            // offset: -4
          }
        },

        allowBlank: false,
        snap: {
          radius: 20
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#000',
                strokeWidth: 2
              }
            },
            connectionPoint: 'bbox',
            connector: {
              connectionPoint: 'anchor',
              name: 'jumpover',
              args: {
                type: 'cubic',
                size: 5,
                radius: 0
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
        new Snapline({
          enabled: true,
          sharp: true,
          resizing: true,
          clean: true
        })
      )
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History())
      .use(
        new Selection({
          enabled: true,
          rubberband: true,
          showNodeSelectionBox: true,
          movable: true,
          multiple: true
        })
      )
      .use(new Export())

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
      // console.log('backspace')
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
    graph.on('node:dragend', () => {})

    graph.on('node:mouseup', () => {})
    graph.on('cell:dblclick', ({ cell }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
      if (cell.isNode()) {
        console.log(cell.getAttrs())
        const textValue = cell.getAttrs()?.text?.text as string
        console.log('textValue', textValue)
        setTextValue(textValue)
      }
    })

    graph.on('node:selected', () => {})

    graph.on('node:click', ({ cell }) => {})

    graph.on('node:mouseup', () => {})
    graph.on('node:mouseenter', () => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
    })

    graph.on('node:mouseup', () => {})

    graph.on('edge:selected', () => {})

    graph.on('edge:click', () => {
      // setCurrentNode((pre) => {
      //   console.log(pre, cell, 'pre')
      //   if (pre?.isEdge()) {
      //     const res = pre?.getData()?.customStroke
      //     if (res) {
      //       pre.attr('line/stroke', res)
      //     }
      //   }
      //   console.log(cell.getAttrs())
      //   console.log(cell.getData())
      //   // console.log(cell.getAttrs().line.stroke, 'cell')
      //   const currentLineAttrs = cell.getAttrs().line.stroke
      //   cell.attr('line/stroke', 'blue')
      //   cell.setData({
      //     customStroke: currentLineAttrs
      //   })
      //   console.log(cell.getAttrs())
      //   console.log(cell.getData())
      //   return cell
      // })
    })

    graph.on('edge:dblclick', () => {})

    graph.on('edge:mouseenter', () => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    graph.on('edge:mouseleave', () => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
    })

    graph.on('blank:click', () => {
      graph?.getEdges().forEach((edge) => {
        const res = edge.getData()?.customStroke ?? edge.getAttrs().line.stroke
        edge.attr('line/stroke', res)
      })
    })

    graph.on('cell:selected', ({ cell }) => {
      cell.removeTools()

      if (cell.isNode()) {
        // console.log(cell.getAttrs(), 'argsY')
        // const { textAnchor, textVerticalAnchor } = cell.getAttrs()?.label ?? {
        //   textAnchor: 'middle',
        //   textVerticalAnchor: 'middle'
        // }

        // const argsY =
        //   textVerticalAnchor === 'middle' ? '50%' : textVerticalAnchor === 'bottom' ? '100%' : '0%'
        // console.log(argsY, textVerticalAnchor, 'argsY')

        cell.addTools([
          {
            name: 'node-editor',
            args: {
              attrs: {
                backgroundColor: 'transparent',
                fontSize: cell.getAttrs()?.text?.fontSize,
                color: cell.getAttrs()?.text?.fill || cell.getAttrs()?.label?.fill || '#000000',
                fontFamily: cell.getAttrs()?.text?.fontFamily || cell.getAttrs()?.label?.fontFamily
              }
            }
          }
        ])
      }
      console.log(cell.getAttrs(), 'argsY')

      if (cell.isEdge()) {
        // cell.attr('line/stroke', 'blue')
        cell.addTools([
          {
            name: 'vertices',
            args: {
              attrs: { fill: 'blue' }
            }
          },
          {
            name: 'edge-editor',
            args: {}
          }
        ])
      }

      const currentCells = graph?.getSelectedCells() as (
        | Edge<Edge.Properties>
        | Node<Node.Properties>
      )[]
      setCurrentNode(currentCells)
    })

    graph.on('cell:unselected', () => {
      setCurrentNode([])
      // cell.removeTools()
    })

    handleStencilInit(graph)
    graph.fromJSON(data)
    graph.centerContent()
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
          stroke: '#000000',
          fill: '#FFFFFF'
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
          stroke: '#000000',
          fill: '#FFFFFF'
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
          },
          {
            group: 'left'
          },
          {
            group: 'right'
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
          stroke: '#000000',
          fill: '#FFFFFF'
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
    'custom-ellipse',
    {
      inherit: 'ellipse',
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#000000',
          fill: '#FFFFFF'
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
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphHeight: 0,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1
      },
      groups: [
        {
          title: '基础流程图',
          name: 'group1'
        },
        {
          name: 'group2',
          title: '高级'
        }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 90,
        rowHeight: 50
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
    stencil.load([r1, r2], 'group2')
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

  useEffect(() => {}, [currentNode])

  return {
    initGraph,
    refContainer,
    refStencil,
    graph,
    handleStencilInit,
    handleZoom,
    currentNode,
    setCurrentNode
  }
}
