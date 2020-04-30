import { getStore } from "eztore"

export const useStore = getStore({
  run: {
    state: null,
    reducer(state, value) {
      return value
    }
  },
  
  notifications: {
    state: [],
    reducer(state, { action, value }) {
      switch (action) {
        case "push":
          state.push(value)
          break
        case "shift":
          state.shift()
          break
        default:
          return
      }
    },
  },
})