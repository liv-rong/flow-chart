import { Markdown } from '@/components'
import classNames from 'classnames'
import mermaid from 'mermaid'
import { useEffect, useState } from 'react'
import {MermaidDiagram} from '@/components/Mermaid/MermaidDiagram'

const Svg = () => {

  const svgString = `<svg width="400" height="180">
                      <rect id="node1" x="10" y="10" width="100" height="40" />
                      <circle id="node2" cx="200" cy="30" r="20" />
                    </svg>`

  const svgToAnt = (svg: string) => {
    // 使用 DOMParser 解析 SVG
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
    const elements = svgDoc.documentElement.childNodes

    // 转换为 X6 节点格式
    const x6Nodes = Array.from(elements)
      .map((node) => {
        // 确保 node 是一个 Element
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as SVGElement // 类型断言为 SVGElement

          const nodeData = {
            id: element.getAttribute('id'),
            x: parseFloat(element.getAttribute('x') || element.getAttribute('cx') || '0'),
            y: parseFloat(element.getAttribute('y') || element.getAttribute('cy') || '0'),
            width: parseFloat(
              element.getAttribute('width') || element.getAttribute('r')
                ? (parseFloat(element.getAttribute('r')!) * 2).toString()
                : '0'
            ),
            height: parseFloat(
              element.getAttribute('height') || element.getAttribute('r')
                ? (parseFloat(element.getAttribute('r')!) * 2).toString()
                : '0'
            ),
            label: element.tagName === 'rect' ? '矩形' : '圆形' // 根据元素类型设置标签
          }

          return nodeData
        }
        return null // 过滤非元素节点
      })
      .filter((node) => node !== null) // 过滤掉 null

    return x6Nodes
  }



  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
    })
   const res =   svgToAnt(svgString)

  },[])

  return (
    <>
      <MermaidDiagram
        children={`
          %%{init: { "fontSize": "48px", "theme": "dark" ,"background":"red", "fontFamily": "monospace",} }%%
          graph TD
          A[asdas] --> B[Load Balancer]
          B --> C[Server01]
          B --> D[Server02]
          Still --> 'asd'
          'asd' --> Still
      `}
        onClick={(e) => {
          console.log(e, 'click')
        }}
      ></MermaidDiagram>

    </>
  )
}

export default Svg


  // children: string
  // id?: string
  // testId?: string
  // className?: string
  // onClick?: (event: MouseEvent<HTMLElement>) => void
  // onError?: (error: any) => void
