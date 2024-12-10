import { type Graph } from '@antv/x6'

export const useExportFile = (graph: Graph | null) => {
  const exportJson = () => {
    if (!graph) return
    const nodes = graph?.getNodes()
    const edges = graph?.getEdges()
    const resJSON = {
      nodes: nodes?.map((item) => item.toJSON()),
      edges: edges?.map((item) => item.toJSON())
    }
    console.log({
      nodes: nodes?.map((item) => item.toJSON()),
      edges: edges?.map((item) => item.toJSON())
    })

    const jsonData = JSON.stringify(resJSON, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    BrowserUtils.downloadFile(url, 'index.json')
  }

  const exportPng = () => {
    if (!graph) return
    graph?.exportPNG('index', {
      width: 200,
      height: 200
    })
  }

  const exportSvg = () => {
    if (!graph) return

    graph?.exportSVG('index', {
      beforeSerialize: (svg) => {
        return svg
      },
      preserveDimensions: {
        width: 1000,
        height: 1000
      }
    })
  }

  return {
    exportJson,
    exportPng,
    exportSvg
  }
}
