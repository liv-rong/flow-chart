interface Props {
  exportType: string
}

const ExportFiles = (props: Props) => {
  const { exportType } = props
  return (
    <>
      {exportType === 'json' && (
        <>
          <div>JSON 文件下载后才可预览</div>
        </>
      )}
    </>
  )
}

export default ExportFiles
