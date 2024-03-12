import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <><div className='p-3 max-w-lg mx-auto mb-7 '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='dark:border-none border-sky-500  text-gray-400 p-3 rounded-lg dark:bg-transparent bg-gradient-to-b from-transparent via-transparent dark:to-gray-800'
          onChange={handleChange} />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='dark:border-none border-sky-500 text-gray-400  p-3 rounded-lg dark:bg-transparent bg-gradient-to-b from-transparent via-transparent dark:to-gray-800'
          onChange={handleChange} />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='dark:border-none border-sky-500  p-3 rounded-lg dark:bg-transparent bg-gradient-to-b from-transparent via-transparent dark:to-gray-800 ' />
          
        <div class="relative">
        <span class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400">
        <FaPhoneAlt />
        </span>
        <input 
        onChange={handleChange}
        type="text" id="phonenumber" className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
         border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0
         focus:border-blue-600 peer"  placeholder="Phone number " />
        </div>
        <button
          disabled={loading}
          className='border-2 font-extralight text-black dark:text-white border-sky-500 dark:border-amber-600 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80  hover:bg-sky-500 dark:hover:bg-amber-600'
        >
          {loading ? 'Loading...' : 'Update profile'}
        </button>
        <Link className='border-2 font-extralight text-black dark:text-white border-sky-500 dark:border-amber-600 p-3 rounded-lg uppercase text-center hover:opacity-95 hover:bg-sky-500 dark:hover:bg-amber-600' to={'/create-listing'}>
          Create Listing
        </Link>
      </form>
      <button onClick={handleShowListings} className='border-2 font-extralight border-sky-500 dark:border-amber-500 p-2 rounded-xl dark:text-white w-full mt-5 hover:bg-sky-500 dark:hover:bg-amber-600'>
        Show Your Listings
      </button>
      <div className='flex justify-between mt-5'>
        <div
          onClick={handleDeleteUser}
          class="relative inline-flex items-center justify-center px-2 overflow-hidden font-medium text-sky-500 transition duration-300 ease-out border-2 border-sky-500 dark:border-amber-500 rounded-lg shadow-md group">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-sky-500 dark:bg-amber-500 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-sky-500 dark:text-white transition-all duration-300 transform group-hover:translate-x-full ease">Delete account</span>
          <span className="relative invisible">Delete account</span>
        </div>
        <div
          onClick={handleSignOut}
          className="relative inline-flex items-center justify-center px-2 overflow-hidden font-medium text-sky-500 transition duration-300 ease-out border-2 border-sky-500 dark:border-amber-500 rounded-lg shadow-md group">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-sky-500 dark:bg-amber-500 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-sky-500 dark:text-white transition-all duration-300 transform group-hover:translate-x-full ease">Sign out</span>
          <span className="relative invisible">Sign out</span>
        </div>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>

      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
      

    </div>

    <div >
    
      {userListings &&
        userListings.length > 0 &&
        
        <div className="flex-1 sm:flex gap-4">
          
          
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className=' rounded-lg p-10 justify-between  gap-4 '
            >
              
              
                  <div class="max-w-sm bg-white border border-sky-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-amber-700">
                  <a href="#">
                      <img class="rounded-t-lg" src={listing.imageUrls[0]} alt="" />
                  </a>
                  <div class="p-5">
                  <Link to={`/listing/${listing._id}`}>
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{listing.name}</h5>
                      </a>
                      </Link>
                      <p class="mb-3 font-normal text-gray-700 uppercase dark:text-gray-400">{listing.type}-{listing.regularPrice}$</p>
                      <button onClick={() => handleListingDelete(listing._id)} href="#" class="inline-flex items-center px-5 py-2.5 mr-5 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-blue-800">
                          DELETE LISTING
                          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                      </button>
                      <button href="#" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
                      <Link to={`/update-listing/${listing._id}`}>
                  <button className='uppercase hover:opacity-50'>Edit</button>
                </Link>
                          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                      </button>
                  </div>
              </div>
              
              

            
              
                
              </div>
            
          ))}
        </div>}</div></>
  );
}