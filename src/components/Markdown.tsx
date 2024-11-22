import { useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierHeathLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

const capitalizationLanguageNameMap: Record<string, string> = {
  sql: 'SQL',
  javascript: 'JavaScript',
  java: 'Java',
  typescript: 'TypeScript',
  vbscript: 'VBScript',
  css: 'CSS',
  html: 'HTML',
  xml: 'XML',
  php: 'PHP',
  python: 'Python',
  yaml: 'Yaml',
  mermaid: 'Mermaid',
  markdown: 'MarkDown',
  makefile: 'MakeFile',
}

const getCorrectCapitalizationLanguageName = (language: string) => {
  if (!language) return 'Plain'

  if (language in capitalizationLanguageNameMap)
    return capitalizationLanguageNameMap[language]

  return language.charAt(0).toUpperCase() + language.substring(1)
}

const Markdown = ({ content }: { content: string }) => {
  const ref = useRef<SyntaxHighlighter>(null)
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        code({ className, children, ...props }) {
          console.log('className', className, children, props)
          const match = /language-(\w+)/.exec(className || '')
          const language = match?.[1]
          const languageShowName = getCorrectCapitalizationLanguageName(language ?? '' )
          return match ? (
            <>
              <div
                className="flex justify-between h-8 items-center p-1 pl-3 border-b"
                style={{
                  borderColor: 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-[13px] text-gray-500 font-normal">{languageShowName}</div>
              </div>
              <SyntaxHighlighter
                {...props}
                style={atelierHeathLight}
                customStyle={{
                  paddingLeft: 12,
                  backgroundColor: '#fff'
                }}
                showLineNumbers
                PreTag="div"
                ref={ref as React.LegacyRef<SyntaxHighlighter>}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </>
          ) : (
            <code
              {...props}
              className={className}
            >
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown
