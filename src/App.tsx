import router from '@/router'
import { RouterProvider } from 'react-router'
import { HappyProvider } from '@ant-design/happy-work-theme'

function App() {
  return (
    <div className="w-screen h-screen">
      <HappyProvider>
        <RouterProvider router={router} />
      </HappyProvider>
    </div>
  )
}

export default App
