import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import AlbumListItem from './AlbumListItem'

function AlbumList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()
  // console.log(data, error, isLoading)
  // console.log(results)

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isFetching) {
    content = (
      <div>
        <Skeleton times={3} className="h-10 w-full" />
      </div>
    )
  } else if (error) {
    content = <div>Error while fetching albums</div>
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />
    })
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between m-3">
        <h1 className="m-2 text-xl">Albums by {user.name}</h1>
        <Button onClick={handleAddAlbum} loading={results.isLoading}>
          + Add album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumList
