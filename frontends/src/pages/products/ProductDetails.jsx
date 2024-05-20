import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice";
// import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {

  const {id : productId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {data : product, isLoading, refetch, error} = useGetProductDetailsQuery(productId)

  const {userInfo} = useSelector(state => state.auth)

  const [createReview, {isLoading : loadingProductReview}] = useCreateReviewMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await createReview({productId, rating, comment}).unwrap()
      refetch()
      toast.success("Review Created Successfully")
    } catch (error) {
      toast.error(error?.data || error?.message)
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate("/cart")
  }

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap items-between mt-[2rem]">
            <div className="relative max-w-[30rem] max-h-[30rem] min-w-[15rem] min-h-[15rem] bg-[#1c1b1b] flex justify-center items-center mr-[2rem]">
              <img
                src={product.image}
                alt={product.name}
                className=""
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 w-[15rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex flex-col sm:flex-row justify-between w-[18rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[18rem]">
                    <FaClock className="mr-2 text-white" /> Added:
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap sm:justify-between flex-col sm:flex-row">
                <Ratings
                  value={product.ratings}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div className="mt-3 sm:mt-0">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails