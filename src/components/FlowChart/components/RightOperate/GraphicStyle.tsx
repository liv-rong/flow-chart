import Icon, {
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
import { Node } from '@antv/x6'
import { Button, ColorPicker, InputNumber, Radio, Select, Tooltip } from 'antd'
import { useSetAttrs } from '@/hooks'
import { borderOptions, fontFamilyOptions, lineHeightOptions } from '../../types'
import { rotateSvg, flipSvg } from '@/assets/svg'

interface Props {
  currentNode: Node<Node.Properties> | null
}

const GraphicStyle = (props: Props) => {
  const { currentNode } = props

  const {
    textAnchorValue,
    textVerticalAnchorValue,
    setTextVerticalAnchorValue,
    setTextAnchorValue,
    textSize,
    setTextSize,
    textLineHeight,
    setTextLineHeight,
    opacityValue,
    setOpacityValue,
    seTWidthValue
  } = useSetAttrs(currentNode)

  useEffect(() => {}, [currentNode])

  return (
    <div className="text-xs">
      {<> {currentNode?.id}</>}
      {currentNode?.isNode() && (
        <>
          <div className="border-b p-2 space-y-2">
            <div className="flex w-full h-6 bg-white justify-between items-center border"></div>
            <div className="flex w-full h-6 bg-white justify-between items-center">
              <p>不透明度</p>
              <div>
                <InputNumber<number>
                  min={0}
                  max={100}
                  changeOnWheel
                  defaultValue={100}
                  value={opacityValue}
                  size="small"
                  step={5}
                  onChange={(value) => {
                    const resOpacityValue = value ?? 100
                    setOpacityValue(resOpacityValue)
                    if (currentNode?.isNode()) {
                      currentNode?.attr('body/opacity', resOpacityValue / 100)
                      currentNode?.attr('text/opacity', resOpacityValue / 100)
                    }
                  }}
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
                size="small"
                className="w-20 h-6"
                suffix="w"
                type="number"
                step={1}
                value={currentNode?.getSize()?.width}
                onChange={(value) => {
                  seTWidthValue(value ?? 100)
                  currentNode?.setSize(value ?? 100, currentNode?.getSize()?.height)
                }}
              />

              <InputNumber<number>
                size="small"
                className="w-20 h-6"
                suffix="H"
                type="number"
                step={1}
                value={currentNode?.getSize()?.height}
                onChange={(value) => {
                  seTWidthValue(value ?? 100)
                  currentNode?.setSize(currentNode?.getSize()?.width, value ?? 100)
                }}
              />
            </div>
            <div className="flex w-full justify-between items-center  custom-input">
              <InputNumber<number>
                size="small"
                className="w-20 h-6"
                suffix="x"
                type="number"
                value={currentNode?.getPosition()?.x}
                onChange={(value) => {
                  seTWidthValue(value ?? 100)
                  const { x, y } = currentNode?.getPosition() ?? { x: 0, y: 0 }
                  currentNode?.setPosition(value ?? x, y)
                }}
              />

              <InputNumber<number>
                size="small"
                className="w-20 h-6"
                suffix="y"
                type="number"
                value={currentNode?.getPosition()?.y}
                onChange={(value) => {
                  seTWidthValue(value ?? 100)
                  const { x, y } = currentNode?.getPosition() ?? { x: 0, y: 0 }
                  currentNode?.setPosition(x, value ?? y)
                }}
              />
            </div>
            <div className="flex w-full justify-between items-center  custom-input">
              <InputNumber<number>
                min={0}
                max={360}
                defaultValue={0}
                value={currentNode?.getAngle()}
                suffix={<Icon component={rotateSvg} />}
                changeOnWheel
                size="small"
                onChange={(value) => {
                  seTWidthValue(value ?? 100)
                  currentNode?.rotate(value ?? 0, { absolute: true })
                }}
                className="w-20 h-6"
                formatter={(value) => `${value}°`}
                parser={(value) => value?.replace('°', '') as unknown as number}
              />
              <div className="space-x-2">
                <Tooltip title="垂直翻转">
                  <Button
                    size="small"
                    icon={<Icon component={flipSvg} />}
                    onClick={() => {
                      currentNode?.rotate(0, { absolute: true })
                    }}
                  />
                </Tooltip>

                <Tooltip title="水平翻转">
                  <Button
                    size="small"
                    icon={
                      <Icon
                        className="rotate-90"
                        component={flipSvg}
                      />
                    }
                    onClick={() => {
                      currentNode?.rotate(90, { absolute: true })
                    }}
                  />
                </Tooltip>
              </div>
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
                className="h-6 w-6 !border-0"
                onChange={(color) => {
                  seTWidthValue(color.toHexString())
                  currentNode?.attr('text/fill', color.toHexString())
                }}
                value={currentNode?.getAttrs()?.text?.fill as string}
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
                  currentNode?.attr({
                    text: {
                      fontSize: textSize ?? 12,
                      lineHeight: (textSize ?? 12) * (textLineHeight ?? 1)
                    }
                  })
                }}
              />
              <Select
                defaultValue={1}
                size="small"
                className="w-20 h-6"
                prefix={<LineHeightOutlined className="text-xs" />}
                onChange={(value) => {
                  setTextLineHeight(value)
                  currentNode?.attr({
                    text: {
                      fontSize: textSize ?? 12,
                      lineHeight: (textSize ?? 12) * value
                    }
                  })
                }}
                value={textLineHeight}
                options={lineHeightOptions}
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
                    seTWidthValue(value)
                  }}
                  type={
                    currentNode?.getAttrs()?.text?.fontWeight === 'bold' ? 'primary' : 'default'
                  }
                >
                  <BoldOutlined />
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    const value =
                      currentNode?.getAttrs()?.text?.fontStyle === 'italic' ? 'none' : 'italic'
                    currentNode?.attr('text/fontStyle', value)
                    seTWidthValue(value)
                  }}
                  type={
                    currentNode?.getAttrs()?.text?.fontStyle === 'italic' ? 'primary' : 'default'
                  }
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
                    seTWidthValue(value)
                  }}
                  type={
                    currentNode?.getAttrs()?.text?.textDecoration === 'underline'
                      ? 'primary'
                      : 'default'
                  }
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
                    seTWidthValue(value)
                  }}
                  type={
                    currentNode?.getAttrs()?.text?.textDecoration === 'line-through'
                      ? 'primary'
                      : 'default'
                  }
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
                className="h-6 w-6 !border-0"
                onChange={(color) => {
                  seTWidthValue(color.toHexString())
                  currentNode?.attr('body/fill', color.toHexString())
                }}
                value={currentNode?.getAttrs()?.body?.fill as string}
              />
            </div>
          </div>

          <div className="border-b  p-2 space-y-2">
            <p className="text-xs font-bold">线条</p>
            <div className="flex w-full justify-between items-center custom-input">
              <Select
                size="small"
                className="w-32 h-6"
                onChange={(value) => {
                  seTWidthValue(value)
                  currentNode?.attr('body/strokeDasharray', value)
                  console.log(currentNode?.getAttrs())
                }}
                value={(currentNode?.getAttrs()?.body?.strokeDasharray ?? '0') as string}
                options={borderOptions}
              />
              <ColorPicker
                defaultValue="#1677ff"
                className="h-6 w-6 !border-0"
                onChange={(color) => {
                  seTWidthValue(color.toHexString())
                  currentNode?.attr('body/stroke', color.toHexString())
                  console.log(currentNode?.getAttrs())
                }}
                value={currentNode?.getAttrs()?.body?.stroke as string}
              />
            </div>

            <div className="flex w-full justify-between items-center custom-input">
              <InputNumber<number>
                min={0}
                max={10}
                changeOnWheel
                defaultValue={10}
                value={currentNode?.getAttrs()?.body?.strokeWidth as number}
                size="small"
                onChange={(value) => {
                  const resStrokeWidthValue = value ?? 1
                  seTWidthValue(resStrokeWidthValue)
                  currentNode?.attr('body/strokeWidth', resStrokeWidthValue)
                }}
                className="w-20 h-6"
                formatter={(value) => `${value}px`}
                parser={(value) => value?.replace('px', '') as unknown as number}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GraphicStyle
