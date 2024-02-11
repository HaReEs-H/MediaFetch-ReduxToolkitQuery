import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers, addUser } from '../store'
import Button from './Button'
import Skeleton from './Skeleton'
import useThunk from '../hooks/use-thunk'
import UsersListItem from './UsersListItem'

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)
  const { usersData } = useSelector((state) => {
    return state.users
  })
  useEffect(() => {
    // setIsLoadingUsers(true)
    // dispatch(fetchUsers())
    //   .unwrap()
    //   .then(() => {})
    //   .catch((err) => {
    //     setLoadingUsersError(err)
    //   })
    //   .finally(() => {
    //     setIsLoadingUsers(false)
    //   })
    // BAD
    // setIsLoadingUsers(false)
    doFetchUsers()
  }, [doFetchUsers])

  const handleUserAdd = () => {
    // setIsCreatingUser(true)
    // dispatch(doCreateUser())
    //   .unwrap()
    //   .then(() => {})
    //   .catch((err) => {
    //     setCreatingUserError(err)
    //   })
    //   .finally(() => {
    //     setIsCreatingUser(false)
    //   })
    doCreateUser()
  }

  let content
  if (isLoadingUsers) {
    content = (
      <div>
        <Skeleton times={10} className="h-10 w-full" />
      </div>
    )
  } else if (loadingUsersError) {
    content = <div>Error fetching data....</div>
  } else {
    content = usersData.map((user) => {
      return <UsersListItem user={user} key={user.id} />
    })
  }
  return (
    <div>
      <div className="flex flex-row items-center justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && 'Error while creating user...'}
      </div>
      {content}
    </div>
  )
}

export default UsersList
