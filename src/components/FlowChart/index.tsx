import { Graph, type Model, Shape } from '@antv/x6'
import Footer from './Footer'
import Header from './Header'
import LeftOperate from './LeftOperate'
import RightOperate from './RightOperate'

const commands = [
  {
    key: 'zoomIn',
    label: 'ZoomIn(0.2)'
  },
  {
    key: 'zoomOut',
    label: 'ZoomOut(-0.2)'
  },
  {
    key: 'zoomTo',
    label: 'ZoomTo(1)'
  },
  {
    key: 'zoomToFit',
    label: 'ZoomToFit'
  },
  {
    key: 'centerContent',
    label: 'CenterContent'
  }
]
interface Props {
  data?: Model.FromJSONData
}

function FlowChart({ data }: Props) {
  const {
    initGraph,
    handleZoom,
    refContainer,
    currentNode,
    currentAttrs,
    setCurrentAttrs,
    setCurrentNode,
    refStencil,
    graph
  } = useFlowChart(data as Model.FromJSONData)
  console.log(data)

  useEffect(() => {
    initGraph()
    return () => {
      graph?.dispose()
    }
  }, [])

  return (
    <div className="w-full h-screen bg-green-50">
      <Header />
      <div className="h-[calc(100%-72px)] w-full flex">
        <LeftOperate refCustom={refStencil}></LeftOperate>
        <div className="w-full h-full bg-gray-50 flex-1 overflow-auto flex justify-center items-center">
          <div className="flex flex-col h-full w-full">
            <div
              id="container"
              ref={refContainer}
              className="w-full h-full"
            ></div>
          </div>
        </div>
        <RightOperate
          currentNode={currentNode}
          currentAttrs={currentAttrs}
          setCurrentAttrs={setCurrentAttrs}
          setCurrentNode={setCurrentNode}
        />
      </div>
      <Footer />
    </div>
  )
}

export default memo(FlowChart)
