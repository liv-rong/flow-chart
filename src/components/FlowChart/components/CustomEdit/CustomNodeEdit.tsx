interface Props {
  width?: number
  height?: number
  x?: number
  y?: number
  value?: string
  setValue?: (value: string) => void
}

const CustomNodeEdit = (props: Props) => {
  const { width = 100, height = 50, x = 0, y = 0, value, setValue } = props
  const editableRef = useRef<HTMLDivElement | null>(null)

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    console.log('text', target.innerText)
    setValue?.(target.innerText) // 使用 innerText 获取文本内容
  }

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = value ?? '' // 设置初始值

      // 设置光标在文本末尾
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(editableRef.current)
      range.collapse(false) // collapse(false) 将光标移动到内容末尾
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [value])

  return (
    <div
      contentEditable
      ref={editableRef}
      onInput={handleInput}
      className={classNames(
        'border-2   border-red-400  h-fit focus:outline-none transition-all duration-200  max-w-[200px] absolute top-20 right-[300px]'
      )}
    ></div>
  )
}

export default CustomNodeEdit
