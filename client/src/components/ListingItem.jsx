import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

import { GiGearStickPattern, GiCarWheel, GiCardboardBox} from "react-icons/gi";
import { FaRoad, FaRegCalendarAlt,FaCar} from 'react-icons/fa';
import { SiPagespeedinsights } from "react-icons/si";
import { BsFuelPump } from "react-icons/bs";


export default function ListingItem({ listing }) {
  return (
    <div className=' border-2 dark:border-amber-600 border-sky-500 bg-white dark:bg-slate-800 dark:text-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] 
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700  dark:text-white'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-amber-700' />
            <p className='text-sm text-gray-600  dark:text-slate-200 truncate w-full'>
              <span className='uppercase'>{listing.city}</span> {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600  dark:text-white line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500  dark:text-amber-600 mt-2 font-bold underline'>
            
            {
              listing.regularPrice.toLocaleString('en-US')
              }
            {listing.type === 'rent' && ' / day'}$
            
          </p>
          <p className='font-extralight'>{listing.offer && ' (Listing has discount on longer rents)'}</p>
          {(listing.type ==='rent' || listing.type === 'sale') && (<>
          <div className='text-slate-700  dark:text-white flex gap-4'>
          
            
            <div className='flex font-bold text-sm items-center gap-1'>
            <FaRoad />
                {`${listing.mileage} Km`}
            </div>
            <div className=' flex font-bold text-sm items-center gap-1'>
            
              <SiPagespeedinsights  />
              {`${listing.kW} kW`}
              
            </div>
            <div className=' flex font-bold text-sm items-center gap-1'>
            <GiGearStickPattern  />
              {`${listing.transmission}`}
            </div>
                       
          
          </div>

          <div className='text-slate-700  dark:text-white flex gap-4'>
          <div className=' flex font-bold text-sm items-center gap-1'>
            <FaRegCalendarAlt />
              {`${listing.year}`}
            </div>
          
          <div className=' flex font-bold text-sm items-center gap-1'>
          <BsFuelPump/>
              {`${listing.engine}`}
          </div>
          <div className=' flex font-bold text-sm items-center gap-1'>
            <GiCarWheel/>
                {`${listing.wheeldrive}`}
            </div>
            
          </div>
          </>
        )}

        {listing.type ==='parts' && (
        <>
            <div className=' flex font-bold text-sm items-center gap-1'>
            <GiCardboardBox/>
                Type of part : {`${listing.cartype}`}
            </div>
            <div className=' flex font-bold text-sm items-center gap-1'>
            <FaCar/>
                For: {`${listing.brand}`}-{`${listing.model}`}/{`${listing.year}`}
            </div>
        </>
            )}
        </div>
      </Link>
    </div>
  );
}