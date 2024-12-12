import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import PageStyle from './PageStyle'
import GraphicStyle from './GraphicStyle'
import type { Edge, Node } from '@antv/x6'

interface Props {
  className?: string
  currentNode: (Edge<Edge.Properties> | Node<Node.Properties>)[]
}

const RightOperate = (props: Props) => {
  const { className, currentNode } = props

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '页面样式',
      children: <PageStyle />
    },
    {
      key: '2',
      label: '图形样式',
      children: <GraphicStyle currentNode={currentNode} />
    }
  ]

  return (
    <div
      className={classNames(
        'h-full   w-[200px] flex justify-center items-start bg-white border-l border-gray-200'
      )}
    >
      <Tabs
        defaultActiveKey="2"
        centered
        items={items}
        className="w-full"
      />
    </div>
  )
}

export default memo(RightOperate)
