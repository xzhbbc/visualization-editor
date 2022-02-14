import Search from '../components/search'
import Tips from '../components/tips'

export type WidgetConfig = {
  type: string
  component: React.MemoExoticComponent<() => JSX.Element>
  config: any
  name: string
}

export type WidgetData = {
  type: string
  component: React.MemoExoticComponent<() => JSX.Element>
  config: any
  name: string
  id: string
  height?: number
}

const TipsConfig: WidgetConfig = {
  type: 'tips',
  component: Tips,
  config: {},
  name: '这是一个提示组件'
}

const SearchConfig: WidgetConfig = {
  type: 'search',
  component: Search,
  config: {},
  name: '这是一个搜索组件'
}

export const widgetConfigList = [TipsConfig, SearchConfig]
