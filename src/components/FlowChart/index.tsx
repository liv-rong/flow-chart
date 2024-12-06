import { Graph, type Model, Shape } from '@antv/x6'
import Footer from '../common/Footer'
import Header from '../common/Header'
import LeftOperate from './components/LeftOperate'
import RightOperate from './components/RightOperate'
import mermaid from 'mermaid'
import type { Props } from 'react-resize-detector/build/types/types'
import { type State } from './components/settings'
import Settings from './components/settings'

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

const lungCancerResearch = {
  nodes: [
    {
      x: 0,
      y: 60,
      width: 600,
      height: 100,
      label: '实验目的 - 研究lncRNA VAL与Vimentin结合对Trim16介导的泛素化作用的调控机制。',
      shape: 'ellipse',
      id: '实验目的'
    },
    {
      x: 0,
      y: 280,
      width: 600,
      height: 100,
      label: '药物机制 - VAL通过竞争性结合Vimentin，影响其泛素化及相关信号通路。',
      shape: 'rect',
      id: '药物机制'
    },
    {
      x: 0,
      y: 500,
      width: 600,
      height: 100,
      label: '功能原理 - VAL调控Vimentin表达，进而影响肺腺癌细胞的侵袭与转移能力。',
      shape: 'rect',
      id: '功能原理'
    },
    {
      x: 0,
      y: 720,
      width: 600,
      height: 100,
      label: '临床意义 - VAL和Vimentin的关系可能成为肺腺癌转移的生物标志物。',
      shape: 'rect',
      id: '临床意义'
    },
    {
      x: 0,
      y: 940,
      width: 600,
      height: 100,
      label:
        '数据分析 - qPCR、WB和IHC检测VAL、Vimentin、AKT和STAT3的表达，分析其与肺腺癌转移的相关性。',
      shape: 'rect',
      id: '数据分析'
    },
    {
      x: 0,
      y: 1160,
      width: 600,
      height: 100,
      label: '实验结论 - VAL通过影响Vimentin和Trim16的交互作用，调控肺腺癌转移。',
      shape: 'rect',
      id: '实验结论'
    },
    {
      x: 0,
      y: 1380,
      width: 600,
      height: 100,
      label: '临床标记 - 统计分析表明AKT、STAT3、VAL和Vimentin的表达与患者生存率和转移事件相关。',
      shape: 'ellipse',
      id: '临床标记'
    },
    {
      x: 650,
      y: 500,
      width: 600,
      height: 100,
      label: 'VAL促进细胞迁移',
      shape: 'rect',
      id: 'VAL促进细胞迁移'
    },
    {
      x: -650,
      y: 500,
      width: 600,
      height: 100,
      label: 'ΔVAL抑制迁移',
      shape: 'rect',
      id: 'ΔVAL抑制迁移'
    },
    {
      x: 650,
      y: 1160,
      width: 600,
      height: 100,
      label: 'AKT/STAT3信号轴可能介导此过程',
      shape: 'rect',
      id: 'AKT/STAT3信号轴'
    },
    {
      x: -650,
      y: 1160,
      width: 600,
      height: 100,
      label: '临床案例支持其作为潜在治疗靶点',
      shape: 'rect',
      id: '临床案例支持'
    }
  ],
  edges: [
    { source: '实验目的', target: '药物机制' },
    { source: '药物机制', target: '功能原理' },
    { source: '功能原理', target: '临床意义' },
    { source: '临床意义', target: '数据分析' },
    { source: '数据分析', target: '实验结论' },
    { source: '实验结论', target: '临床标记' },
    { source: '功能原理', target: 'VAL促进细胞迁移' },
    { source: '功能原理', target: 'ΔVAL抑制迁移' },
    { source: '实验结论', target: 'AKT/STAT3信号轴' },
    { source: '实验结论', target: '临床案例支持' }
  ]
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
