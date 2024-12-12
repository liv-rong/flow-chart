import { Button, Dropdown, Modal } from 'antd'
import { memo } from 'react'
import type { MenuProps } from 'antd'

interface Props {
  exportJson: () => void
  exportSvg: () => void
  exportPng: () => void
}

const Header = (props: Props) => {
  const { exportJson, exportPng, exportSvg } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [exportType, setExportType] = useState('png')

  const items: MenuProps['items'] = [
    {
      label: '保存',
      key: '0'
    },
    {
      label: '另存为',
      key: '1',
      children: [
        {
          key: '1-1',
          label: 'png',
          onClick: () => {
            setIsModalOpen(true)
            setExportType('png')
          }
        },
        {
          key: '1-2',
          label: 'svg',
          onClick: () => {
            setIsModalOpen(true)
            setExportType('svg')
          }
        },
        {
          key: '1-3',
          label: 'json',
          onClick: () => {
            setIsModalOpen(true)
            setExportType('json')
          }
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      label: '导入',
      key: 'jsonImport',
      children: [
        {
          label: '导入json',
          key: 'jsonImport'
        },
        {
          label: '导入svg',
          key: 'svgImport'
        },
        {
          label: '导入mermaid',
          key: 'mermaidImport'
        }
      ]
    }
  ]

  return (
    <div
      className={classNames(
        'h-10 w-full gap-2  border-b bg-white text-xs flex justify-between items-center px-2'
      )}
    >
      <div className="flex justify-center items-center gap-2">
        <Dropdown
          menu={{ items }}
          trigger={['click']}
        >
          <Button
            type="text"
            className=""
            size="small"
          >
            文件
          </Button>
        </Dropdown>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button
          type="default"
          className=""
          size="small"
        >
          导出
        </Button>
        <Button
          type="default"
          className=""
          onClick={exportJson}
          size="small"
        >
          导出json
        </Button>
      </div>

      <Modal
        title={`导出${exportType}`}
        open={isModalOpen}
        onOk={() => {
          if (exportType === 'json') {
            exportJson()
          }
          if (exportType === 'svg') {
            exportSvg()
          }
          if (exportType === 'png') {
            exportPng()
          }
          setIsModalOpen(false)
        }}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        {/* <Export exportType={exportType} /> */}
      </Modal>
    </div>
  )
}

export default memo(Header)
