import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUsers'
import { addUser } from '../thunks/addUser'
import { removeUser } from '../thunks/removeUser'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersData: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      /*
      Update our state object however appropriate 
      to show the user what we are loading data
      */
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersData = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersData.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false
      const updateData = state.usersData.filter(
        (user) => user.id !== action.payload.id
      )
      state.usersData = updateData
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const userReducer = usersSlice.reducer
