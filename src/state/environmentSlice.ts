import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Environment = 'Alpha' | 'Local';

interface EnvironmentState {
  value: Environment
}

const initialState = { value: 'Alpha' } as EnvironmentState

const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setEnvironment(state, action: PayloadAction<Environment>) {
      state.value = action.payload
    },
  },
})

export const { setEnvironment } = environmentSlice.actions
export default environmentSlice.reducer