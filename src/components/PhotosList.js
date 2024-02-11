import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from './Button'
import PhotosListItem from './PhotosListItem'
import Skeleton from './Skeleton'

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album)
  const [addPhoto, addPhotoResults] = useAddPhotoMutation()
  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error fetching photo</div>
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />
    })
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between m-3">
        <h1 className="m-2 text-xl">Photos of {album.title}</h1>
        <Button onClick={handleAddPhoto} loading={addPhotoResults.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-row mx-8 justify-center">{content}</div>
    </div>
  )
}

export default PhotosList
