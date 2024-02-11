import Button from './Button'
import ExpandablePanel from './ExpandablePanel'
import { GoTrash } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import PhotosList from './PhotosList'

function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation()
  const handleDelete = () => {
    removeAlbum(album)
  }
  const header = (
    <>
      <Button
        onClick={handleDelete}
        loading={results.isLoading}
        className="mr-3"
      >
        <GoTrash />
      </Button>
      {album.title}
    </>
  )

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  )
}

export default AlbumListItem
