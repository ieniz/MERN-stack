import React from 'react';

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto my-10'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg border-sky-500 dark:border-amber-600 '
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='gap-6 flex-wrap'>
            <div className='flex items-center  gap-2'>
              <input type='checkbox' id='sale' className='w-5 rounded-md' />
              <span>Sell</span>
            </div>
            <div className='flex items-center  gap-2'>
              <input type='checkbox' id='rent' className='w-5 rounded-md' />
              <span>Rent</span>
            </div>
            <div className='flex items-center  gap-2'>
              <input type='checkbox' id='registered' className='w-5 rounded-md' />
              <span>Registered</span>
            </div>
            <div className='flex items-center  gap-2'>
              <input type='checkbox' id='airconditioner' className='w-5 rounded-md' />
              <span>Airconditioner</span>
            </div>
            <div className='flex items-center  gap-2'>
              <input type='checkbox' id='offer' className='w-5 rounded-md' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='seats'
                min='1'
                max='100'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Seats</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='hp'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>HP</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
                
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="images" accept='image/*' multiple></input>
            <button className='p-3 text-sky-700 border border-sky-700 rounded uppercase hover:shadow-lg disabled:opacity-80 dark:border-amber-400 dark:text-amber-700'>Upload</button>
         
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}