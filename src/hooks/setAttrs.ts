import { Node } from '@antv/x6'

export interface StateTextAlign {
  refX: number
  refY: number
  textAnchor?: string
  textVerticalAnchor?: string
}

export type TextAnchorType = 'start' | 'middle' | 'end'
export type TextVerticalAnchorType = 'top' | 'middle' | 'bottom'

export const useSetAttrs = (node: Node<Node.Properties> | null) => {
  const [textAnchorValue, setTextAnchorValue] = useState<TextAnchorType>('middle')

  const [textVerticalAnchorValue, setTextVerticalAnchorValue] =
    useState<TextVerticalAnchorType>('middle')

  const [textSize, setTextSize] = useState<number>(node?.attr('text/textSize') || 12)

  const [textLineHeight, setTextLineHeight] = useState<number>(node?.attr('text/lineHeight') || 12)

  const handleTextAlign = () => {
    const resTextAlign: StateTextAlign = {
      textAnchor: textAnchorValue,
      textVerticalAnchor: textVerticalAnchorValue,
      refX: 0.5,
      refY: 0.5
    }
    if (textAnchorValue === 'middle') {
      if (textVerticalAnchorValue === 'top') {
        resTextAlign.refX = 0.5
        resTextAlign.refY = 0
      }
      if (textVerticalAnchorValue === 'middle') {
        resTextAlign.refX = 0.5
        resTextAlign.refY = 0.5
      }
      if (textVerticalAnchorValue === 'bottom') {
        resTextAlign.refX = 0.5
        resTextAlign.refY = 0.99
      }
    }

    if (textAnchorValue === 'start') {
      if (textVerticalAnchorValue === 'top') {
        resTextAlign.refX = 0
        resTextAlign.refY = 0
      }
      if (textVerticalAnchorValue === 'middle') {
        resTextAlign.refX = 0
        resTextAlign.refY = 0.5
      }
      if (textVerticalAnchorValue === 'bottom') {
        resTextAlign.refX = 0
        resTextAlign.refY = 0.99
      }
    }

    if (textAnchorValue === 'end') {
      if (textVerticalAnchorValue === 'top') {
        resTextAlign.refX = 0.99
        resTextAlign.refY = 0
      }

      if (textVerticalAnchorValue === 'middle') {
        resTextAlign.refX = 0.99
        resTextAlign.refY = 0.5
      }

      if (textVerticalAnchorValue === 'bottom') {
        resTextAlign.refX = 0.99
        resTextAlign.refY = 0.99
      }
    }

    console.log('resTextAlign', resTextAlign)
    node?.attr({
      label: resTextAlign,
      hLine: { refY: resTextAlign.refY },
      vLine: { refX: resTextAlign.refX }
    } as any)
  }

  useEffect(() => {
    handleTextAlign()
  }, [textAnchorValue, textVerticalAnchorValue])

  useEffect(() => {
    console.log(node?.getAttrs().text)
    if (node) {
      node.attr({
        text: {
          // lineHeight: textLineHeight,
          fontSize: textSize
        }
      })
      handleTextAlign()
    }
  }, [textSize])

  // useEffect(() => {
  //   if (node) {
  //     node.attr({
  //       label: {
  //         fontSize: textSize
  //       }
  //     })
  //     handleTextAlign()
  //   }
  // }, [textSize])

  return {
    textAnchorValue,
    textVerticalAnchorValue,
    handleTextAlign,
    setTextVerticalAnchorValue,
    setTextAnchorValue,
    textLineHeight,
    setTextLineHeight,
    textSize,
    setTextSize
  }
}
