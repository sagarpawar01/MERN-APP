import React from 'react'
import { useGetTopProductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader'
import ProductCarousel from '../pages/products/ProductCarousel'
import SmallProducts from '../pages/products/SmallProducts'

const Header = () => {

    const {data, isLoading, error} = useGetTopProductsQuery()
    if(isLoading){
      return <Loader />
    }

    if(error){
      return <h1>Error</h1>
    }

  return (
    <>
    <div className="flex xl:justify-around lg:flex-row sm:flex-col">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1 place-items-center">
            {data?.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  )
}

export default Header