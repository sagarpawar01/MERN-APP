import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {

    const {data, isLoading, isError} = useAllProductsQuery()

    if(isLoading){
        return <Loader />
    }
    if(isError){
        return <div>Error loading products</div>
    }

  return (
    <>
      <div className="container">
        <div className="flex flex-col  md:flex-row">
          <div className="p-3 flex flex-col justify-center">
            <div className="text-xl font-bold h-12">
              All Products ({data?.products?.length})
            </div>
            <div className="flex flex-wrap justify-around items-center">
              {data?.products?.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden sm:w-[25rem] w-[15rem] p-2"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="max-w-[12rem] max-h-[12rem] min-w-[12rem] min-h-[12rem] bg-[#1c1b1b] flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover"
                    />
                    </div>
                    
                    <div className="pl-0 sm:pl-4 flex flex-col justify-around flex-wrap">
                      <div className="flex justify-between">
                        <h5 className="text-m font-bold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 text-xs mb-3">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="text-xs">$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts