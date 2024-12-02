import { memo } from 'react'

const Header = () => {
  return (
    <div
      className={classNames(
        'h-10 w-full  border-b bg-white text-xs flex justify-start items-center px-2'
      )}
    >
      文件
    </div>
  )
}

export default memo(Header)
