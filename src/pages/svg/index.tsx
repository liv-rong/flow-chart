import { Model, Node, Edge } from '@antv/x6'

const nodes = [
  {
    id: 'node1',
    shape: 'rect',
    x: 40,
    y: 40,
    width: 100,
    height: 40,
    label: '<div style="color: red;">hello</div>',
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
    id: 'node5',
    shape: 'ellipse',
    x: 200,
    y: 200,
    width: 200,
    height: 40,
    label: 'hello',
    attrs: {
      // body 是选择器名称，选中的是 rect 元素
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 2,
        fill: '#fff'
      }
    }
  },
  {
    id: 'node3',
    shape: 'polygon',
    x: 100,
    y: 100,
    width: 100,
    height: 40,
    label: 'polygon',
    attrs: {
      // body 是选择器名称，选中的是 rect 元素
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        refPoints: '0,10 10,0 20,10 10,20'
      }
    }
    // points: [
    //   { x: 150, y: 80 }, // 顶部
    //   { x: 200, y: 100 }, // 右侧
    //   { x: 150, y: 120 }, // 底部
    //   { x: 100, y: 100 } // 左侧
    // ]
  },
  {
    id: 'node4',
    shape: 'circle',
    x: 120,
    y: 120,
    width: 100,
    height: 40,
    label: 'circle',
    attrs: {
      // body 是选择器名称，选中的是 rect 元素
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff'
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
]
const edges = [
  {
    source: 'node1',
    target: 'node2',
    label: 'Edge 1'
  }
]

function Svg() {
  return (
    <div className="h-screen w-full">
      <FlowChart
        data={{
          nodes,
          edges
        }}
      />

      {/* <MermaidDiagram children={mermaidInput} /> */}
    </div>
  )
}

export default Svg
