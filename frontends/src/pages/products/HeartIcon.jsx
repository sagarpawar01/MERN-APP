import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouriteSlice";

import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouritesFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({product}) => {

  const dispatch = useDispatch()
  const favourites = useSelector((state) => state.favourites) || []
  const isFavourites = favourites.some(p => p._id === product._id)

  const toggleFavourites = () => {
    if(isFavourites){
      dispatch(removeFromFavourites(product))
      removeFavouritesFromLocalStorage(product._id)
    }else{
      dispatch(addToFavourites(product))
      addFavouriteToLocalStorage(product)
    }
  }

  useEffect(() => {
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage()
    dispatch(setFavourites(favouritesFromLocalStorage))
  }, [])
  

  return (
    <div
      className={`absolute top-2 right-5 cursor-pointer ${!isFavourites ? "bg-white" : ""}`}
      onClick={toggleFavourites}
    >
      {isFavourites ? (
        <FaHeart className="text-red-600 m-0.5" />
      ) : (
        <FaRegHeart className="text-black m-0.5" />
      )}
    </div>
  )
}

export default HeartIcon