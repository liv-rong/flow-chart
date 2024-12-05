import { Graph, type Model, Shape } from '@antv/x6'
import Footer from '../common/Footer'
import Header from '../common/Header'
import LeftOperate from './components/LeftOperate'
import RightOperate from './components/RightOperate'
import mermaid from 'mermaid'
import type { Props } from 'react-resize-detector/build/types/types'
import { Settings, type State } from './components/settings'

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

const a = `
flowchart TD
  A[阐明VAL竞争性结合Vimentin调控Trim16介导泛素化的分子机制]-->B(VAL-Vimentin结合位点)
  B-->C[构建三种分段截短突变载体]
  C-->D[RNA pulldown验证交互位点]
  D-->E[AVAL影响Vimentin表达及转移]
  E-->F[构建结合失活突变体AVAL]
  F-->G[ AVAL对Vimentin泛素化调控]
  F-->H[验证AVAL与VAL调控Vimentin蛋白表达的差异]
  G-->I[.MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力]
  I-->J[CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期]
  J-->K[.检测K48和K63泛素化水平]
  K-->L[.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验]
  L-->M[AVAL对Vimentin-Trim16结合的竞争性效应]
  H-->M[AVAL对Vimentin-Trim16结合的竞争性效应]
  M -->N[AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应]
  M-->P[AVAL与VAL处理co-IP比较Trim16与Vimentin结合效]
  R[2.在体水平验证VAL结合Vimentin调控肺脉癌转移]-->S[构建VAL和AVAL过表达的肺腺癌稳转细胞株]
  S-->T[尾静脉注射肺转移模型验证VAL及AVAL功能]
  T-->W[心脏注射肺腺癌骨转移模型验证VAL及AVAL功能]
  W-->X[VAL与Trim16存在竞争性效应的在体实验]
  Y[AKTVimentin信号轴在肺腺癌转移中的临床意义]--> Z[200例肺腺癌患者肿瘤组织进行回顾性研究,qPCR、WB和IH检]
  1-->2[100例AKT持续激活特征的肺腺癌前瞻性研究:新鲜组织标本配对癌旁组织及血浆检测其中STAT3、VAL和Vimentin表达]
  2-->3[统计分析:对AKT、STAT3、VAL和Vimentin表达与临床病理因素做单因素/多因素分析和预后关联分析,明确临床意义]
`

