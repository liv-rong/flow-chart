import { Graph, type Model, Shape, Node, type Edge } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Export } from '@antv/x6-plugin-export'

export const useFlowChart = () => {
  const refContainer = useRef<HTMLDivElement>(null)

  const refStencil = useRef<HTMLDivElement | null>(null)

  const [graph, setGraph] = useState<Graph | null>(null)

  const [currentNode, setCurrentNode] = useState<
    Node<Node.Properties> | null | Edge<Edge.Properties>
  >(null)

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
                // targetMarker: {
                //   name: 'block'
                // }
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
          // dragNode: true
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
          showNodeSelectionBox: true
          // multiple: true,
          // rubberband: true,
          // movable: true,
          // showNodeSelectionBox: true
          // showEdgeSelectionBox: true
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
    graph.on('node:dragend', ({ cell, e, x, y }) => {
      // 更新节点位置
      // if (cell.id) {
      //   cell.position(x, y) // 更新节点位置
      // }
    })

    graph.on('node:mouseup', ({ cell }) => {
      // 确保节点在鼠标抬起时能够放置
      // if (cell.id) {
      //   const position = cell.getPosition()
      //   cell.position(position.x, position.y) // 确保位置更新
      // }
    })
    graph.on('cell:dblclick', ({ cell, e }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
      //双击编辑节点内容
      if (cell.isNode()) {
        // cell.getTools()
        // cell.removeTool('node-editor')
        // cell.addTools([
        //   {
        //     name: 'node-editor'
        //   }
        // ])
        //   {
        //     name: string;
        //     args?: any;
        // }
        // // console.log(cell.getChildIndex({}))
        // console.log(cell.getData(), '1111111111111111')
        // setCurrentNode(cell)
        // // const parentElement = document.getElementById(cell.id)
        // // console.log(parentElement, 'parentElement')
        // // if (parentElement) {
        // //   console.log(parentElement, 'parentElement')
        // //   parentElement.setAttribute('contenteditable', 'true')
        // //   parentElement.focus()
        // // }
        // // const cellElement = document.querySelector(`[data-cell-id="${cell.id}"]`)
        // // 检查元素是否存在 如果存在 则创建一个可以编辑的div  元素 用来包裹文本 让文本可以编辑
        // // 检查元素是否存在
        // if (cellElement) {
        //   // 获取文本元素 <tspan>
        //   const tspanElement = cellElement.querySelector('text')
        //   console.log(tspanElement, 'tspanElement')
        //   // 检查 <tspan> 元素是否存在
        //   if (tspanElement) {
        //     // 将 <tspan> 元素设置为可编辑
        //     // const editableDiv = document.createElement('div')
        //     // editableDiv.contentEditable = 'true'
        //     // // editableDiv.innerText = tspanElement.innerText // 将文本内容设置为可编辑
        //     // // cellElement.appendChild(editableDiv) // 将可编辑的div添加到cellElement中
        //     // const divElement = document.createElement('div')
        //     // divElement.innerText = tspanElement.innerHTML
        //     // // 将 <text> 元素从 SVG 中移除
        //     // const parentSvg = tspanElement.parentNode
        //     // parentSvg?.removeChild(tspanElement)
        //     // // 将 <text> 元素插入到 <div> 中
        //     // divElement.appendChild(tspanElement)
        //     // // 将 <div> 插入到 SVG 中
        //     // parentSvg?.appendChild(divElement)
        //     // // tspanElement.parentNode?.insertBefore(editableDiv, tspanElement)
        //     // // tspanElement.setAttribute('contenteditable', 'true')
        //     // tspanElement.style.outline = '1px dashed red' // 可选：给可编辑文本添加边框以便于视觉识别
        //     // console.log(cellElement, 'editableDiv')
        //     // 可选：自动聚焦并选择文本
        //     // tspanElement.focus()
        //     // const range = document.createRange()
        //     // const selection = window.getSelection()
        //     // range.selectNodeContents(tspanElement)
        //     // selection.removeAllRanges()
        //     // selection.addRange(range)
        //   } else {
        //     console.log('没有找到 <tspan> 元素。')
        //   }
        // } else {
        //   console.log("没有找到 data-cell-id 为 'X' 的元素。")
        // }
        // console.log(cell.id, '双击编辑')
        //根据id 获取节点子孩子 text 并且修改文本内容
        // const tspan = document.querySelector(cell.id)
        // const text = cell.children
        // console.log(cell.getChildren(), '双击编辑333333333')
        // text.innerHTML = '双击编辑'
        // console.log('双击编辑', cell.getAttrs())
      }
    })

    graph.on('node:click', ({ cell, x, y }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
      setCurrentNode((pre) => {
        if (pre?.isEdge()) {
          pre.attr('line/stroke', pre.getData().customStroke)
        }
        return cell
      })
    })

    graph.on('node:mouseup', ({ cell, x, y }) => {})
    graph.on('node:mouseenter', ({ e, node, view }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
      //鼠标滑过显示连接庄
    })
    graph.on('node:mouseleave', () => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
    })

    graph.on('node:mouseup', ({ cell }) => {})

    graph.on('edge:click', ({ cell }) => {
      setCurrentNode((pre) => {
        console.log(pre, cell, 'pre')

        if (pre?.isEdge()) {
          const res = pre?.getData()?.customStroke
          if (res) {
            pre.attr('line/stroke', res)
          }
        }
        console.log(cell.getAttrs())
        console.log(cell.getData())
        // console.log(cell.getAttrs().line.stroke, 'cell')

        const currentLineAttrs = cell.getAttrs().line.stroke

        cell.attr('line/stroke', 'blue')

        cell.setData({
          customStroke: currentLineAttrs
        })

        console.log(cell.getAttrs())
        console.log(cell.getData())

        return cell
      })
    })

    graph.on('edge:dblclick', ({ cell, e }) => {
      console.log('edge:dblclick')
      cell.removeTools()
      cell.addTools([
        {
          name: 'edge-editor'
        }
      ])
    })

    graph.on('edge:mouseenter', ({ cell }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
      cell.removeTools()
      cell.addTools([
        {
          name: 'vertices',
          args: {
            attrs: { fill: '#666' }
          }
        },
        {
          name: 'segments',
          args: {
            attrs: { fill: 'red' }
          }
        },
        {
          name: 'source-arrowhead'
        },
        {
          name: 'target-arrowhead'
        }
      ])
    })
    graph.on('edge:mouseleave', ({ cell }) => {
      const ports = refContainer.current?.querySelectorAll(
        '.x6-port-body'
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
      cell.removeTools(['source-arrowhead', 'target-arrowhead'])
    })

    graph.on('blank:click', ({ e, x, y }) => {
      graph?.getEdges().forEach((edge) => {
        const res = edge.getData()?.customStroke ?? edge.getAttrs().line.stroke
        edge.attr('line/stroke', res)
      })
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
