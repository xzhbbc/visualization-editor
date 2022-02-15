import { v4 as uuidv4 } from 'uuid'
import { Model, EditorStateData } from './model'

enum EditorType {
  ADD = 'ADD',
  FIX = 'FIX',
  MOVE = 'MOVE',
  EDIT = 'EDIT',
  IDLE = 'IDLE'
}

const model: Model<EditorStateData> = {
  namespace: 'editor',
  state: {
    widgetData: [],
    currentIndex: 0,
    type: 'IDLE'
  },
  reducers: {
    addWidget(state, { widget, addIndex }) {
      const widgetData = [...state.widgetData]
      // console.log(widget, 'widgetMsg')
      const data = {
        ...widget,
        id: uuidv4()
      }
      console.log(addIndex, 'add', data)
      widgetData.splice(addIndex, 0, data)
      return {
        ...state,
        widgetData,
        type: EditorType.ADD,
        currentIndex: addIndex
      }
    },
    moveWidget(state, { index, moveIndex }) {
      const data = [...state.widgetData]
      // [data[index], data[moveIndex]] = [data[moveIndex], data[index]]
      const cur = data[index]
      data.splice(index, 1)
      data.splice(moveIndex, 0, cur)
      return {
        ...state,
        widgetData: data,
        type: EditorType.MOVE
      }
    },
    setWidgetHeight(state, { index, height }) {
      console.log('setWidgetDataHeight===')
      const data = [...state.widgetData]
      const cur = {
        ...data[index]
      }
      cur.height = height
      data.splice(index, 1, cur)
      return {
        ...state,
        widgetData: data,
        type: EditorType.IDLE
      }
    }
  }
}

export default model
