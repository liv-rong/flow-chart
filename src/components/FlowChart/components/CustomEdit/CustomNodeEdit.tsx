interface Props {
  width?: number
  height?: number
  x?: number
  y?: number
  value?: string
  setValue?: (value: string) => void
}

const CustomNodeEdit = (props: Props) => {
  const { value, setValue } = props
  const editableRef = useRef<HTMLDivElement | null>(null)

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    console.log('text', target.innerText)
    setValue?.(target.innerText)
  }

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = value ?? ''
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(editableRef.current)
      range.collapse(false)
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
