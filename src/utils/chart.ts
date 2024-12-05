import { Node, Edge } from '@antv/x6'
//起点是椭圆 流程是矩形  判断是菱形 圆角矩形 园
export class ChartUtils {
  static mermaidTojson(mermaidString: string) {
    // 清理输入字符串，去掉多余的空行
    const lines = mermaidString
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const edges: Edge.Metadata[] = []

    lines.forEach((line) => {
      const parts = line.split(/-->\s*/)
      if (parts.length >= 2) {
        const source = parts[0].trim()
        const target = parts[1].trim()

        const { id: sourceId } = this.extractNodeInfo(source) ?? {}
        const { id: targetId, edgeLabel } = this.extractNodeInfo(target) ?? {}

        edges.push({
          source: sourceId, // 源节点
          target: targetId, // 目标节点
          label: edgeLabel || '', // 边的标签
          tools: ['edge-editor']
        })
      }
    })
    return { edges }
  }

  static handleXY(): Node.Metadata[] {
    // 1. 获取节点svg 中的 g 元素 class 为 nodes 的 svg 元素
    const nodesGroup = document.querySelector('svg g.nodes')
    if (!nodesGroup) {
      // console.error('No nodes group found')
      return []
    }

    // 2. 获取节点 nodes 里面的子元素 g
    const childGroups = Array.from(nodesGroup.children).filter((child) => {
      return child.tagName === 'g'
    })

    // 3. 遍历子元素 g，获取它们的 id 和坐标
    const nodeData = Array.from(childGroups).map((child) => {
      const id = child.getAttribute('id')?.split('-')[1] ?? ''

      const transform = child.getAttribute('transform') // 获取 transform 属性

      // 解析 transform 字符串以获取 x 和 y
      let x = 0,
        y = 0,
        width = 0,
        height = 0,
        nodeLabel = '',
        shape = 'rect'
      const body: { [key: string]: any } = {
        border: '1px solid #000',
        stroke: '#333333'
      } // 使用索引签名定义 body 的类型

      if (transform) {
        const translateMatch = transform.match(
          /translate\(\s*([-+]?\d*\.?\d+)\s*,?\s*([-+]?\d*\.?\d+)?\s*\)/
        )
        if (translateMatch) {
          x = parseFloat(translateMatch[1])
          y = parseFloat(translateMatch[2]) // 如果 y 不存在，则默认为 0
        }
      }

      // 获取子节点 foreignObject  的宽度和高度 （如果存在）
      const foreignObject = child.querySelector('foreignObject')
      if (foreignObject) {
        width = foreignObject.clientWidth + 20
        height = foreignObject.clientHeight + 20
      }

      // 获取第一个儿子节点
      const firstChild = child.querySelector('*')
      // console.log(firstChild, 'firstChild')
      if (firstChild) {
        //获取儿子节点的标签属性
        const tagName = firstChild.tagName.toLowerCase()
        if (tagName === 'rect') {
          shape = 'custom-rect'
          body.rx = firstChild.getAttribute('rx')
          body.ry = firstChild.getAttribute('ry')
        }

        if (tagName === 'ellipse' || tagName === 'circle') {
          shape = 'custom-ellipse'
        }
        if (tagName === 'polygon') {
          shape = 'custom-polygon'
          width = width + 20
          height = height + 20
          body.refPoints = firstChild.getAttribute('points')
        }
      }

      // 获取子节点 P  的内容 （如果存在）
      const p = child.querySelector('p')
      if (p) {
        //如果有换行符 则替换为 \n
        nodeLabel = p.innerText
      }

      return {
        id,
        x,
        y,
        width,
        height,
        shape,
        attrs: {
          body
        },
        refX: '99%',

        refY: '99%',

        label: nodeLabel
      }
    })
    return nodeData
  }

  static extractNodeInfo(inputString: string) {
    const regex = /(\w+)([\[\{\(])(.*?)([\]\}\)])/
    const simpleRegex = /(\w+)\s*/

    if (/^\w+$/.test(inputString)) {
      return {
        id: inputString,
        edgeLabel: ''
      }
    }

    let edgeLabel = ''

    const matchEdge = inputString.match(/\|(.+?)\|/)

    if (matchEdge) {
      edgeLabel = matchEdge[1]
    }

    const matchDeleteEdge = inputString.replace(/\|[^|]*\|/, '').trim()

    const match = matchDeleteEdge.match(regex)

    if (match) {
      const id = match[1]
      return { id, edgeLabel }
    } else {
      const simpleMatch = inputString.match(simpleRegex)
      if (simpleMatch) {
        return {
          id: simpleMatch[1],
          edgeLabel
        }
      }
    }

    return null
  }

  static replaceBRWithNewline(inputString: string) {
    return inputString.replace(/<br\/?>/g, '\n')
  }
}
