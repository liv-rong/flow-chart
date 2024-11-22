import { type Model } from '@antv/x6'
import {  useEffect, useRef, useState } from 'react'
import {FlowChart} from '@/components'
// import SvgData from '@/components/svg/test.svg'
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="888" height="483.61099" viewBox="0 0 888 483.61099" xmlns:xlink="http://www.w3.org/1999/xlink">
     <rect id="node1" x="10" y="10" width="100" height="40" />
     <circle id="node2" cx="200" cy="30" r="20" />
</svg>

`


const data = {
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






function Home() {
  const refContainer = useRef<HTMLDivElement>(null)

  const [graphData, setGraphData] = useState<Model.FromJSONData>()




    const svgToAnt = (svg: string) => {
      // 使用 DOMParser 解析 SVG
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
      const elements = svgDoc.documentElement.childNodes

      // 转换为 X6 节点格式
      const x6Nodes = Array.from(elements)
        .map((node) => {
          // 确保 node 是一个 Element
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as SVGElement // 类型断言为 SVGElement

            const nodeData = {
              id: element.getAttribute('id'),
              x: parseFloat(element.getAttribute('x') || element.getAttribute('cx') || '0'),
              y: parseFloat(element.getAttribute('y') || element.getAttribute('cy') || '0'),
              width: 300,
              height: 200,
              label: element.tagName === 'rect' ? '矩形' : '圆形', // 根据元素类型设置标签
              shape: element.tagName === 'rect' ? 'rect' : 'circle',
            }

            return nodeData
          }
          return null // 过滤非元素节点
        })
        .filter((node) => node !== null) // 过滤掉 null

      return x6Nodes
    }

    useEffect(() => {
      console.log('svgString', svgString)
      const svgData1 = svgToAnt(svgString)
      setGraphData({
        nodes: svgData1,
      } as Model.FromJSONData)
      console.log(svgData1)
    },[])



  return (
    <div className="w-screen h-screen">
      {graphData?.toString()}
      <FlowChart data={graphData} />
    </div>
  )
}

export default Home
