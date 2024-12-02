import { ColorPicker, Input, InputNumber, Select } from 'antd'

const GraphicStyle = () => {
  return (
    <div className="text-xs">
      <div className="border-b p-2 space-y-2">
        <div className="flex w-full h-6 bg-white justify-between items-center border"></div>
        <div className="flex w-full h-6 bg-white justify-between items-center">
          <p>不透明度</p>
          <div>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              size="small"
              className="w-20 h-6"
            />
          </div>
        </div>
      </div>

      <div className="border-b  p-2 space-y-2">
        <p className="text-xs font-bold">布局</p>
        <div className="flex w-full justify-between items-center custom-input">
          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="w"
            type="number"
          />

          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="H"
            type="number"
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="x"
            type="number"
          />

          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="y"
            type="number"
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber
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
            className="h-6 w-6 !border-0"
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            type="number"
            prefix="字"
          />

          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            suffix="y"
            type="number"
          />
        </div>
        <div className="flex w-full justify-between items-center  custom-input">
          <InputNumber
            defaultValue={3}
            size="small"
            className="w-20 h-6"
            type="number"
          />
        </div>
      </div>
    </div>
  )
}

export default GraphicStyle
