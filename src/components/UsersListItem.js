import { GoTrash } from 'react-icons/go'
import { removeUser } from '../store'
import Button from './Button'
import useThunk from '../hooks/use-thunk'
import ExpandablePanel from './ExpandablePanel'
import AlbumList from './AlbumsList'

function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUser, removingUserError] = useThunk(removeUser)

  const handleClick = () => {
    doRemoveUser(user)
  }

  const header = (
    <>
      <Button className="mr-3" loading={isRemovingUser} onClick={handleClick}>
        <GoTrash />
      </Button>
      {removingUserError && <div>Error deleting</div>}
      {user.name}
    </>
  )

  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  )
}

export default UsersListItem
