import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
        navigate("/cart")
    }

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping")
    }

  return (
    <>
    <div className="container flex items-start wrap mt-8">
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/shop">Go To Shop</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:w-[70%] sm:w-[100%] overflow-x-auto w-full scroll-smooth transition-all duration-500 ease">
            <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center mb-[1rem] pb-2">
                <div className="max-w-[5rem] max-h-[5rem] min-w-[5rem] min-h-[5rem] bg-[#1c1b1b] flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 ml-4 flex flex-col sm:flex-row justify-around items-center">
                  <Link to={`/product/${item._id}`} className="text-pink-500">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-white">{item.brand}</div>
                  <div className="mt-2 text-white font-bold">
                    $ {item.price}
                  </div>
                </div>

                <div className="w-20">
                  <select
                    className="w-[70%] sm:w-full p-1 ml-2 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="ml-[1rem] mt-[.5rem]" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <div className="p-2 rounded-lg flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>

                <div className="text-2xl font-bold">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="mt-2 sm:mt-0 bg-pink-500 py-2 px-4 rounded-full text-lg"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </>
  )
}

export default Cart