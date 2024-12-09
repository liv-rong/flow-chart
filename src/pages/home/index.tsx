import { Model, Node, Edge } from '@antv/x6'

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

const testData = {
  nodes: [
    {
      id: '药物机制',
      x: 100,
      y: 50,
      width: 150,
      height: 60,
      shape: 'rect',
      label: 'lncRNA VAL通过竞争性结合Vimentin调控Trim16介导的泛素化作用'
    },
    {
      id: 'VAL-Vimentin结合实验',
      x: 100,
      y: 120,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '通过RNA pulldown和WB验证VAL不同片段与Vimentin的结合'
    },
    {
      id: 'ΔVAL对Vimentin表达的影响',
      x: 100,
      y: 190,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '构建ΔVAL突变体，观察其对Vimentin表达及肺腺癌细胞侵袭的调节作用'
    },
    {
      id: 'ΔVAL对Vimentin泛素化的调控',
      x: 100,
      y: 260,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '使用MG132和CHX观察ΔVAL对Vimentin半衰期和泛素化水平的影响'
    },
    {
      id: 'ΔVAL与Trim16结合的竞争性效应',
      x: 100,
      y: 330,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '通过co-IP实验评估ΔVAL对Trim16与Vimentin结合的影响'
    },
    {
      id: '在体验证VAL与Vimentin调控功能',
      x: 100,
      y: 400,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '构建VAL和ΔVAL过表达的肺腺癌细胞株，并进行尾静脉注射建立肺转移模型'
    },
    {
      id: '验证骨转移模型',
      x: 100,
      y: 470,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '在心脏注射肺腺癌细胞，评估VAL及ΔVAL在骨转移中的作用'
    },
    {
      id: 'VAL与Trim16竞争效应的在体实验',
      x: 100,
      y: 540,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '评估VAL对Trim16介导的Vimentin调控及其在转移中的作用'
    },
    {
      id: 'AKT/STAT3/VAL/Vimentin信号轴的验证',
      x: 100,
      y: 610,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '进行动物模型中的信号轴调控实验'
    },
    {
      id: '临床意义研究',
      x: 100,
      y: 680,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '通过回顾性和前瞻性研究分析AKT、STAT3、VAL和Vimentin的表达与肺腺癌转移的相关性'
    },
    {
      id: '统计分析',
      x: 100,
      y: 750,
      width: 150,
      height: 60,
      shape: 'rect',
      label: '采用SPSS分析分子标记物与临床因素及预后的关系'
    }
  ],
  edges: [
    {
      source: '药物机制',
      target: 'VAL-Vimentin结合实验',
      label: ''
    },
    {
      source: 'VAL-Vimentin结合实验',
      target: 'ΔVAL对Vimentin表达的影响',
      label: ''
    },
    {
      source: 'ΔVAL对Vimentin表达的影响',
      target: 'ΔVAL对Vimentin泛素化的调控',
      label: ''
    },
    {
      source: 'ΔVAL对Vimentin泛素化的调控',
      target: 'ΔVAL与Trim16结合的竞争性效应',
      label: ''
    },
    {
      source: 'ΔVAL与Trim16结合的竞争性效应',
      target: '在体验证VAL与Vimentin调控功能',
      label: ''
    },
    {
      source: '在体验证VAL与Vimentin调控功能',
      target: '验证骨转移模型',
      label: ''
    },
    {
      source: '验证骨转移模型',
      target: 'VAL与Trim16竞争效应的在体实验',
      label: ''
    },
    {
      source: 'VAL与Trim16竞争效应的在体实验',
      target: 'AKT/STAT3/VAL/Vimentin信号轴的验证',
      label: ''
    },
    {
      source: 'AKT/STAT3/VAL/Vimentin信号轴的验证',
      target: '临床意义研究',
      label: ''
    },
    {
      source: '临床意义研究',
      target: '统计分析',
      label: ''
    }
  ]
}

const testC = {
  nodes: [
    {
      x: 530,
      y: 60,
      width: 150,
      height: 60,
      label: 'lncRNA VAL通过竞争性结合Vimentin调控Trim16介导的泛素化作用',
      shape: 'custom-rect',

      id: '药物机制'
    }
  ]
}
const Mynodes: Node.Metadata[] = [
  // {
  //   id: 'node1',
  //   shape: 'custom-rect',
  //   x: 0,
  //   y: 0,
  //   width: 100,
  //   height: 200,
  //   label: '过程',
  //   attrs: {
  //     body: {
  //       stroke: '#8f8f8f',
  //       strokeWidth: 1,
  //       fill: 'red',
  //       rx: 6,
  //       ry: 6
  //     },
  //     label: {
  //       text: 'hello',
  //       fill: '#000',
  //       fontSize: 28
  //     }
  //   }
  // },
  {
    shape: 'custom-rect',
    label: '过程1',
    x: 20,
    y: 20
  },
  {
    shape: 'custom-rect',
    label: '过程2',
    x: 220,
    y: 220
  },
  {
    shape: 'custom-rect',
    label: '过程3',
    x: 420,
    y: 420
  }
  // {
  //   id: 'node3',
  //   shape: 'custom-polygon',
  //   attrs: {
  //     body: {
  //       refPoints: '0,10 10,0 20,10 10,20'
  //     }
  //   },
  //   label: '决策'
  // }
  // {
  //   id: 'node2',
  //   shape: 'rect',
  //   x: 300,
  //   y: 500,
  //   width: 100,
  //   height: 40,
  //   label: 'world',
  //   attrs: {
  //     body: {
  //       stroke: '#8f8f8f',
  //       strokeWidth: 1,
  //       fill: '#fff',
  //       rx: 6,
  //       ry: 6
  //     }
  //   }
  // }
]

// A[ChristmasA] -->|Get money| B(Go <br/>  shoppingB)
// B --> C{Let me <br/> thinkC}
// C -->|One| D[LaptopD]
// C -->|Two| E[iPhoneE]
// C -->|Three| F[fa:fa-car CarF]
const mermaidInput = `
flowchart TD
    A[阐明VAL竞争性结合Vimentin调控Trim16介导泛素化的分子机制] --> B(VAL-Vimentin结合位点)
    B --> C[构建三种分段截短突变载体]
    C --> D[RNA pulldown验证交互位点]
    D --> E[ΔVAL影响Vimentin表达及转移]
    E --> F[构建结合失活突变体AVAL]
    F --> G[ ΔVAL对Vimentin泛素化调控]
`

// `
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
//   const mermaidInput = `
//   flowchart TD
//     Start --> Stop
// `

const Home = () => {
  return (
    <div className="h-screen w-full">
      <FlowChart />
    </div>
  )
}

export default Home
