import { memo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const leftOperate = (props: Props) => {
  const { children } = props
  return (
    <div className="h-full w-96 bg-red-50 border-r border-gray-200">leftOperate{children} </div>
  )
}

export default memo(leftOperate)
