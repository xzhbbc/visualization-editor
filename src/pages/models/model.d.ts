import { WidgetData } from '../config/config'

export interface Model<T = any> {
  namespace: string
  state: T
  reducers: {
    [key: string]: (state: T, paylod: { [key: string]: any }) => any
  }
}

export type StateData = {
  widgetData: Array<WidgetData>
}

export type ModelData = {
  editor: StateData
}
