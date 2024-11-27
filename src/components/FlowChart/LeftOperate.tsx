import { memo, type ReactNode } from 'react'
// import classNames from 'classnames'

interface Props {
  children?: ReactNode
  className?: string
}

const leftOperate = (props: Props) => {
  const { children } = props
  return (
    <div className={classNames('h-full w-96 bg-red-50 border-r border-gray-200')}>
      leftOperate{children}{' '}
    </div>
  )
}

export default memo(leftOperate)
