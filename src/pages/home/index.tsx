// import { Model, Node, Edge } from '@antv/x6'
// import mermaid from 'mermaid'

// const data = {
//   nodes: [
//     {
//       id: 'node1',
//       shape: 'rect',
//       x: 40,
//       y: 40,
//       width: 100,
//       height: 40,
//       label: 'hello',
//       attrs: {
//         // body 是选择器名称，选中的是 rect 元素
//         body: {
//           stroke: '#8f8f8f',
//           strokeWidth: 1,
//           fill: '#fff',
//           rx: 6,
//           ry: 6
//         }
//       }
//     },
//     {
//       id: 'node2',
//       shape: 'rect',
//       x: 160,
//       y: 180,
//       width: 100,
//       height: 40,
//       label: 'world',
//       attrs: {
//         body: {
//           stroke: '#8f8f8f',
//           strokeWidth: 1,
//           fill: '#fff',
//           rx: 6,
//           ry: 6
//         }
//       }
//     }
//   ],
//   edges: [
//     {
//       shape: 'edge',
//       source: 'node1',
//       target: 'node2',
//       label: 'x6',
//       attrs: {
//         // line 是选择器名称，选中的边的 path 元素
//         line: {
//           stroke: '#8f8f8f',
//           strokeWidth: 1
//         }
//       }
//     }
//   ]
// }

// const Mynodes: Node.Metadata[] = [
//   // {
//   //   id: 'node1',
//   //   shape: 'custom-rect',
//   //   x: 0,
//   //   y: 0,
//   //   width: 100,
//   //   height: 200,
//   //   label: '过程',
//   //   attrs: {
//   //     body: {
//   //       stroke: '#8f8f8f',
//   //       strokeWidth: 1,
//   //       fill: 'red',
//   //       rx: 6,
//   //       ry: 6
//   //     },
//   //     label: {
//   //       text: 'hello',
//   //       fill: '#000',
//   //       fontSize: 28
//   //     }
//   //   }
//   // },
//   {
//     shape: 'custom-rect',
//     label: '过程1',
//     x: 20,
//     y: 20
//   },
//   {
//     shape: 'custom-rect',
//     label: '过程2',
//     x: 220,
//     y: 220
//   },
//   {
//     shape: 'custom-rect',
//     label: '过程3',
//     x: 420,
//     y: 420
//   }
//   // {
//   //   id: 'node3',
//   //   shape: 'custom-polygon',
//   //   attrs: {
//   //     body: {
//   //       refPoints: '0,10 10,0 20,10 10,20'
//   //     }
//   //   },
//   //   label: '决策'
//   // }
//   // {
//   //   id: 'node2',
//   //   shape: 'rect',
//   //   x: 300,
//   //   y: 500,
//   //   width: 100,
//   //   height: 40,
//   //   label: 'world',
//   //   attrs: {
//   //     body: {
//   //       stroke: '#8f8f8f',
//   //       strokeWidth: 1,
//   //       fill: '#fff',
//   //       rx: 6,
//   //       ry: 6
//   //     }
//   //   }
//   // }
// ]

// // A[ChristmasA] -->|Get money| B(Go <br/>  shoppingB)
// // B --> C{Let me <br/> thinkC}
// // C -->|One| D[LaptopD]
// // C -->|Two| E[iPhoneE]
// // C -->|Three| F[fa:fa-car CarF]
// const mermaidInput = `
// flowchart TD
//     A[ChristmasA] -->|Get money| B(Go <br/>  shoppingB)
//     B --> C{Let me <br/> thinkC}
//     C -->|One| D[LaptopD]
//     C -->|Two| E[iPhoneE]
//     C -->|Three| F[fa:fa-car CarF]
//     id1((园))
//     id2{菱形}
//     id1([圆角矩形])
//     A((椭圆形<br/>aasdada状))
// `
// //   const mermaidInput = `
// //   flowchart TD
// //     Start --> Stop
// // `

// function Home() {
//   const refContainer = useRef<HTMLDivElement>(null)

//   const [svg, setSvg] = useState<string>()

//   const [nodes, setNodes] = useState<Node.Metadata[]>([])
//   const [edges, setEdges] = useState<Edge.Metadata[]>([])

//   const handleInit = async () => {
//     const res = await mermaid.render('text', mermaidInput)
//     setSvg(res.svg)
//   }

//   const handleXYTojson = () => {
//     const res = ChartUtils.handleXY()
//     setNodes(res)
//     const { edges } = ChartUtils.mermaidTojson(mermaidInput)
//     setEdges(edges)
//   }

//   useEffect(() => {
//     handleInit()
//   }, [])

//   useEffect(() => {
//     if (svg) {
//       handleXYTojson()
//     }
//   }, [svg])

//   return (
//     <div className="h-screen w-full">
//       <FlowChart data={data} />
//       <div
//         ref={refContainer}
//         dangerouslySetInnerHTML={{ __html: svg ?? '' }}
//       />

//       {/* <MermaidDiagram children={mermaidInput} /> */}
//     </div>
//   )
// }

// export default Home

import { Graph } from '@antv/x6'

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

const Home = () => {
  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refContainer.current) {
      const graph = new Graph({
        container: refContainer.current,
        width: 800,
        height: 600
      })
      graph.fromJSON(data)
      graph.centerContent() // 居中显示
    }
  })
  return (
    <div className="helloworld-app">
      <div
        className="app-content"
        ref={refContainer}
      />
    </div>
  )
}

export default Home
