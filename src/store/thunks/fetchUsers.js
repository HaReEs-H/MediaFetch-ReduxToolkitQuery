import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users')

  //DEV only
  await pause(1000)

  return response.data
})

/*
Automatically Created

fetchUsers.pending === 'users/fetch/pending'
fetchUsers.fullfilled === 'users/fetch/fullfilled'
fetchUsers.rejected === 'users/fetch/rejected'

*/

//DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
export { fetchUsers }
