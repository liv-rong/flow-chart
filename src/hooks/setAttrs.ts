import { Node } from '@antv/x6'
export interface State {
  refX: number
  refY: number
  xAlign?: string
  yAlign?: string
}

export const useSetAttrs = (
  node: Node<Node.Properties> | null,
  setCurrentAttrs: React.Dispatch<React.SetStateAction<{ [x: string]: any } | null>>
) => {
  const onAttrsChanged = (attrs: State) => {
    console.log('onAttrsChanged', node)
    node?.updateAttrs({
      ref: attrs,
      hLine: { refY: attrs.refY },
      vLine: { refX: attrs.refX }
    } as any)
  }

  const handleTextStyle = (textProps: { [key: string]: any }) => {
    console.log('handleTextStyle', textProps)
    // if (!textProps) return
    if (!textProps) return
    setCurrentAttrs((prev) => ({ ...prev, label: { ...prev?.label, ...textProps } }))
    // node?.updateAttrs({
    //   label: {
    //     ...,
    //     ...textProps
    //   }
    // })
    // node?.attr('label/fontStyle', textProps.fontStyle)
  }
  return { onAttrsChanged, handleTextStyle }
}
