import { v4 as uuidv4 } from 'uuid'
import { Model, StateData } from './model'

const model: Model<StateData> = {
  namespace: 'editor',
  state: {
    widgetData: []
  },
  reducers: {
    addWidget(state, { widget }) {
      // console.log(widget, 'widgetMsg')
      const data = {
        ...widget,
        id: uuidv4()
      }
      return {
        ...state,
        widgetData: [...state.widgetData, data]
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
        widgetData: data
      }
    }
  }
}

export default model
