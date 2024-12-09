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

  const [textSize, setTextSize] = useState<number>()

  const [textLineHeight, setTextLineHeight] = useState<number>()

  const [opacityValue, setOpacityValue] = useState<number>(1.0)

  const [widthValue, seTWidthValue] = useState<number | string>()

  const handleTextAlign = () => {
    if (!node || node.isEdge()) return
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
    if (!node || node.isEdge()) return
    const textAnchorValue = (node?.getAttrs()?.label?.textAnchor ?? 'middle') as TextAnchorType
    const textVerticalAnchorValue = (node?.getAttrs()?.label?.textVerticalAnchor ??
      'middle') as TextVerticalAnchorType
    setTextAnchorValue(textAnchorValue)
    setTextVerticalAnchorValue(textVerticalAnchorValue)

    const setOpacity = (node?.getAttrs()?.body?.opacity ?? 1) as number
    setOpacityValue(setOpacity * 100)

    const textSize = (node?.getAttrs().text.fontSize ?? 12) as number
    const textLineHeight = (node?.getAttrs().text.lineHeight ?? textSize) as number
    setTextSize(textSize)
    setTextLineHeight(textLineHeight / textSize)
  }, [node])

  return {
    textAnchorValue,
    textVerticalAnchorValue,
    handleTextAlign,
    setTextVerticalAnchorValue,
    setTextAnchorValue,
    textSize,
    setTextSize,
    textLineHeight,
    setTextLineHeight,
    opacityValue,
    setOpacityValue,
    widthValue,
    seTWidthValue
  }
}
