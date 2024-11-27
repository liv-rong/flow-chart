import { Node, Edge } from '@antv/x6'
export class ChartUtils {
  static mermaidTojson(mermaidString: string) {
    // debugger
    // 清理输入字符串，去掉多余的空行
    const lines = mermaidString
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    console.log(lines, 'lines')

    const nodes: Node.Metadata[] = []
    const edges: Edge.Metadata[] = []
    const nodeIds = new Set() // 用于跟踪唯一节点

    lines.forEach((line) => {
      const parts = line.split(/-->\s*/)
      if (parts.length >= 2) {
        const source = parts[0].trim()
        const target = parts[1].trim()

        const {
          id: sourceId,
          nodeLabel: sourceLabel,
          shape: sourceShape
        } = this.extractNodeInfo(source) ?? {}
        const {
          id: targetId,
          nodeLabel: targetLabel,
          edgeLabel,
          shape: targetShape
        } = this.extractNodeInfo(target) ?? {}

        if (sourceId && !nodeIds.has(sourceId)) {
          nodes.push({ id: sourceId, label: sourceLabel, shape: sourceShape })
          nodeIds.add(sourceId)
        }

        if (targetId && !nodeIds.has(targetId)) {
          nodes.push({ id: targetId, label: targetLabel, shape: targetShape })
          nodeIds.add(targetId)
        }

        edges.push({
          source: sourceId, // 源节点
          target: targetId, // 目标节点
          label: edgeLabel || '' // 边的标签
        })
      }
    })
    console.log(nodes, edges)
    return { nodes, edges }
  }

  static handleXY() {
    // 1. 获取节点svg 中的 g 元素 class 为 nodes 的 svg 元素
    const nodesGroup = document.querySelector('svg g.nodes')
    if (!nodesGroup) {
      console.error('No nodes group found')
      return
    }

    // 2. 获取节点 nodes 里面的子元素 g
    const childGroups = Array.from(nodesGroup.children).filter((child) => {
      return child.tagName === 'g'
    })

    // 3. 遍历子元素 g，获取它们的 id 和坐标
    const nodeData = Array.from(childGroups).map((child) => {
      const id = child.getAttribute('id') // 获取 id
      const transform = child.getAttribute('transform') // 获取 transform 属性

      // 解析 transform 字符串以获取 x 和 y
      let x = 0,
        y = 0
      if (transform) {
        const translateMatch = transform.match(
          /translate\(\s*([-+]?\d*\.?\d+)\s*,?\s*([-+]?\d*\.?\d+)?\s*\)/
        )
        if (translateMatch) {
          x = parseFloat(translateMatch[1])
          y = parseFloat(translateMatch[2]) // 如果 y 不存在，则默认为 0
        }
      }

      return { id, x, y }
    })
    return nodeData
  }

  static extractNodeInfo(inputString: string) {
    const regex = /(\w+)([\[\{\(])(.*?)([\]\}\)])/
    const simpleRegex = /(\w+)\s*/

    if (/^\w+$/.test(inputString)) {
      return {
        id: inputString,
        edgeLabel: '',
        nodeLabel: this.replaceBRWithNewline(inputString),
        shape: 'rect'
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
      const nodeLabel = match[3]
      let shape

      switch (match[2]) {
        case '[':
          shape = 'rect'
          break
        case '{':
          shape = 'ellipse'
          break
        case '(':
          shape = 'circle'
          break
        default:
          shape = 'rect'
      }

      return { id, nodeLabel: this.replaceBRWithNewline(nodeLabel), shape, edgeLabel }
    } else {
      const simpleMatch = inputString.match(simpleRegex)
      if (simpleMatch) {
        return {
          id: simpleMatch[1],
          edgeLabel,
          nodeLabel: this.replaceBRWithNewline(simpleMatch[1]),
          shape: 'rect'
        }
      }
    }

    return null

    // const match = inputString.match(/\|(.+?)\|\s*(\w+)(\[(.*?)\]|\((.*?)\))/)

    // const simpleMatch = inputString.match(/(\w+)\s*([\[\(])([^]*?)([\]\)])/)
  }

  static replaceBRWithNewline(inputString: string) {
    return inputString.replace(/<br\/?>/g, '\n')
  }
}
