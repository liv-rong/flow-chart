import { Model, Node, Edge } from '@antv/x6'
import mermaid from 'mermaid'
const Mynodes: Node.Metadata[] = [
  {
    id: 'node1',
    shape: 'custom-rect',
    x: 0,
    y: 0,
    width: 100,
    height: 200,
    label: '过程',
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
    id: 'node3',
    shape: 'custom-polygon',
    attrs: {
      body: {
        refPoints: '0,10 10,0 20,10 10,20'
      }
    },
    label: '决策'
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
]

// A[ChristmasA] -->|Get money| B(Go <br/>  shoppingB)
// B --> C{Let me <br/> thinkC}
// C -->|One| D[LaptopD]
// C -->|Two| E[iPhoneE]
// C -->|Three| F[fa:fa-car CarF]
const mermaidInput = `
flowchart TD

    id1((园))
    id2{菱形}
    id1([圆角矩形])
    A((椭圆形<br/>aasdada状))
`
//   const mermaidInput = `
//   flowchart TD
//     Start --> Stop
// `

function Home() {
  const refContainer = useRef<HTMLDivElement>(null)

  const [svg, setSvg] = useState<string>()

  const [nodes, setNodes] = useState<Node.Metadata[]>([])
  const [edges, setEdges] = useState<Edge.Metadata[]>([])

  const handleInit = async () => {
    const res = await mermaid.render('text', mermaidInput)
    setSvg(res.svg)
  }

  const handleXYTojson = () => {
    const res = ChartUtils.handleXY()
    setNodes(res)
    const { edges } = ChartUtils.mermaidTojson(mermaidInput)
    setEdges(edges)
  }

  useEffect(() => {
    handleInit()
  }, [])

  useEffect(() => {
    if (svg) {
      handleXYTojson()
    }
  }, [svg])

  return (
    <div className="h-screen w-full">
      <FlowChart
        data={{
          nodes,
          edges
        }}
      />
      <div
        ref={refContainer}
        dangerouslySetInnerHTML={{ __html: svg ?? '' }}
      />

      {/* <MermaidDiagram children={mermaidInput} /> */}
    </div>
  )
}

export default Home
