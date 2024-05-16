import React from 'react'
import { useSelector } from 'react-redux'

const FavoritesCount = () => {

    const favourites = useSelector(state => state.favourites)
    const favouritesCount = favourites.length

  return (
    <div className="absolute left-2 top-8">
      {favouritesCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favouritesCount}
        </span>
      )}
    </div>
  )
}

export default FavoritesCount