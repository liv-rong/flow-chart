import { Node } from '@antv/x6'
export interface State {
  refX: number
  refY: number
  xAlign?: string
  yAlign?: string
}

export const useSetAttrs = () => {
  const onAttrsChanged = (attrs: State, node: Node<Node.Properties> | null) => {
    console.log('onAttrsChanged', node)
    node?.updateAttrs({
      ref: attrs,
      hLine: { refY: attrs.refY },
      vLine: { refX: attrs.refX }
    } as any)
    console.log('onAttrsChanged', node?.getAttrs())
  }
  return { onAttrsChanged }
}
