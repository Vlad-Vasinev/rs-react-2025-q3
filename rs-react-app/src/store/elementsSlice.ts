import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface Elements {
  elements: string[]
}

const initialState: Elements = {
  elements: []
}

const elementsSlice = createSlice({
  name: 'elements', 
  initialState, 
  reducers: {
    addEl(state, action: PayloadAction<string>) {
      console.log('adding el inside elementSlice.ts' + ' ' + action.payload)
      state.elements.push(action.payload)
    },
    removeEl(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter(el => el !== action.payload)
      console.log('remove el from elementSlice.ts' + ' ' + action.payload)
    },
    deleteAll(state) {
      state.elements = []
    },
    // downloadAll(state) {

    // }
  }
})

export const { addEl, removeEl, deleteAll } = elementsSlice.actions
export const itemsReducer = elementsSlice.reducer