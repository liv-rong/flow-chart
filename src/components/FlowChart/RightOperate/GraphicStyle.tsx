import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  LineHeightOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { Node, type Graph } from '@antv/x6'
import { Button, ColorPicker, InputNumber, Radio, Select } from 'antd'
import { useSetAttrs } from '@/hooks'

// export const useSetAttrs = () => {
//   const onAttrsChanged = (attrs: State, node: Node<Node.Properties> | null) => {
//     node?.attr({
//       ref: attrs,
//       hLine: { refY: attrs.refY },
//       vLine: { refX: attrs.refX }
//     } as any)
//   }
//   return { onAttrsChanged }
// }

interface Props {
  currentNode: Node<Node.Properties> | null
  currentAttrs: any
  setCurrentAttrs: any
  setCurrentNode: any
  graph: Graph | null
}

const GraphicStyle = (props: Props) => {
  const { currentNode, graph, currentAttrs, setCurrentAttrs, setCurrentNode } = props
  console.log(currentAttrs, 'currentAttrs')

  const { onAttrsChanged } = useSetAttrs()

  // const onAttrsChanged = (attrs: State) => {
  //   this.node.attr({
  //     ref: attrs,
  //     hLine: { refY: attrs.refY },
  //     vLine: { refX: attrs.refX }
  //   } as any)
  // }

  const handleAlignmentChange = (value: string) => {
    // 更新节点文本位置

    console.log(value, 'value')

    onAttrsChanged(
      {
        refX: 0,
        refY: 0.5,
        xAlign: 'left',
        yAlign: 'middle'
      },
      currentNode
    )
  }

  // refX: 0.5,
  //   refY: 0.5,
  //   xAlign: 'left',
  //   yAlign: 'top',
  return (
    <div className="text-xs">
      <div className="border-b p-2 space-y-2">
        <div className="flex w-full h-6 bg-white justify-between items-center border"></div>
        <div className="flex w-full h-6 bg-white justify-between items-center">
          <p>不透明度</p>
          <div>
            <InputNumber<number>
              min={1}
              max={100}
              defaultValue={3}
              // value={currentAttrs}
              size="small"
              className="w-20 h-6"
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '') as unknown as number}
            />
          </div>
        </div>
      </div>

      <div className="border-b  p-2 space-y-2">
        <p className="text-xs font-bold">布局</p>
        <div className="flex w-full justify-between items-center custom-input">
          <InputNumber<number>
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="w"
            type="number"
            value={currentAttrs?.body?.refHeight}
          />

          <InputNumber<number>
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="H"
            type="number"
            value={currentAttrs?.body?.refHeight}
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber<number>
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="x"
            type="number"
            value={currentAttrs?.x}
            onChange={(value) => {
              setCurrentAttrs({ ...currentAttrs, x: value })
              currentNode?.setPosition(value!, currentAttrs.y!, {
                center: true // 取消 centering 选项，避免跳跃
              })
            }}
            // onBlur={() => {
            //   if (currentNode) {
            //     const newX = currentAttrs?.x // 使用最新的 x 值
            //     const newY = currentAttrs?.y // 使用 y 值
            //     currentNode.setPosition(newX!, newY!, {
            //       // center: true
            //     })
            //   }
            // }}
          />
          {currentAttrs?.x}

          <InputNumber<number>
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="y"
            type="number"
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber<number>
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            type="number"
          />
        </div>
      </div>

      <div className="border-b  p-2 space-y-2">
        <p className="text-xs font-bold">文本</p>
        <div className="flex w-full justify-between items-center custom-input">
          <Select
            defaultValue="lucy"
            style={{ width: 140 }}
            size="small"
            className="w-32 h-6"
            // onChange={handleChange}
            options={[
              { value: 'jack', label: '思源黑体' },
              { value: 'lucy', label: '微软雅黑' },
              { value: 'Yiminghe', label: '宋体' },
              { value: 'disabled', label: '楷体' }
            ]}
          />
          <ColorPicker
            defaultValue="#1677ff"
            value={currentAttrs?.text?.fill}
            className="h-6 w-6 !border-0"
            onChange={(color) => {
              setCurrentAttrs((pre: any) => ({
                ...pre,
                text: { ...pre.body, fill: color.toHexString() }
              }))

              currentNode?.updateAttrs({
                text: { ...currentNode?.getAttrs()?.text, fill: color.toHexString() }
              })
            }}
          />
        </div>

        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber<number>
            defaultValue={16}
            min={0}
            max={100}
            size="small"
            className="w-20 h-6"
            prefix={<FontSizeOutlined className="text-xs" />}
            formatter={(value) => `${value}px`}
            value={currentAttrs?.text?.fontSize as number}
            parser={(value) => value?.replace('px', '') as unknown as number}
            onChange={(value) => {
              console.log(value)

              setCurrentAttrs((pre: any) => ({
                ...pre,
                text: { ...pre.text, fontSize: value as number }
              }))
              currentNode?.updateAttrs({
                text: { ...currentNode?.getAttrs()?.text, fontSize: value as number },
                label: { ...currentNode?.getAttrs()?.label, fontSize: value as number }
              })
            }}
          />

          {currentNode?.getAttrs()?.text?.fontSize as number}

          <Select
            defaultValue="1.0"
            size="small"
            className="w-20 h-6"
            // onChange={handleChange}
            options={[
              { value: '1.0', label: '1.0' },
              { value: '1.25', label: '1.25' },
              { value: '1.5', label: '1.5' },
              { value: '2.0', label: '2.0' },
              { value: '2.5', label: '2.5' },
              { value: '3.0', label: '3.0' }
            ]}
            prefix={<LineHeightOutlined className="text-xs" />}
          />
        </div>

        <div className="flex w-full justify-between items-center  custom-input">
          <Radio.Group
            defaultValue="a"
            buttonStyle="outline"
            size="small"
            onChange={(value) => {
              console.log(value.target.value, '111212112121111')
              handleAlignmentChange(value.target.value)
            }}
          >
            <Radio.Button value="a">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="b">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="c">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>

          <Radio.Group
            defaultValue="a"
            buttonStyle="outline"
            size="small"
          >
            <Radio.Button value="a">
              <VerticalAlignTopOutlined />
            </Radio.Button>
            <Radio.Button value="b">
              <VerticalAlignMiddleOutlined />
            </Radio.Button>
            <Radio.Button value="c">
              <VerticalAlignBottomOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex w-full justify-between items-center  custom-input">
          <div>
            <Button size="small">
              <BoldOutlined />
            </Button>
            <Button size="small">
              <ItalicOutlined />
            </Button>
            <Button size="small">
              <UnderlineOutlined />
            </Button>
            <Button size="small">
              <StrikethroughOutlined />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b  p-2 space-y-2">
        <p className="text-xs font-bold">填充</p>
        <div className="flex w-full justify-between items-center custom-input">
          <ColorPicker
            defaultValue="#1677ff"
            value={currentAttrs?.body?.fill as string}
            className="h-6 w-6 !border-0"
            onChange={(color) => {
              setCurrentAttrs({
                ...currentAttrs,
                body: { ...currentAttrs?.body, fill: color.toHexString() }
              })
              currentNode?.updateAttrs({ body: { fill: color.toHexString() } })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GraphicStyle
