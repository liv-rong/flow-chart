import { memo } from 'react'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import PageStyle from './PageStyle'
import GraphicStyle from './GraphicStyle'

interface Props {
  className?: string
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '页面样式',
    children: <PageStyle />
  },
  {
    key: '2',
    label: '图形样式',
    children: <GraphicStyle />
  }
]

const RightOperate = (props: Props) => {
  const onChange = (key: string) => {
    console.log(key)
  }
  return (
    <div
      className={classNames(
        'h-full   w-[200px] flex justify-center items-start bg-white border-l border-gray-200'
      )}
    >
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
        onChange={onChange}
        className="w-full"
      />
    </div>
  )
}

export default memo(RightOperate)
