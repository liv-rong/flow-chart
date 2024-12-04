import { Graph, type Model, Shape } from '@antv/x6'
import Footer from './Footer'
import Header from './Header'
import LeftOperate from './LeftOperate'
import RightOperate from './RightOperate'
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
interface Props {}

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

const testC = {
  nodes: [
    {
      x: 530,
      y: 60,
      width: 600,
      height: 100,
      label: '实验目的 - 研究lncRNA VAL如何通过竞争性结合Vimentin调控Trim16介导的泛素化作用。',
      shape: 'ellipse',
      id: '研究lncRNA VAL调控作用'
    },
    {
      x: 530,
      y: 280,
      width: 600,
      height: 100,
      label: '药物分子机制 - VAL与Vimentin结合位点的确定',
      shape: 'rect',
      id: 'VAL与Vimentin结合'
    },
    {
      x: 530,
      y: 500,
      width: 600,
      height: 100,
      label: '功能原理 - ΔVAL对Vimentin表达及肺腺癌转移影响的评估',
      shape: 'rect',
      id: 'ΔVAL影响评估'
    },
    {
      x: 530,
      y: 720,
      width: 600,
      height: 100,
      label: '临床意义 - VAL结合Vimentin对肺腺癌转移的影响',
      shape: 'rect',
      id: 'VAL对转移影响'
    },
    {
      x: 530,
      y: 940,
      width: 600,
      height: 100,
      label: '数据分析 - 统计肺转移灶数量及大小',
      shape: 'rect',
      id: '肺转移数据分析'
    },
    {
      x: 530,
      y: 1160,
      width: 600,
      height: 100,
      label: '实验结论 - VAL与Trim16的竞争性效应在体实验结果',
      shape: 'ellipse',
      id: 'VAL与Trim16竞争性效应'
    },
    {
      x: 1180,
      y: 280,
      width: 600,
      height: 100,
      label: '全长VAL作为阳性对照',
      shape: 'rect',
      id: '全长VAL阳性对照'
    },
    {
      x: 1830,
      y: 280,
      width: 600,
      height: 100,
      label: '截短突变体验证结合情况',
      shape: 'rect',
      id: '截短突变体验证'
    },
    {
      x: 1180,
      y: 500,
      width: 600,
      height: 100,
      label: '不同质粒剂量下的调节作用',
      shape: 'rect',
      id: '质粒剂量调节'
    },
    {
      x: 1830,
      y: 500,
      width: 600,
      height: 100,
      label: 'Transwell实验验证侵袭功能',
      shape: 'rect',
      id: 'Transwell验证'
    },
    {
      x: 1180,
      y: 720,
      width: 600,
      height: 100,
      label: '构建稳定细胞株',
      shape: 'rect',
      id: '稳定细胞株构建'
    },
    {
      x: 1830,
      y: 720,
      width: 600,
      height: 100,
      label: '尾静脉和心脏注射转移模型',
      shape: 'rect',
      id: '转移模型注射'
    },
    {
      x: 1180,
      y: 940,
      width: 600,
      height: 100,
      label: '病理取材与HE染色',
      shape: 'rect',
      id: '病理与HE染色'
    },
    {
      x: 1830,
      y: 940,
      width: 600,
      height: 100,
      label: '免疫组化检测Vimentin表达',
      shape: 'rect',
      id: 'Vimentin免疫检测'
    },
    {
      x: 1180,
      y: 1160,
      width: 600,
      height: 100,
      label: '在动物模型中验证',
      shape: 'rect',
      id: '动物模型验证'
    },
    {
      x: 1830,
      y: 1160,
      width: 600,
      height: 100,
      label: 'AKT/STAT3/VAL/Vimentin信号轴的作用',
      shape: 'rect',
      id: '信号轴作用'
    },
    {
      x: 1180,
      y: 1380,
      width: 600,
      height: 100,
      label: '检测AKT、STAT3、VAL和Vimentin表达',
      shape: 'rect',
      id: '检测表达'
    },
    {
      x: 1830,
      y: 1380,
      width: 600,
      height: 100,
      label: 'SPSS分析生存率与分子标记的关联',
      shape: 'rect',
      id: '生存率分析'
    }
  ],
  edges: [
    {
      source: '研究lncRNA VAL调控作用',
      target: 'VAL与Vimentin结合',
      label: '下一步'
    },
    {
      source: 'VAL与Vimentin结合',
      target: 'ΔVAL影响评估',
      label: '下一步'
    },
    {
      source: 'ΔVAL影响评估',
      target: 'VAL对转移影响',
      label: '下一步'
    },
    {
      source: 'VAL对转移影响',
      target: '肺转移数据分析',
      label: '下一步'
    },
    {
      source: '肺转移数据分析',
      target: 'VAL与Trim16竞争性效应'
    },
    {
      source: 'VAL与Vimentin结合',
      target: '全长VAL阳性对照',
      label: '分支'
    },
    {
      source: 'VAL与Vimentin结合',
      target: '截短突变体验证',
      label: '分支'
    },
    {
      source: 'ΔVAL影响评估',
      target: '质粒剂量调节',
      label: '分支'
    },
    {
      source: 'ΔVAL影响评估',
      target: 'Transwell验证',
      label: '分支'
    },
    {
      source: 'VAL对转移影响',
      target: '稳定细胞株构建',
      label: '分支'
    },
    {
      source: 'VAL对转移影响',
      target: '转移模型注射',
      label: '分支'
    },
    {
      source: '肺转移数据分析',
      target: '病理与HE染色',
      label: '分支'
    },
    {
      source: '肺转移数据分析',
      target: 'Vimentin免疫检测',
      label: '分支'
    },
    {
      source: 'VAL与Trim16竞争性效应',
      target: '动物模型验证',
      label: '分支'
    },
    {
      source: 'VAL与Trim16竞争性效应',
      target: '信号轴作用',
      label: '分支'
    },
    {
      source: '信号轴作用',
      target: '检测表达',
      label: '下一步'
    },
    {
      source: '检测表达',
      target: '生存率分析',
      label: '下一步'
    }
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
    const svgres = await mermaid.render('text', test2)

    document.getElementById('svgContainer')!.innerHTML = svgres.svg

    const res = ChartUtils.handleXY()

    const { edges } = ChartUtils.mermaidTojson(test2)
    console.log(edges, res)
    initGraph({
      edges,
      nodes: res
    })
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
          console.log(graph?.toJSON())
          graph?.toJSON()
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
