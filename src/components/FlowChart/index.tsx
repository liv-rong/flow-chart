import { Graph, type Model, Shape } from '@antv/x6'
import { useEffect, useRef, useState } from 'react'
import { register } from '@antv/x6-react-shape'
import { Button } from 'antd'
import LeftOperate from './LeftOperate'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'

const data1 = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 200,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: 'red',
          rx: 6,
          ry: 6,
          backgroundColor: 'red' // 设置背景色
        },
        label: {
          text: 'hello',
          fill: '#000',
          fontSize: 28
        }
      }
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 300,
      y: 500,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      }
    }
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1
        }
      }
    }
  ]
}

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
  const refContainer = useRef<HTMLDivElement>(null)

  const [graph, setGraph] = useState<Graph | null>(null)

  const initGraph = () => {
    const graph = new Graph({
      container: refContainer.current as HTMLElement,
      background: {
        color: '#F2F7FA'
      },
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
          name: 'normal'
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
  }

  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current as HTMLElement,
      background: {
        color: '#F2F7FA'
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
      panning: true,
      mousewheel: {
        enabled: true,
        modifiers: 'Ctrl',
        maxScale: 4,
        minScale: 0.2
      },
      width: 800,
      height: 600
      // autoResize: true
    })

    graph.use(
      new Snapline({
        enabled: true
      })
    )
    graph.fromJSON(data as Model.FromJSONData)
    graph.centerContent()

    setGraph(graph)

    return () => {
      graph.dispose() // 组件卸载时清理
    }
  }, [data])

  const handleImport = () => {
    console.log(graph?.toJSON())
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
  return (
    <div className="w-screen h-screen">
      <Button onClick={handleImport}>导出JSON</Button>
      <Button.Group>
        {commands.map((item) => (
          <Button
            onClick={() => handleZoom(item.key)}
            key={item.key}
          >
            {item.label}
          </Button>
        ))}
      </Button.Group>

      <div className="bg-red-100 w-full h-full flex justify-between items-center">
        <LeftOperate />
        <div
          id="container"
          ref={refContainer}
        ></div>
      </div>
    </div>
  )
}

export default FlowChart