import { Button } from 'antd'
import { memo } from 'react'

interface Props {
  exportJson?: () => void
}

const Header = (props: Props) => {
  const { exportJson } = props
  return (
    <div
      className={classNames(
        'h-10 w-full gap-2  border-b bg-white text-xs flex justify-start items-center px-2'
      )}
    >
      <Button
        type="default"
        className=""
        size="small"
      >
        文件
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
  )
}

export default memo(Header)
