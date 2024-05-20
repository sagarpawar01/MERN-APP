import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const SmallProducts = ({product}) => {
  return (
    <div className="p-3">
      <div className="relative max-w-[12rem] max-h-[12rem] min-w-[12rem] min-h-[12rem] bg-[#1c1b1b] flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded w-full"
        />
        <HeartIcon product={product} />
      </div>

      <div className="py-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default SmallProducts