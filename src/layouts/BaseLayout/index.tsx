import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <Layout rootClassName="!flex !flex-row w-screen h-screen overflow-auto overflow-x-hidden">
      <Outlet />
    </Layout>
  )
}
