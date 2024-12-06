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
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight'
import { Console } from 'console'
import { fontFamilyOptions, lineHeightOptions } from '../../types'
import type { State } from '../settings'

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

// export interface Props {}

interface Props {
  currentNode: Node<Node.Properties> | null
  currentAttrs: any
  setCurrentAttrs: React.Dispatch<React.SetStateAction<{ [x: string]: any } | null>>
  setCurrentNode: any
  graph: Graph | null
  onChange?: (state: State) => void
}

const GraphicStyle = (props: Props) => {
  const { currentNode, graph, currentAttrs, setCurrentAttrs, setCurrentNode } = props

  const {
    textAnchorValue,
    textVerticalAnchorValue,
    setTextVerticalAnchorValue,
    setTextAnchorValue,
    textLineHeight,
    setTextLineHeight,
    textSize,
    setTextSize
  } = useSetAttrs(currentNode)

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
                center: true
              })
            }}
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
            defaultValue="Arial"
            style={{ width: 140 }}
            size="small"
            className="w-32 h-6"
            onChange={(value) => {
              currentNode?.attr('text/fontFamily', value)
              setCurrentAttrs((pre: any) => ({
                ...pre,
                text: { ...pre.text, fontFamily: value }
              }))
            }}
            value={
              (currentNode?.getAttrs()?.text?.fontFamily as string) ===
              'Arial, helvetica, sans-serif'
                ? 'Arial'
                : currentNode?.getAttrs()?.text?.fontFamily
            }
            options={fontFamilyOptions}
          />
          <ColorPicker
            defaultValue="#1677ff"
            value={currentAttrs?.text?.fill}
            className="h-6 w-6 !border-0"
            onChange={(color) => {
              setCurrentAttrs((pre: any) => ({
                ...pre,
                text: { ...pre.text, fill: color.toHexString() }
              }))
              currentNode?.attr('text/fill', color.toHexString())
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
            value={textSize as number}
            parser={(value) => value?.replace('px', '') as unknown as number}
            onChange={(value) => {
              setTextSize(value as number)
            }}
          />

          {currentNode?.getAttrs()?.text?.fontSize as number}

          <InputNumber<number>
            defaultValue={16}
            min={0}
            max={100}
            size="small"
            className="w-20 h-6"
            prefix={<LineHeightOutlined className="text-xs" />}
            formatter={(value) => `${value}px`}
            value={textLineHeight as number}
            // value={currentAttrs?.text?.lineHeight as number}
            parser={(value) => value?.replace('px', '') as unknown as number}
            onChange={(value) => {
              setTextLineHeight(value as number)
              // setCurrentAttrs((pre: any) => ({
              //   ...pre,
              //   text: { ...pre.text, lineHeight: value as number }
              // }))
              // currentNode?.attr('text/lineHeight', value as number)
              // setCurrentAttrs((pre: any) => ({
              //   ...pre,
              //   text: { ...pre.text, lineHeight: value as number }
              // }))
              // currentNode?.attr('text/lineHeight', value as number)
            }}
          />
        </div>

        <div className="flex w-full justify-between items-center  custom-input">
          <Radio.Group
            defaultValue="middle"
            buttonStyle="outline"
            size="small"
            value={textAnchorValue}
            onChange={(e) => {
              setTextAnchorValue(e.target.value)
            }}
          >
            <Radio.Button value="start">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="middle">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="end">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>

          <Radio.Group
            defaultValue="middle"
            buttonStyle="outline"
            size="small"
            value={textVerticalAnchorValue}
            onChange={(e) => {
              setTextVerticalAnchorValue(e.target.value)
            }}
          >
            <Radio.Button value="top">
              <VerticalAlignTopOutlined />
            </Radio.Button>
            <Radio.Button value="middle">
              <VerticalAlignMiddleOutlined />
            </Radio.Button>
            <Radio.Button value="bottom">
              <VerticalAlignBottomOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex w-full justify-between items-center  custom-input">
          <div className="gap-1 flex">
            <Button
              size="small"
              onClick={() => {
                const value =
                  currentNode?.getAttrs()?.text?.fontWeight === 'bold' ? 'normal' : 'bold'
                currentNode?.attr('text/fontWeight', value)
                setCurrentAttrs((prev) => ({
                  ...prev,
                  text: { ...prev?.text, fontWeight: value }
                }))
              }}
              type={currentAttrs?.text?.fontWeight === 'bold' ? 'primary' : 'default'}
            >
              <BoldOutlined />
            </Button>
            <Button
              size="small"
              onClick={() => {
                const value =
                  currentNode?.getAttrs()?.text?.fontStyle === 'italic' ? 'none' : 'italic'
                currentNode?.attr('text/fontStyle', value)
                setCurrentAttrs((prev) => ({
                  ...prev,
                  text: { ...prev?.text, fontStyle: value }
                }))
              }}
              type={currentAttrs?.text?.fontStyle === 'italic' ? 'primary' : 'default'}
            >
              <ItalicOutlined />
            </Button>
            <Button
              size="small"
              onClick={() => {
                const value =
                  currentNode?.getAttrs()?.text?.textDecoration === 'underline'
                    ? 'none'
                    : 'underline'
                currentNode?.attr('text/textDecoration', value)
                setCurrentAttrs((prev) => ({
                  ...prev,
                  text: { ...prev?.text, textDecoration: value }
                }))
              }}
              type={currentAttrs?.text?.textDecoration === 'underline' ? 'primary' : 'default'}
            >
              <UnderlineOutlined />
            </Button>
            <Button
              size="small"
              onClick={() => {
                const value =
                  currentNode?.getAttrs()?.text?.textDecoration === 'line-through'
                    ? 'none'
                    : 'line-through'
                currentNode?.attr('text/textDecoration', value)
                setCurrentAttrs((prev) => ({
                  ...prev,
                  text: { ...prev?.text, textDecoration: value }
                }))
              }}
              type={currentAttrs?.text?.textDecoration === 'line-through' ? 'primary' : 'default'}
            >
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
              currentNode?.attr('body/fill', color.toHexString())
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GraphicStyle
