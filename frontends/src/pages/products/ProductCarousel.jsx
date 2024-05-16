import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {

    const {data : products, isLoading, error} = useGetTopProductsQuery()

    const settings = {
        dots : false,
        Infinite : true,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1,
        arrows : true,
        autoplay : true,
        autoplaySpeed : 3000
    }

  return (
    <div className="mb-4 lg:block xl:block md:block w-[35rem]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              ratings,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[20rem]"
                />

                <div className="mt-4 flex justify-between">
                  <div className="one flex">
                    <h2 className="mr-2">{name}</h2>
                    <p> $ {price}</p> <br /> <br />
                  </div>

                  <div className="flex justify-between">
                    <div className="one w">
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStore className="mr-2 text-white" /> Brand : &nbsp;{brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaClock className="mr-2 text-white" /> Added : &nbsp; 
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white" /> Reviews : &nbsp;
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white" /> Ratings : &nbsp;
                        {Math.round(ratings)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity : &nbsp;
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaBox className="mr-2 text-white" /> In Stock : &nbsp;
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
                <p className="">
                      {description.substring(0, 170)} ...
                    </p>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  )
}

export default ProductCarousel