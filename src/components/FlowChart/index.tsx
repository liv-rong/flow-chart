import Footer from '../common/Footer'
import Header from '../common/Header'
import LeftOperate from './components/LeftOperate'
import RightOperate from './components/RightOperate'
import mermaid from 'mermaid'

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

const b = `
flowchart TD
    A[实验目的] --> B[细胞培养]


    A --> J[材料准备]
    J -->|细胞培养基| B
    J -->|细胞株| B
    J -->|抗生素| D
    J -->|孔板| C
    J -->|qqw培养箱| E
    J -->|试剂| F
`

function FlowChart() {
  const {
    initGraph,
    handleZoom,
    refContainer: customRefContainer,
    currentNode,
    setCurrentNode,
    refStencil,
    graph
  } = useFlowChart()

  const { exportJson, exportPng, exportSvg } = useExportFile(graph)

  const handleInit = async () => {
    const svgres = await mermaid.render('text', b)

    document.getElementById('svgContainer')!.innerHTML = svgres.svg

    const nodes = ChartUtils.handleXY()

    // const { edges } = ChartUtils.mermaidTojson(b) ?? {}

    const edges = ChartUtils.getEdgeInfo()

    console.log(nodes, edges)
    initGraph({
      nodes,
      edges
    })
  }

  useEffect(() => {
    handleInit()
    return () => {
      graph?.dispose()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-green-50  relative">
      <Header
        exportJson={exportJson}
        exportPng={exportPng}
        exportSvg={exportSvg}
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
        <RightOperate currentNode={currentNode} />
      </div>
      <Footer />
      <div
        id="svgContainer"
        className="!h-0 absolute top-0 left-0 "
      />
    </div>
  )
}

export default memo(FlowChart)
