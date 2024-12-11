import { Node, type Edge } from '@antv/x6'
import { GridLayout } from '@antv/layout'

export interface StateTextAlign {
  refX: number
  refY: number
  textAnchor?: string
  textVerticalAnchor?: string
}

export type TextAnchorType = 'start' | 'middle' | 'end'
export type TextVerticalAnchorType = 'top' | 'middle' | 'bottom'

export const useSetAttrs = (node: (Edge<Edge.Properties> | Node<Node.Properties>)[]) => {
  const [textAnchorValue, setTextAnchorValue] = useState<TextAnchorType>('middle')

  const [textVerticalAnchorValue, setTextVerticalAnchorValue] =
    useState<TextVerticalAnchorType>('middle')

  const [textSize, setTextSize] = useState<number>()

  const [textLineHeight, setTextLineHeight] = useState<number>()

  const [opacityValue, setOpacityValue] = useState<number>(1.0)

  const [widthValue, seTWidthValue] = useState<number | string>()

  const handleTextAlign = () => {
    if (!node.length) return
    if (!node[0].isNode()) return

    const handleOneTextAlign = (node: Edge<Edge.Properties> | Node<Node.Properties>) => {
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

    node.forEach((item) => {
      if (item.isNode()) {
        handleOneTextAlign(item)
      }
    })
  }

  const handleOpacity = (resOpacityValue: number) => {
    if (!node.length) return
    setOpacityValue(resOpacityValue)
    node.forEach((item) => {
      if (item.isNode()) {
        item?.attr('body/opacity', resOpacityValue / 100)
        item?.attr('text/opacity', resOpacityValue / 100)
      }
    })
  }

  const handleSize = (type: string, value: number) => {
    if (!node.length) return
    seTWidthValue(value)

    node.forEach((item) => {
      if (item.isNode()) {
        const { x: itemX, y: itemY } = item.getPosition() ?? { x: 0, y: 0 }
        const { width, height } = item.getSize() ?? { width: 100, height: 100 }

        switch (type) {
          case 'width':
            item.setSize(value ?? 100, height)
            break
          case 'height':
            item.setSize(width, value ?? 100)
            break
          case 'x':
            item.setPosition(value, itemY)
            break
          case 'y':
            item.setPosition(itemX, value)
            break
          case 'rotate':
            item.rotate(value ?? 0, { absolute: true })
            break
        }
      }
    })
  }

  const handleTextStyle = (type: string, value?: string | number) => {
    if (!node.length) return
    seTWidthValue(value)

    node.forEach((item) => {
      if (item.isNode()) {
        switch (type) {
          case 'fontFamily':
            item?.attr('text/fontFamily', value ?? 'Arial, helvetica, sans-serif')
            break
          case 'text/fill':
            item?.attr('text/fill', value ?? '#000000')
            break
          case 'fontWeight': {
            const valueFontWeight =
              item?.getAttrs()?.text?.fontWeight === 'bold' ? 'normal' : 'bold'
            item?.attr('text/fontWeight', valueFontWeight)
            break
          }
          case 'fontStyle': {
            const value = item?.getAttrs()?.text?.fontStyle === 'italic' ? 'none' : 'italic'
            item?.attr('text/fontStyle', value)
            break
          }
          case 'underline': {
            const value =
              item?.getAttrs()?.text?.textDecoration === 'underline' ? 'none' : 'underline'
            item?.attr('text/textDecoration', value)
            break
          }
          case 'line-through': {
            const value =
              item?.getAttrs()?.text?.textDecoration === 'line-through' ? 'none' : 'line-through'
            item?.attr('text/textDecoration', value)
            break
          }
          case 'body/fill':
            item?.attr('body/fill', value ?? '#000000')
            break
          case 'body/strokeDasharray':
            item?.attr('body/strokeDasharray', value ?? '0')
            break
          case 'body/stroke':
            item?.attr('body/stroke', value ?? '#ffffff')
            break
          case 'body/strokeWidth':
            item?.attr('body/strokeWidth', Number(value))
            break
          case 'text/fontSize':
            setTextSize(Number(value))
            item?.attr({
              text: {
                fontSize: textSize ?? 12,
                lineHeight: (textSize ?? 12) * (textLineHeight ?? 1)
              }
            })
            break

          case 'text/lineHeight':
            setTextLineHeight(Number(value))
            item?.attr({
              text: {
                fontSize: textSize ?? 12,
                lineHeight: (textSize ?? 12) * Number(value)
              }
            })
            break
        }
      }

      if (item.isEdge()) {
        switch (type) {
          case 'text/fill':
            break
        }
      }
    })
  }

  const isNodeCustom = () => node[0]?.isNode()

  const isEdgeCustom = () => node[0]?.isEdge()

  const handleAttrsInit = () => {
    if (!node.length) return
    if (!node[0].isNode()) return
    const textAnchorValue = (node[0]?.getAttrs()?.label?.textAnchor ?? 'middle') as TextAnchorType
    const textVerticalAnchorValue = (node[0]?.getAttrs()?.label?.textVerticalAnchor ??
      'middle') as TextVerticalAnchorType
    setTextAnchorValue(textAnchorValue)
    setTextVerticalAnchorValue(textVerticalAnchorValue)
    const setOpacity = (node[0]?.getAttrs()?.body?.opacity ?? 1) as number
    setOpacityValue(setOpacity * 100)
    const textSize = (node[0]?.getAttrs().text.fontSize ?? 12) as number
    const textLineHeight = (node[0]?.getAttrs().text.lineHeight ?? textSize) as number
    setTextSize(textSize)
    setTextLineHeight(textLineHeight / textSize)
  }

  const handleAlign = (alignment: string) => {
    if (!node.length) return

    const selectedCells = node

    if (selectedCells.length === 0) return

    // 获取选中节点的边界框
    const bbox = selectedCells.reduce(
      (acc, cell) => {
        const cellBBox = cell.getBBox()
        acc.x = Math.min(acc.x, cellBBox.x)
        acc.y = Math.min(acc.y, cellBBox.y)
        acc.width = Math.max(acc.width, cellBBox.x + cellBBox.width) // 计算最大宽度
        acc.height = Math.max(acc.height, cellBBox.y + cellBBox.height) // 计算最大高度
        return acc
      },
      { x: Infinity, y: Infinity, width: 0, height: 0 }
    )

    selectedCells.forEach((cell) => {
      if (!cell.isNode()) return
      const currentPosition = cell.getPosition()
      let targetX = currentPosition.x
      let targetY = currentPosition.y

      switch (alignment) {
        case 'AlignHorizontalLeft':
          targetX = bbox.x // 左对齐
          break
        case 'AlignHorizontalRight':
          targetX = bbox.x + bbox.width - cell.getSize().width // 右对齐
          break
        case 'AlignHorizontalCenter':
          targetX = bbox.x + (bbox.width - cell.getSize().width) / 2 // 居中对齐
          break
        case 'AlignVerticalTop':
          targetY = bbox.y // 顶端对齐
          break
        case 'AlignVerticalBottom':
          targetY = bbox.y + bbox.height - cell.getSize().height // 底端对齐
          break
        case 'AlignVerticalCenter':
          targetY = bbox.y + (bbox.height - cell.getSize().height) / 2 // 垂直居中对齐

          break
        default:
          break
      }

      // 设置新的位置
      cell.setPosition(targetX, targetY)
    })
  }

  useEffect(() => {
    handleAttrsInit()
  }, [node])

  useEffect(() => {
    handleTextAlign()
  }, [textAnchorValue, textVerticalAnchorValue])

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
    seTWidthValue,
    handleOpacity,
    handleSize,
    handleTextStyle,
    isEdgeCustom,
    isNodeCustom,
    handleAlign
  }
}
