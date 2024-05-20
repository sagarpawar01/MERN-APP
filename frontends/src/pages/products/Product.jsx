import React from 'react'
import HeartIcon from "./HeartIcon"
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <div className="w-[15rem] p-3 relative cursor-pointer">
      <Link to={`/product/${product._id}`}>
      <div className="relative max-w-[15rem] max-h-[15rem] min-w-[15rem] min-h-[15rem] bg-[#1c1b1b] flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              $ {product.price}
            </span>
          </h2>
      </div>
      </Link>
    </div>
  )
}

export default Product