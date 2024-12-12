import { memo } from 'react'

const Footer = () => {
  return (
    <div
      className={classNames(
        'h-8 w-full border-t bg-white flex justify-center items-center text-xs'
      )}
    ></div>
  )
}

export default memo(Footer)
