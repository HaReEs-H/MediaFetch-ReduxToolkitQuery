import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'

function useThunk(thunk) {
  //State Initialization
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  //Enabling communication with redux store
  const dispatch = useDispatch()
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true)
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => {
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [dispatch, thunk]
  )
  return [runThunk, isLoading, error]
}

export default useThunk