const testA = {
  nodes: [
    {
      x: 168.5,
      y: 83,
      width: 28,
      height: 44,
      label: '1',
      shape: 'custom-rect',
      id: '1'
    },
    {
      x: 72.5,
      y: 247,
      width: 220,
      height: 140,
      label:
        '100例AKT持续激活特征的肺腺癌前瞻性研究:新鲜组织标本配对癌旁组织及血浆检测其中STAT3、VAL和Vimentin表达',
      shape: 'custom-rect',
      id: '2'
    },
    {
      x: 72.5,
      y: 459,
      width: 220,
      height: 140,
      label:
        '统计分析:对AKT、STAT3、VAL和Vimentin表达与临床病理因素做单因素/多因素分析和预后关联分析,明确临床意义',

      shape: 'custom-rect',

      id: '3'
    },
    {
      x: 423.5,
      y: 59,
      width: 220,
      height: 92,
      label: '阐明VAL竞争性结合Vimentin调控Trim16介导泛素化的分子机制',

      shape: 'custom-rect',

      id: 'A'
    },
    {
      x: 444,
      y: 247,
      width: 179,
      height: 44,
      label: 'VAL-Vimentin结合位点',
      shape: 'custom-rect',

      id: 'B'
    },
    {
      x: 427.5,
      y: 365,
      width: 212,
      height: 44,
      label: '构建三种分段截短突变载体',

      shape: 'custom-rect',

      id: 'C'
    },
    {
      x: 426.5,
      y: 531,
      width: 214,
      height: 44,
      label: 'RNA pulldown验证交互位点',

      shape: 'custom-rect',

      id: 'D'
    },
    {
      x: 423.5,
      y: 627,
      width: 220,
      height: 68,
      label: 'AVAL影响Vimentin表达及转移',
      visible: true,
      shape: 'custom-rect',

      id: 'E'
    },
    {
      x: 435,
      y: 751,
      width: 197,
      height: 44,
      label: '构建结合失活突变体AVAL',
      visible: true,
      shape: 'custom-rect',

      id: 'F'
    },
    {
      x: 292.5,
      y: 857,
      width: 213,
      height: 44,
      label: 'AVAL对Vimentin泛素化调控',

      shape: 'custom-rect',

      id: 'G'
    },
    {
      x: 623,
      y: 1387,
      width: 220,
      height: 68,
      label: '验证AVAL与VAL调控Vimentin蛋白表达的差异',

      shape: 'custom-rect',

      id: 'H'
    },
    {
      x: 289,
      y: 955,
      width: 220,
      height: 92,
      label: 'MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力',

      shape: 'custom-rect',

      id: 'I'
    },
    {
      x: 289,
      y: 1127,
      width: 220,
      height: 92,
      label: 'CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期',

      shape: 'custom-rect',

      id: 'J'
    },
    {
      x: 296,
      y: 1275,
      width: 206,
      height: 44,
      label: '.检测K48和K63泛素化水平',

      shape: 'custom-rect',

      id: 'K'
    },
    {
      x: 289,
      y: 1363,
      width: 220,
      height: 92,
      label: '.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验',

      shape: 'custom-rect',

      id: 'L'
    },
    {
      x: 460,
      y: 1520,
      width: 220,
      height: 68,
      label: 'AVAL对Vimentin-Trim16结合的竞争性效应',

      shape: 'custom-rect',
      id: 'M'
    },
    {
      x: 289,
      y: 1641,
      width: 220,
      height: 68,
      label: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应',

      shape: 'custom-rect',

      id: 'N'
    },
    {
      x: 623,
      y: 1651,
      width: 220,
      height: 68,
      label: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效',

      shape: 'custom-rect',

      id: 'P'
    },
    {
      x: 754,
      y: 59,
      width: 220,
      height: 68,
      label: '2.在体水平验证VAL结合Vimentin调控肺脉癌转移',

      shape: 'custom-rect',

      id: 'R'
    },
    {
      x: 754,
      y: 235,
      width: 220,
      height: 68,
      label: '构建VAL和AVAL过表达的肺腺癌稳转细胞株',

      shape: 'custom-rect',

      id: 'S'
    },
    {
      x: 754,
      y: 435,
      width: 220,
      height: 68,
      label: '尾静脉注射肺转移模型验证VAL及AVAL功能',

      shape: 'custom-rect',

      id: 'T'
    },
    {
      x: 754,
      y: 599,
      width: 220,
      height: 68,
      label: '心脏注射肺腺癌骨转移模型验证VAL及AVAL功能',

      shape: 'custom-rect',

      id: 'W'
    },
    {
      x: 754,
      y: 727,
      width: 220,
      height: 68,
      label: 'VAL与Trim16存在竞争性效应的在体实验',

      shape: 'custom-rect',

      id: 'X'
    },
    {
      x: 1064,
      y: 59,
      width: 220,
      height: 68,
      label: 'AKTVimentin信号轴在肺腺癌转移中的临床意义',

      shape: 'custom-rect',

      id: 'Y'
    },
    {
      x: 1064,
      y: 235,
      width: 220,
      height: 92,
      label: '200例肺腺癌患者肿瘤组织进行回顾性研究,qPCR、WB和IH检',
      visible: true,
      shape: 'custom-rect',

      id: 'Z'
    }
  ],
  edges: [
    {
      source: 'A',
      target: 'B'
    },
    {
      source: 'B',
      target: 'C'
    },
    {
      source: 'C',
      target: 'D'
    },
    {
      source: 'D',
      target: 'E'
    },
    {
      source: 'E',
      target: 'F'
    },
    {
      source: 'F',
      target: 'G'
    },
    {
      source: 'F',
      target: 'H'
    },
    {
      source: 'G',
      target: 'I'
    },
    {
      source: 'I',
      target: 'J'
    },
    {
      source: 'J',
      target: 'K'
    },
    {
      source: 'K',
      target: 'L'
    },
    {
      source: 'L',
      target: 'M'
    },
    {
      source: 'H',
      target: 'M'
    },
    {
      source: 'M',
      target: 'N'
    },
    {
      source: 'M',
      target: 'P'
    },
    {
      source: 'R',
      target: 'S'
    },
    {
      source: 'S',
      target: 'T'
    },
    {
      source: 'T',
      target: 'W'
    },
    {
      source: 'W',
      target: 'X'
    },
    {
      source: 'Y',
      target: 'Z'
    },
    {
      source: '1',
      target: '2'
    },
    {
      source: '2',
      target: '3'
    }
  ]
}

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
    const svgres = await mermaid.render('text', a)

    document.getElementById('svgContainer')!.innerHTML = svgres.svg

    const nodes = ChartUtils.handleXY()

    const { edges } = ChartUtils.mermaidTojson(a)

    initGraph({
      nodes,
      edges
    })
  }

  const onAttrsChanged = (attrs: State) => {
    console.log(attrs, '111111111111111111')
    currentNode?.attr({
      label: attrs,
      hLine: { refY: attrs.refY },
      vLine: { refX: attrs.refX }
    } as any)
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
      <Settings onChange={onAttrsChanged} />
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
          onChange={onAttrsChanged}
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
