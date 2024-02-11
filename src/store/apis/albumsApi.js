import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

//DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      //Remove for production
      await pause(1000)
      return fetch(...args)
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        /*
        It will work but in every case we may not
        have that userId or related fields to access
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.userId }]
        },*/
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        },
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: 'Album', id: album.id }
          })
          tags.push({ type: 'UsersAlbums', id: user.id })
          return tags
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [
            {
              type: 'UsersAlbums',
              id: user.id,
            },
          ]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            },
          }
        },
      }),
    }
  },
})

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi
export { albumsApi }
