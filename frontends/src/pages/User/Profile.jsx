import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../../redux/api/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const Profile = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [updateProfile, {isLoading : loadingUpdateProfile}] = useProfileMutation()
  const {userInfo} = useSelector(state => state.auth)
  // const {serach} = useLocation()
  // const sp = new URLSearchParams()
  // const redirect = sp.get("redirect") || '/'

  useEffect(() => {
   setUsername(userInfo.username)
   setEmail(userInfo.email)
  }, [userInfo.username,userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      toast.error("Passwords do not match")
    }else{
      try {
        const res = await updateProfile({id : userInfo?._id,username, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success("Profile updated successfully")
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
    <div className="flex justify-center align-center md:flex md:space-x-4">
      <div className="md:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input p-4 rounded-sm w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-input p-4 rounded-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-input p-4 rounded-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="form-input p-4 rounded-sm w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
              Update
            </button>

            <Link
              to="/user-orders"
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
            >
              My Orders
            </Link>
          </div>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  </div>
  )
}

export default Profile