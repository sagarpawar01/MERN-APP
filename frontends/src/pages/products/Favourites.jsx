import React from 'react'
import { useSelector } from 'react-redux'
import { selectFavouriteProduct } from '../../redux/features/favourites/favouriteSlice'
import Product from '../products/Product'

const Favourites = () => {

    const favourites = useSelector(selectFavouriteProduct)

  return (
    <div className="">
      <h1 className="text-lg font-bold mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-8">
        {favourites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Favourites