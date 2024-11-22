import { Markdown } from '@/components'
import classNames from 'classnames'
import mermaid from 'mermaid'
import { useEffect } from 'react'
import {MermaidDiagram} from '@/components/Mermaid/MermaidDiagram'

const Svg = () => {
  const content = `

        graph TD
          A[Client] --> B[Load Balancer]
          B --> C[Server01]
          B --> D[Server02]

  `

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
    })
  },[])

  return (
    <>
      {/* <pre className="mermaid">{content}</pre>
      <pre className="mermaid">
        {` graph TD
          A[Client] --> B[Load Balancer]
          B --> C[Server01]
          B --> D[Server02]`}
      </pre> */}
      <MermaidDiagram
        children={`
          %%{init: { "fontSize": "48px", "theme": "dark" ,"background":"red", "fontFamily": "monospace",} }%%
          graph TD
          A[Client] --> B[Load Balancer]
          B --> C[Server01]
          B --> D[Server02]
          Still --> Moving
          Moving --> Still
      `}
        onClick={(e) => {
          console.log(e, 'click')
        }}
      ></MermaidDiagram>
      {/* <div className={classNames('markdown-body')}>
        <Markdown content={content ?? '没有内容'} />
      </div> */}
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
