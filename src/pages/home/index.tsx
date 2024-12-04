import { Model, Node, Edge } from '@antv/x6'
import mermaid from 'mermaid'
import dagre from '@dagrejs/dagre'

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

function Home() {
  const refContainer = useRef<HTMLDivElement>(null)

  const [svg, setSvg] = useState<string>()

  const [nodes, setNodes] = useState<Node.Metadata[]>([])
  const [edges, setEdges] = useState<Edge.Metadata[]>([])

  const handleInit = async () => {
    const res = await mermaid.render('text', mermaidInput)
    setSvg(res.svg)
    document.getElementById('svgContainer')!.innerHTML = res.svg
    // handleXYTojson(res.svg)
    handleXYTojson()
  }

  const handleXYTojson = () => {
    const res = ChartUtils.handleXY()
    setNodes(res)
    const { edges } = ChartUtils.mermaidTojson(mermaidInput)
    setEdges(edges)
  }

  const testB = {
    nodes: [
      {
        id: '1',

        width: 28,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '1'
          }
        },
        label: '1'
      },
      {
        id: '2',

        width: 220,
        height: 140,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '100例AKT持续激活特征的肺腺癌前瞻性研究:新鲜组织标本配对癌旁组织及血浆检测其中STAT3、VAL和Vimentin表达'
          }
        },
        label:
          '100例AKT持续激活特征的肺腺癌前瞻性研究:新鲜组织标本配对癌旁组织及血浆检测其中STAT3、VAL和Vimentin表达'
      },
      {
        id: '3',

        width: 220,
        height: 140,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '统计分析:对AKT、STAT3、VAL和Vimentin表达与临床病理因素做单因素/多因素分析和预后关联分析，明确临床意义'
          }
        },
        label:
          '统计分析:对AKT、STAT3、VAL和Vimentin表达与临床病理因素做单因素/多因素分析和预后关联分析，明确临床意义'
      },
      {
        id: 'A',

        width: 220,
        height: 92,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '阐明VAL竞争性结合Vimentin调控Trim16介导泛素化的分子机制'
          }
        },
        label: '阐明VAL竞争性结合Vimentin调控Trim16介导泛素化的分子机制'
      },
      {
        id: 'B',

        width: 179,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: '5',
            ry: '5'
          },
          text: {
            text: 'VAL-Vimentin结合位点'
          }
        },
        label: 'VAL-Vimentin结合位点'
      },
      {
        id: 'C',

        width: 212,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '构建三种分段截短突变载体'
          }
        },
        label: '构建三种分段截短突变载体'
      },
      {
        id: 'D',

        width: 214,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'RNA pulldown验证交互位点'
          }
        },
        label: 'RNA pulldown验证交互位点'
      },
      {
        id: 'E',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'ΔVAL影响Vimentin表达及转移'
          }
        },
        label: 'ΔVAL影响Vimentin表达及转移'
      },
      {
        id: 'F',

        width: 197,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '构建结合失活突变体AVAL'
          }
        },
        label: '构建结合失活突变体AVAL'
      },
      {
        id: 'G',

        width: 215,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'ΔVAL对Vimentin泛素化调控'
          }
        },
        label: 'ΔVAL对Vimentin泛素化调控'
      },
      {
        id: 'H',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '验证AVAL与VAL调控Vimentin蛋白表达的差异'
          }
        },
        label: '验证AVAL与VAL调控Vimentin蛋白表达的差异'
      },
      {
        id: 'I',

        width: 220,
        height: 92,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '.MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力'
          }
        },
        label: '.MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力'
      },
      {
        id: 'J',

        width: 220,
        height: 92,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期'
          }
        },
        label: 'CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期'
      },
      {
        id: 'K',

        width: 206,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '.检测K48和K63泛素化水平'
          }
        },
        label: '.检测K48和K63泛素化水平'
      },
      {
        id: 'L',

        width: 220,
        height: 92,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验'
          }
        },
        label: '.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验'
      },
      {
        id: 'M',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'ΔVAL对Vimentin-Trim16结合的竞争性效应'
          }
        },
        label: 'ΔVAL对Vimentin-Trim16结合的竞争性效应'
      },
      {
        id: 'N',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应'
          }
        },
        label: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应'
      },
      {
        id: 'P',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应'
          }
        },
        label: 'AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应'
      },
      {
        id: 'R',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '2.在体水平验证VAL结合Vimentin调控肺腺癌转移'
          }
        },
        label: '2.在体水平验证VAL结合Vimentin调控肺腺癌转移'
      },
      {
        id: 'S',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '构建VAL和ΔVAL过表达的肺腺癌稳转细胞株'
          }
        },
        label: '构建VAL和ΔVAL过表达的肺腺癌稳转细胞株'
      },
      {
        id: 'T',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '尾静脉注射肺转移模型验证VAL及AVAL功能'
          }
        },
        label: '尾静脉注射肺转移模型验证VAL及AVAL功能'
      },
      {
        id: 'W',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '心脏注射肺腺癌骨转移模型验证VAL及AVAL功能'
          }
        },
        label: '心脏注射肺腺癌骨转移模型验证VAL及AVAL功能'
      },
      {
        id: 'X',

        width: 220,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'VAL与Trim16存在竞争性效应的在体实验'
          }
        },
        label: 'VAL与Trim16存在竞争性效应的在体实验'
      },
      {
        id: 'Y',

        width: 220,
        height: 92,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '.AKT/STAT3/VAL/Vimentin信号轴在肺腺癌转移中的临床意义'
          }
        },
        label: '.AKT/STAT3/VAL/Vimentin信号轴在肺腺癌转移中的临床意义'
      },
      {
        id: 'Z',

        width: 220,
        height: 116,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: '200例肺腺癌患者肿瘤组织进行回顾性研究，qPCR、WB和IH 检测检测其中AKT、STAT3、VAL和Vimentin表达'
          }
        },
        label:
          '200例肺腺癌患者肿瘤组织进行回顾性研究，qPCR、WB和IH 检测检测其中AKT、STAT3、VAL和Vimentin表达'
      }
    ],
    edges: [
      {
        source: 'A',
        target: 'B',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'B',
        target: 'C',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'C',
        target: 'D',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'D',
        target: 'E',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'E',
        target: 'F',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'F',
        target: 'G',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'F',
        target: 'H',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'G',
        target: 'I',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'I',
        target: 'J',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'J',
        target: 'K',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'K',
        target: 'L',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'L',
        target: 'M',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'H',
        target: 'M',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'M',
        target: 'N',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'M',
        target: 'P',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'R',
        target: 'S',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'S',
        target: 'T',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'T',
        target: 'W',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'W',
        target: 'X',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'Y',
        target: 'Z',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: '1',
        target: '2',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: '2',
        target: '3',
        label: '',
        tools: ['edge-editor'],
        shape: 'edge'
      }
    ]
  }

  const drugValMechanism = {
    nodes: [
      {
        x: 530,
        y: 60,
        width: 600,
        height: 100,
        label: '药物VAL的分子机制 - 竞争性结合Vimentin调控Trim16介导的泛素化',
        shape: 'ellipse',
        id: '药物VAL的分子机制 - 竞争性结合Vimentin调控Trim16介导的泛素化'
      },
      {
        x: 530,
        y: 220,
        width: 600,
        height: 100,
        label: '功能原理 - 通过影响Vimentin表达和转移',
        shape: 'rect',
        id: '功能原理 - 通过影响Vimentin表达和转移'
      },
      {
        x: 530,
        y: 380,
        width: 600,
        height: 100,
        label: '临床意义 - 评估VAL在肺腺癌转移中的作用',
        shape: 'rect',
        id: '临床意义 - 评估VAL在肺腺癌转移中的作用'
      },
      {
        x: 530,
        y: 540,
        width: 600,
        height: 100,
        label: '数据分析 - 统计AKT、STAT3、VAL和Vimentin表达与临床预后的相关性',
        shape: 'ellipse',
        id: '数据分析 - 统计AKT、STAT3、VAL和Vimentin表达与临床预后的相关性'
      }
    ],
    edges: [
      {
        source: '药物VAL的分子机制 - 竞争性结合Vimentin调控Trim16介导的泛素化',
        target: '功能原理 - 通过影响Vimentin表达和转移',
        label: ''
      },
      {
        source: '功能原理 - 通过影响Vimentin表达和转移',
        target: '临床意义 - 评估VAL在肺腺癌转移中的作用',
        label: ''
      },
      {
        source: '临床意义 - 评估VAL在肺腺癌转移中的作用',
        target: '数据分析 - 统计AKT、STAT3、VAL和Vimentin表达与临床预后的相关性',
        label: ''
      }
    ]
  }
  const handleXY = () => {
    const g = new dagre.graphlib.Graph()
    g.setGraph({})

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () {
      return {}
    })

    testB.nodes.forEach((item) => {
      const { id, label, width, height, shape, attrs } = item
      g.setNode(id, {
        label,
        width,
        height,
        shape,
        attrs
      })
    })
    testB.edges.forEach((item) => {
      g.setEdge(item.source, item.target, { label: item.label })
    })

    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.

    // g.setNode('kspacey', { label: 'Kevin Spacey', width: 144, height: 100 })
    // g.setNode('swilliams', { label: 'Saul Williams', width: 160, height: 100 })
    // g.setNode('bpitt', { label: 'Brad Pitt', width: 108, height: 100 })
    // g.setNode('hford', { label: 'Harrison Ford', width: 168, height: 100 })
    // g.setNode('lwilson', { label: 'Luke Wilson', width: 144, height: 100 })
    // g.setNode('kbacon', { label: 'Kevin Bacon', width: 121, height: 100 })

    // Add edges to the graph.
    // g.setEdge('kspacey', 'swilliams')
    // g.setEdge('swilliams', 'kbacon')
    // g.setEdge('bpitt', 'kbacon')
    // g.setEdge('hford', 'lwilson')
    // g.setEdge('lwilson', 'kbacon')

    dagre.layout(g)

    const handleNode: Node.Metadata[] = []

    g.nodes().forEach(function (v) {
      console.log('Node ' + v + ': ' + JSON.stringify(g.node(v)))
      handleNode.push({ ...g.node(v), id: v })
    })
    setNodes(handleNode)
    const handleEdge: Edge.Metadata[] = []
    g.edges().forEach(function (e) {
      console.log('Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)))
      handleEdge.push({ ...g.edge(e), source: e.v, target: e.w })
    })
    setEdges(handleEdge)
  }

  useEffect(() => {
    handleInit()
    // handleXY()
  }, [])

  useEffect(() => {
    if (svg) {
      handleXYTojson()
    }
  }, [svg])

  return (
    <div className="h-screen w-full">
      <FlowChart />
      <div
        id="svgContainer"
        ref={refContainer}
        dangerouslySetInnerHTML={{ __html: svg ?? '' }}
      />

      {/* <MermaidDiagram children={mermaidInput} /> */}
    </div>
  )
}

export default Home
