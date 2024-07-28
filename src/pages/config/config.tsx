import { Badge, Button, SearchBar, TabBar } from 'antd-mobile'
import EmptyView from '../components/emptyView'
import Search from '../components/search'
import Tips from '../components/tips'
import btnIcon from '../../assest/img/btn_icon.png'

const { Item } = TabBar
export type WidgetConfig = {
  type: string
  component:
    | React.MemoExoticComponent<() => JSX.Element>
    | React.ForwardRefExoticComponent<any>
    | any
  config: any
  name: string
  icon?: string
}

export type WidgetData = {
  type: string
  component:
    | React.MemoExoticComponent<() => JSX.Element>
    | React.ForwardRefExoticComponent<any>
  config: any
  name: string
  id: string
  height?: number
}

export const EmptyConfig: WidgetConfig = {
  type: 'empty',
  component: EmptyView,
  config: {},
  name: '空占位'
}

const TipsConfig: WidgetConfig = {
  type: 'tips',
  component: Tips,
  config: {},
  name: '提示'
}

const SearchConfig: WidgetConfig = {
  type: 'search',
  component: SearchBar,
  config: {
    placeholder: '请输入内容'
  },
  name: '搜索'
}

const BtnConfig: WidgetConfig = {
  type: 'button',
  component: Button,
  config: {
    children: '按钮',
    color: 'primary'
  },
  name: '按钮',
  icon: btnIcon
}

const tabs = [
  {
    key: 'home',
    title: '首页',
    // icon: <AppOutline />,
    badge: Badge.dot
  },
  {
    key: 'todo',
    title: '待办',
    badge: '5'
  },
  {
    key: 'message',
    title: '消息',
    badge: '99+'
  },
  {
    key: 'personalCenter',
    title: '我的'
  }
]

const TabBarConfig: WidgetConfig = {
  type: 'tabBar',
  component: TabBar,
  config: {
    children: tabs.map(item => (
      <Item key={item.key} icon={item.icon} title={item.title} />
    ))
  },
  name: '底部栏',
  icon: btnIcon
}

export const widgetConfigList = [
  TipsConfig,
  SearchConfig,
  BtnConfig,
  TabBarConfig
]
