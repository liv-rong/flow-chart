import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import Root from '@/Root'
import BaseLayout from '@/layouts/BaseLayout'
import { lazy } from 'react'

const Home = lazy(() => import('@/pages/home'))

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: BaseLayout,
        children: [
          {
            index: true,
            element: <Home />
          }
        ]
      }
    ]
  }
]

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes)

export default router
