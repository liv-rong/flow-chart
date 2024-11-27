import { Model, Node, Edge } from '@antv/x6'
import { useEffect, useRef, useState } from 'react'
import { FlowChart, MermaidDiagram } from '@/components'
import SvgData11 from '@/components/svg/test.svg'
import mermaid from 'mermaid'
import { ChartUtils } from '@/utils'

const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="888" height="483.61099" viewBox="0 0 888 483.61099">
    <rect id="node1" x="10" y="10" width="100" height="40" />
    <circle id="node2" cx="200" cy="30" r="20" />
</svg>
`

const initialData = {
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
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: 'red',
          rx: 6,
          ry: 6
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

  const [svg, setSvg] = useState<string>()

  const [nodes, setNodes] = useState<Node.Metadata[]>([])
  const [edges, setEdges] = useState<Edge.Metadata[]>([])

  const mermaidInput = `
  flowchart TD
      A[ChristmasA] -->|Get money| B(Go shoppingB)
      B --> C{Let me thinkC}
      C -->|One| D[LaptopD]
      C -->|Two| E[iPhoneE]
      C -->|Three| F[fa:fa-car CarF]

  `

  //   const mermaidInput = `
  //   flowchart TD
  //     Start --> Stop
  // `

  const handleInit = async () => {
    const res = await mermaid.render('text', mermaidInput)
    setSvg(res.svg)
    return res.svg
  }

  const handleData = () => {
    const { nodes, edges } = ChartUtils.mermaidTojson(mermaidInput)
    setNodes(nodes)
    setEdges(edges)
  }

  const handleXYTojson = () => {
    const res = ChartUtils.handleXY()
    if (nodes.length > 0) {
      setNodes((pre) =>
        pre.map((item) => {
          const resXY = res?.find((resItem) => {
            const splitXY = resItem.id?.split('-')[1] ?? ''
            console.log(splitXY, 'splitXY')
            return splitXY === item.id
          })
          console.log(resXY, 'resXY')
          item.x = resXY?.x
          item.y = resXY?.y
          item.width = 200
          item.height = 100
          return item
        })
      )
    }
    console.log(res, 'res')
  }

  useEffect(() => {
    handleInit()
    handleData()
  }, [])

  useEffect(() => {
    if (svg) {
      handleXYTojson() // 在 SVG 渲染后调用
    }
  }, [svg]) // 依赖 svg

  return (
    <div className="w-screen h-screen">
      <div
        ref={refContainer}
        dangerouslySetInnerHTML={{ __html: svg! }}
      ></div>
      <FlowChart
        data={{
          nodes,
          edges
        }}
      />
      {/* <MermaidDiagram children={mermaidInput} /> */}
    </div>
  )
}

export default Home
