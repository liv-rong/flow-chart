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

const experimentFlow = {
  nodes: [
    {
      id: '实验目的',
      x: 0,
      y: 0,
      width: 600,
      height: 100,
      shape: 'ellipse',
      label: '研究lncRNA VAL通过竞争性结合Vimentin调控Trim16介导的泛素化机制。'
    },
    {
      id: '实验使用药物的分子机制',
      x: 0,
      y: 220,
      width: 600,
      height: 100,
      shape: 'rect',
      label: 'VAL通过与Vimentin结合影响其表达与泛素化。'
    },
    {
      id: '功能原理',
      x: 0,
      y: 440,
      width: 600,
      height: 100,
      shape: 'rect',
      label: 'VAL与Vimentin交互对于肺腺癌转移功能的调节至关重要。'
    },
    {
      id: '临床意义',
      x: 0,
      y: 660,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '通过分析肺腺癌患者组织，探讨AKT/STAT3/VAL/Vimentin信号轴的临床相关性。'
    },
    {
      id: '数据分析',
      x: 0,
      y: 880,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '利用qPCR、WB和IHC检测标志物表达，使用SPSS进行统计分析。'
    },
    {
      id: '实验结论',
      x: 0,
      y: 1100,
      width: 600,
      height: 100,
      shape: 'ellipse',
      label: 'VAL的表达影响Vimentin与Trim16的结合，影响肺腺癌细胞转移。'
    },
    {
      id: 'VAL-Vimentin结合位点',
      x: 650,
      y: 220,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '通过突变载体和RNA pulldown实验识别结合区域。'
    },
    {
      id: 'ΔVAL对Vimentin表达的影响',
      x: -650,
      y: 220,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '观察不同质粒剂量对Vimentin调节及转移功能的影响。'
    },
    {
      id: '泛素化调控',
      x: 650,
      y: 440,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '检测ΔVAL影响Vimentin泛素化及与Trim16的关系。'
    },
    {
      id: '在体实验',
      x: -650,
      y: 440,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '通过尾静脉和心脏注射模型验证VAL的功能。'
    },
    {
      id: '临床标记研究',
      x: 650,
      y: 660,
      width: 600,
      height: 100,
      shape: 'rect',
      label: '进行回顾性和前瞻性研究以建立临床相关性。'
    }
  ],
  edges: [
    { source: '实验目的', target: '实验使用药物的分子机制' },
    { source: '实验使用药物的分子机制', target: '功能原理' },
    { source: '功能原理', target: '临床意义' },
    { source: '临床意义', target: '数据分析' },
    { source: '数据分析', target: '实验结论' },
    { source: '实验使用药物的分子机制', target: 'VAL-Vimentin结合位点' },
    { source: '实验使用药物的分子机制', target: 'ΔVAL对Vimentin表达的影响' },
    { source: '功能原理', target: '泛素化调控' },
    { source: '实验结论', target: '在体实验' },
    { source: '临床意义', target: '临床标记研究' }
  ]
}

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
    const svgres = await mermaid.render('text', a)

    document.getElementById('svgContainer')!.innerHTML = svgres.svg

    const nodes = ChartUtils.handleXY()

    const { edges } = ChartUtils.mermaidTojson(a) ?? {}

    initGraph({
      nodes,
      edges
    })
  }

  useEffect(() => {
    // 获取可编辑的 div 元素
    const editableDiv = document.querySelector('.editable')

    // 监听编辑完成事件
    // editableDiv?.addEventListener('blur', () => {
    //   console.log('编辑内容:', editableDiv.innerText)
    // })

    // 自动聚焦到可编辑区域
    // editableDiv?.focus()
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
        className="!h-0 absolute top-0 left-0 -z-20"
      />
    </div>
  )
}

export default memo(FlowChart)
