import { Graph, type Model, Shape } from '@antv/x6'
import Footer from '../common/Footer'
import Header from '../common/Header'
import LeftOperate from './components/LeftOperate'
import RightOperate from './components/RightOperate'
import mermaid from 'mermaid'
import type { Props } from 'react-resize-detector/build/types/types'

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

const mermaidInput = `
flowchart TD
    A[ChristmasA] -->|Get money| B(Go <br/>  shoppingB)
    B --> C{Let me <br/> thinkC}
    C -->|One| D[LaptopD]
    C -->|Two| E[iPhoneE]
    C -->|Three| F[fa:fa-car CarF]
    id1((园))
    id2{菱形}
    id1([圆角矩形])
    A((椭圆形<br/>aasdada状))
`

const test2 = `
flowchart TD
E[AV移]-->F[构建结合失活突变体AVAL]
F-->G[ AVAL对Vimentin泛素化调控]
F-->H[验证AVAL与VAL调控Vimentin蛋白表达的差异]
G-->I[.MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力]
I-->J[CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期]
J-->K[.检测K48和K63泛素化水平]
K-->L[.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验]
L-->M[AVAL对Vimentin-Trim16结合的竞争性效应]
H-->M[AVAL对Vimentin-Trim16结合的竞争性效应]`

const lungCancerResearch = {
  nodes: [
    {
      x: 0,
      y: 60,
      width: 200,
      height: 100,
      label: '实验目的 - 研究lncRNA VAL与Vimentin的相互作用及其在肺腺癌转移中的作用机制。',
      shape: 'custom-rect',
      id: '实验目的'
    },
    {
      x: 0,
      y: 120,
      width: 200,
      height: 100,
      label: '实验目的 - 在肺腺癌转移中的作用机制。',
      shape: 'custom-rect',
      id: '实验目的1'
    }
  ],
  edges: []
}

function FlowChart(props: Props) {
  const {
    initGraph,
    handleZoom,
    refContainer: customRefContainer,
    currentNode,
    currentAttrs,
    setCurrentAttrs,
    setCurrentNode,
    refStencil,
    graph
  } = useFlowChart()

  const handleInit = async () => {
    const svgres = await mermaid.render('text', test2)

    document.getElementById('svgContainer')!.innerHTML = svgres.svg

    const nodes = ChartUtils.handleXY()

    const { edges } = ChartUtils.mermaidTojson(test2)

    initGraph(lungCancerResearch)
  }

  useEffect(() => {
    handleInit()
    return () => {
      graph?.dispose()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-green-50">
      <Header
        exportJson={() => {
          // console.log(graph?.toJSON())
          const nodes = graph?.getNodes()
          const edges = graph?.getEdges()
          console.log({
            nodes: nodes?.map((item) => item.toJSON()),
            edges: edges?.map((item) => item.toJSON())
          })

          // graph?.toJSON()
        }}
      />
      <div className="h-[calc(100%-72px)] w-full flex">
        <LeftOperate refCustom={refStencil}></LeftOperate>
        <div className="w-full h-full bg-gray-50 flex-1 overflow-auto flex justify-center items-center">
          <div className="flex flex-col h-full w-full">
            <div
              id="container"
              ref={customRefContainer}
              className="w-full h-full"
            ></div>
          </div>
        </div>
        <RightOperate
          currentNode={currentNode}
          currentAttrs={currentAttrs}
          setCurrentAttrs={setCurrentAttrs}
          setCurrentNode={setCurrentNode}
          graph={graph}
        />
      </div>
      <Footer />
      <div id="svgContainer" />
    </div>
  )
}

export default memo(FlowChart)
