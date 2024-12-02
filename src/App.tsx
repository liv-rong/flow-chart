import router from '@/router'
import { RouterProvider } from 'react-router'

function App() {
  return (
    <div className="w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
