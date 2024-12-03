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
    F --> H[验证AVAL与VAL调控Vimentin蛋白表达的差异]
    G --> I[.MG132抑制剂处理观察AVAL与VAL调节Vimentin表达能力]
    I --> J[CHX抑制剂处理观察AVAL与VAL影响Vimentin蛋白半衰期]
    J --> K[.检测K48和K63泛素化水平]
    K --> L[.Trim16过表达条件下重复上述a/b/c三个泛素化相关实验]
    L --> M[ΔVAL对Vimentin-Trim16结合的竞争性效应]
    H --> M[ΔVAL对Vimentin-Trim16结合的竞争性效应]
    M --> N[AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应]
    M --> P[AVAL与VAL处理co-IP比较Trim16与Vimentin结合效应]

    R[2.在体水平验证VAL结合Vimentin调控肺腺癌转移] --> S[构建VAL和ΔVAL过表达的肺腺癌稳转细胞株]
    S --> T[尾静脉注射肺转移模型验证VAL及AVAL功能]
    T --> W[心脏注射肺腺癌骨转移模型验证VAL及AVAL功能]
    W --> X[VAL与Trim16存在竞争性效应的在体实验]

    Y[.AKT/STAT3/VAL/Vimentin信号轴在肺腺癌转移中的临床意义] --> Z[200例肺腺癌患者肿瘤组织进行回顾性研究，qPCR、WB和IH 检测检测其中AKT、STAT3、VAL和Vimentin表达]
    1 --> 2[100例AKT持续激活特征的肺腺癌前瞻性研究:新鲜组织标本配对癌旁组织及血浆检测其中STAT3、VAL和Vimentin表达]
    2 --> 3[统计分析:对AKT、STAT3、VAL和Vimentin表达与临床病理因素做单因素/多因素分析和预后关联分析，明确临床意义]
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

  const testA = {
    nodes: [
      {
        id: 'A',
        x: 174.21250343322754,
        y: 52.46875,
        width: 94,
        height: 68,
        shape: 'custom-ellipse',
        attrs: {
          body: {},
          text: {
            text: '椭圆形\naasdada状'
          }
        },
        label: '椭圆形\naasdada状'
      },
      {
        id: 'B',
        x: 174.21250343322754,
        y: 209.9375,
        width: 92,
        height: 68,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: '5',
            ry: '5'
          },
          text: {
            text: 'Go\nshoppingB'
          }
        },
        label: 'Go\nshoppingB'
      },
      {
        id: 'C',
        x: 174.21250343322754,
        y: 362.9375,
        width: 90,
        height: 88,
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '64,0 128,-64 64,-128 0,-64'
          },
          text: {
            text: 'Let me\nthinkC'
          }
        },
        label: 'Let me\nthinkC'
      },
      {
        id: 'D',
        x: 67.54375076293945,
        y: 527.9375,
        width: 79,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'LaptopD'
          }
        },
        label: 'LaptopD'
      },
      {
        id: 'E',
        x: 235.1437530517578,
        y: 527.9375,
        width: 76,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'iPhoneE'
          }
        },
        label: 'iPhoneE'
      },
      {
        id: 'F',
        x: 389.50000381469727,
        y: 527.9375,
        width: 53,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: null,
            ry: null
          },
          text: {
            text: 'CarF'
          }
        },
        label: 'CarF'
      },
      {
        id: 'id1',
        x: 313.05625343322754,
        y: 52.46875,
        width: 84,
        height: 44,
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: '19.5',
            ry: '19.5'
          },
          text: {
            text: '圆角矩形'
          }
        },
        label: '圆角矩形'
      },
      {
        id: 'id2',
        x: 450.43125343322754,
        y: 52.46875,
        width: 72,
        height: 64,
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '43,0 86,-43 43,-86 0,-43'
          },
          text: {
            text: '菱形'
          }
        },
        label: '菱形'
      }
    ],
    edges: [
      {
        source: 'A',
        target: 'B',
        label: 'Get money',
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
        label: 'One',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'C',
        target: 'E',
        label: 'Two',
        tools: ['edge-editor'],
        shape: 'edge'
      },
      {
        source: 'C',
        target: 'F',
        label: 'Three',
        tools: ['edge-editor'],
        shape: 'edge'
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
      <FlowChart data={{ nodes, edges }} />
      <div
        ref={refContainer}
        dangerouslySetInnerHTML={{ __html: svg ?? '' }}
      />

      {/* <MermaidDiagram children={mermaidInput} /> */}
    </div>
  )
}

export default Home
