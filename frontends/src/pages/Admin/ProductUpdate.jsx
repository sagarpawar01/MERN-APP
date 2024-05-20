import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {

    const params = useParams()
    console.log(params._id,"params")
    const {data : productData} = useGetProductsByIdQuery(params?._id)
    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")

    const [category, setCategory] = useState(productData?.category || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.countInStock || "")
    // const [imageUrl, setImageUrl] = useState(null)

    const navigate = useNavigate()
    const {data : categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
      if(productData && productData?._id){
        console.log(productData?.category,"ytd")
        setName(productData.name)
        setDescription(productData.description)
        setPrice(productData.price)
        setCategory(productData?.category)
        setQuantity(productData.quantity)
        setBrand(productData.brand)
        setStock(productData?.countInStock)
    setImage(productData.image)
      }
    },[productData])

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append("image",e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success("Item updated Successfully")
            setImage(res.image)
        } catch (error) {
            toast.error("Item added successfully")
        }

    }
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("image",image)
            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("quantity",quantity)
            formData.append("brand",brand)
            formData.append("countInStock",stock)
            console.log(formData,"formData")
            const {data} = await updateProduct({productId : params._id, formData})

            if(data.error){
                toast.error(data.error)
            }
            else{
                toast.success(`Product successfully updated`)
                navigate("/admin/allproductslist")
            }
        } catch (error) {
            toast.error("Product update failed.Try again.")
        }
    }

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?")

            if(!answer) return

             const { data } = await deleteProduct(params?._id)
             toast.success(`${data.name} is deleted`)
             navigate("/admin/allproductslist")
        } catch (error) {
            
        }
    }

  return (
    <>
      <div className="container sm:mx-[0]">
        <div className="flex flex-col flex-wrap md:flex-row justify-center">
          <AdminMenu />
          <div className="">
            <div className="h-12 text-2xl mb-8 font-bold">Update / Delete Product</div>

            <div className="flex flex-col justify-center sm:items-center">
            {image && (
              <div className="max-w-[14rem] max-h-[14rem] min-w-[14rem] min-h-[14rem] bg-[#1c1b1b] flex justify-center items-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="text-white px-2 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white md:w-[100%] w-[15rem]"
                />
              </label>
            </div>
            </div>

            <div className="">
              <div className="flex flex-wrap flex-col md:flex-row justify-between">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white md:ml-4 ml-0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap flex-col md:flex-row justify-between">
                <div>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="text"
                    min="1"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[15rem] md:w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[15rem] md:w-[25rem] border rounded-lg bg-[#101011] text-white"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c?._id} value={c?._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleUpdate}
                  className="py-4 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-0 sm:mr-6 w-[15rem] sm:w-[45%]"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 mt-5 rounded-lg text-lg font-bold bg-pink-600 w-[15rem] sm:w-[45%]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductUpdate