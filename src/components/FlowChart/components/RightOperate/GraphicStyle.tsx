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
import { Node, type Edge } from '@antv/x6'
import { Button, ColorPicker, InputNumber, Radio, Select, Tooltip } from 'antd'
import { useSetAttrs } from '@/hooks'
import { borderOptions, fontFamilyOptions, lineHeightOptions } from '../../types'
import {
  RotateSvg,
  FlipSvg,
  AlignHorizontalCenter,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  AlignVerticalBottom,
  AlignVerticalCenter,
  AlignVerticalTop
} from '@/assets/svg'

interface Props {
  currentNode: (Edge<Edge.Properties> | Node<Node.Properties>)[]
}

const GraphicStyle = (props: Props) => {
  const { currentNode } = props
  console.log(currentNode, 'currentNode')

  const {
    textAnchorValue,
    textVerticalAnchorValue,
    setTextVerticalAnchorValue,
    setTextAnchorValue,
    textSize,
    textLineHeight,
    opacityValue,
    handleSize,
    handleOpacity,
    handleTextStyle,
    isNodeCustom,
    handleAlign
  } = useSetAttrs(currentNode)

  useEffect(() => {}, [currentNode])

  const alignData = [
    {
      icon: AlignHorizontalLeft,
      value: 'AlignHorizontalLeft',
      label: '左对齐'
    },
    {
      icon: AlignHorizontalCenter,
      value: 'AlignHorizontalCenter',
      label: '居中对齐'
    },

    {
      icon: AlignHorizontalRight,
      value: 'AlignHorizontalRight',
      label: '右对齐'
    },
    {
      icon: AlignVerticalTop,
      value: 'AlignVerticalTop',
      label: '顶端对齐'
    },
    {
      icon: AlignVerticalCenter,
      value: 'AlignVerticalCenter',
      label: '垂直居中对齐'
    },
    {
      icon: AlignVerticalBottom,
      value: 'AlignVerticalBottom',
      label: '底端对齐'
    }
  ]

  return (
    <div className="text-xs">
      <>
        <div className="border-b p-2 bg-red-50 space-y-2">
          <div className="flex w-full h-6 bg-white justify-between items-center border px-2">
            {alignData.map((item, index) => (
              <>
                <Tooltip
                  title={item.label}
                  key={index}
                >
                  <Icon
                    component={item.icon}
                    className="text-lg font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAlign(item.value)}
                  />
                </Tooltip>
              </>
            ))}
          </div>
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
                  handleOpacity(resOpacityValue)
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
              value={
                currentNode.length
                  ? currentNode[0]?.isNode()
                    ? currentNode[0]?.getSize()?.width
                    : 0
                  : 0
              }
              disabled={isNodeCustom() ? false : true}
              onChange={(value) => handleSize('width', value ?? 100)}
            />

            <InputNumber<number>
              size="small"
              className="w-20 h-6"
              suffix="H"
              type="number"
              step={1}
              value={
                currentNode.length
                  ? currentNode[0]?.isNode()
                    ? currentNode[0]?.getSize()?.height
                    : 0
                  : 0
              }
              disabled={isNodeCustom() ? false : true}
              onChange={(value) => handleSize('height', value ?? 100)}
            />
          </div>
          <div className="flex w-full justify-between items-center  custom-input">
            <InputNumber<number>
              size="small"
              className="w-20 h-6"
              suffix="x"
              type="number"
              value={
                currentNode.length
                  ? currentNode[0]?.isNode()
                    ? currentNode[0]?.getPosition()?.x
                    : 0
                  : 0
              }
              disabled={isNodeCustom() ? false : true}
              onChange={(value) => handleSize('x', value ?? 100)}
            />

            <InputNumber<number>
              size="small"
              className="w-20 h-6"
              suffix="y"
              type="number"
              value={
                currentNode.length
                  ? currentNode[0]?.isNode()
                    ? currentNode[0]?.getPosition()?.y
                    : 0
                  : 0
              }
              disabled={isNodeCustom() ? false : true}
              onChange={(value) => handleSize('y', value ?? 100)}
            />
          </div>
          <div className="flex w-full justify-between items-center  custom-input">
            <InputNumber<number>
              min={0}
              max={360}
              defaultValue={0}
              value={
                currentNode.length ? (currentNode[0]?.isNode() ? currentNode[0]?.getAngle() : 0) : 0
              }
              disabled={isNodeCustom() ? false : true}
              suffix={<Icon component={RotateSvg} />}
              changeOnWheel
              size="small"
              onChange={(value) => handleSize('rotate', value ?? 100)}
              className="w-20 h-6"
              formatter={(value) => `${value}°`}
              parser={(value) => value?.replace('°', '') as unknown as number}
            />
            <div className="space-x-2">
              <Tooltip title="垂直翻转">
                <Button
                  size="small"
                  icon={<Icon component={FlipSvg} />}
                  onClick={() => handleSize('rotate', 0)}
                  disabled={isNodeCustom() ? false : true}
                />
              </Tooltip>

              <Tooltip title="水平翻转">
                <Button
                  size="small"
                  icon={
                    <Icon
                      className="rotate-90"
                      component={FlipSvg}
                    />
                  }
                  disabled={isNodeCustom() ? false : true}
                  onClick={() => handleSize('rotate', 90)}
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
              onChange={(value) => handleTextStyle('text/fontFamily', value as string)}
              value={
                (currentNode[0]?.getAttrs()?.text?.fontFamily as string) ===
                'Arial, helvetica, sans-serif'
                  ? 'Arial'
                  : currentNode[0]?.getAttrs()?.text?.fontFamily
              }
              disabled={isNodeCustom() ? false : true}
              options={fontFamilyOptions}
            />
            <ColorPicker
              defaultValue="#1677ff"
              className="h-6 w-6 !border-0"
              onChange={(color) => handleTextStyle('text/fill', color.toHexString())}
              value={currentNode[0]?.getAttrs()?.text?.fill as string}
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
              onChange={(value) => handleTextStyle('text/fontSize', value as number)}
            />
            <Select
              defaultValue={1}
              size="small"
              className="w-20 h-6"
              prefix={<LineHeightOutlined className="text-xs" />}
              onChange={(value) => handleTextStyle('text/lineHeight', value as number)}
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
                onClick={() => handleTextStyle('fontWeight')}
                type={
                  currentNode[0]?.getAttrs()?.text?.fontWeight === 'bold' ? 'primary' : 'default'
                }
              >
                <BoldOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => handleTextStyle('fontStyle')}
                type={
                  currentNode[0]?.getAttrs()?.text?.fontStyle === 'italic' ? 'primary' : 'default'
                }
              >
                <ItalicOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => handleTextStyle('underline')}
                type={
                  currentNode[0]?.getAttrs()?.text?.textDecoration === 'underline'
                    ? 'primary'
                    : 'default'
                }
              >
                <UnderlineOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => handleTextStyle('line-through')}
                type={
                  currentNode[0]?.getAttrs()?.text?.textDecoration === 'line-through'
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
              onChange={(value) => handleTextStyle('body/fill', value.toHexString())}
              value={currentNode[0]?.getAttrs()?.body?.fill as string}
            />
          </div>
        </div>

        <div className="border-b  p-2 space-y-2">
          <p className="text-xs font-bold">线条</p>
          <div className="flex w-full justify-between items-center custom-input">
            <Select
              size="small"
              className="w-32 h-6"
              onChange={(value) => handleTextStyle('body/strokeDasharray', value)}
              value={(currentNode[0]?.getAttrs()?.body?.strokeDasharray ?? '0') as string}
              options={borderOptions}
            />
            <ColorPicker
              defaultValue="#1677ff"
              className="h-6 w-6 !border-0"
              onChange={(color) => handleTextStyle('body/stroke', color.toHexString())}
              value={currentNode[0]?.getAttrs()?.body?.stroke as string}
            />
          </div>

          <div className="flex w-full justify-between items-center custom-input">
            <InputNumber<number>
              min={0}
              max={10}
              changeOnWheel
              defaultValue={10}
              value={currentNode[0]?.getAttrs()?.body?.strokeWidth as number}
              size="small"
              onChange={(value) => handleTextStyle('body/strokeWidth', value ?? 1)}
              className="w-20 h-6"
              formatter={(value) => `${value}px`}
              parser={(value) => value?.replace('px', '') as unknown as number}
            />
          </div>
        </div>
      </>
    </div>
  )
}

export default GraphicStyle
