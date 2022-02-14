import { WidgetData } from '../config/config'

export interface Model<T = any> {
  namespace: string
  state: T
  reducers: {
    [key: string]: (state: T, paylod: { [key: string]: any }) => any
  }
}

export type EditorStateData = {
  widgetData: Array<WidgetData>
  currentIndex: number
  type: any
}

export type ModelData = {
  editor: EditorStateData
}

export enum EditorType {
  ADD = 'ADD',
  FIX = 'FIX',
  MOVE = 'MOVE',
  EDIT = 'EDIT',
  IDLE = 'IDLE'
}
