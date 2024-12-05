import { memo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
  refCustom: React.MutableRefObject<HTMLDivElement | null>
}

const LeftOperate = (props: Props) => {
  const { children, refCustom } = props
  return (
    <div
      ref={refCustom}
      className={classNames('h-full relative w-[200px] bg-red-50 border-r border-gray-200')}
    >
      {children}
    </div>
  )
}

export default memo(LeftOperate)
