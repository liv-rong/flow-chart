import { Graph } from '@antv/x6'
import { useEffect, useRef } from 'react'
import { register } from '@antv/x6-react-shape'
import { Snapline } from '@antv/x6-plugin-snapline'

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      }
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
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

function App() {

  const refContainer = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current as HTMLElement,
      autoResize: true,
      background: {
        color: '#f5f5f5'
      }
    })
    graph.use(
      new Snapline({
        enabled: true
      })
    )
    graph.fromJSON(data)
    graph.centerContent() // 居中显示
  },[])
  return (
    <div className="w-screen h-screen ">
      <div className="bg-red-100 w-full h-full ">
        <div
          id="container"
          ref={refContainer}
        ></div>
      </div>
    </div>
  )
}

export default App
