import nprogress from 'nprogress'
import { Outlet, useLocation, useNavigation } from 'react-router-dom'
import { useEffect } from 'react'

nprogress.configure({ showSpinner: false })

/**
 * 生成页面标题
 * @description
 * - 如果传参，结果为 `当前页面标题 | 应用名称`
 * - 默认为 `应用名称`
 */
const getDocumentTitle = (title?: string) => (title ? `${title} ` : 'flow-chart')

export default function Root() {
  const navigation = useNavigation()
  const location = useLocation()

  // 监听路由变化，显示进度条
  useEffect(() => {
    console.log(navigation.state)
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.done()
    }
  }, [navigation.state])

  useEffect(() => {
    document.title = getDocumentTitle('flow-chart')
  }, [location.pathname])

  return <Outlet />
}
