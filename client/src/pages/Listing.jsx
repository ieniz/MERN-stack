import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerContact from '../components/SellerContact';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import { Calendar } from "react-multi-date-picker";


import { GiCarDoor, GiCarSeat, GiArchiveRegister, GiGearStickPattern, GiSmokeBomb, GiCarWheel, GiFullFolder,GiCardboardBox} from "react-icons/gi";
import { FaMapMarkerAlt, FaRegistered, FaRoad, FaCar, FaRegCalendarAlt, FaCarSide, FaCarCrash, FaRegCreditCard } from 'react-icons/fa';
import { SiPagespeedinsights } from "react-icons/si";
import { TbDisabled, TbEngine } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { GoCheck } from "react-icons/go";



export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  console.log(loading);

  // COMPONENT FOR OPTIONAL CHECKBOXES
  const AttributeItem = ({ attribute }) => (
    listing[attribute] && (
      <li className='flex items-center gap-1 whitespace-nowrap'>
        {attribute}
        <GoCheck className='text-2xl' />
      </li>
    )
  );
    // List of attributes to check
  const attributesToCheck = [
  'airconditioner',
  'metallic',
  'alloywheels',
  'digitalairconditioning',
  'steeringwheelcontrols',
  'navigation',
  'touchscreen',
  'headupdisplay',
  'usbport',
  'cruisecontrol',
  'bluetooth',
  'carplay',
  'rainsensor',
  'parkassist',
  'lightsensor',
  'blindspotsensor',
  'startstopsystem',
  'hillassist',
  'seatmemory',
  'seatmassage',
  'seatheating',
  'seatcooling',
  'powerwindows',
  'powerseatadjustment',
  'armrest',
  'panoramicroof',
  'sunroof',
  'foglights',
  'electricmirrors',
  'alarm',
  'centrallocking',
  'remoteunlocking',
  'airbag',
  'abs',
  'esp',
  'dpffapfilter',
  'powersteering',
  'turbo',
  'isofix',
  'towbar',
   ];
  
  // Component to render the list of attributes
  const AttributeList = () => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 capitalize">
      {attributesToCheck.map(attribute => (
        <AttributeItem key={attribute} attribute={attribute} />
      ))}
    </ul>
  );
  const convertGetReservations= reservations=>{
    return reservations.map(r=>new Date(r) )
  }
  
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (

        <div >        
           <div className='flex flex-col max-w-4xl  mx-auto p-3 my-7 gap-4'>

            <div></div>
            <p className='text-2xl font-extrabold flex-1'>
              {listing.name} 
            </p>         
                             
            <div className='flex  p-3 max-w-56 rounded-2xl  bg-gradient-to-b from-transparent  to-sky-300 dark:to-gray-950'>
            <img          
            src={listing.createdBy.avatar}
            alt='profile'
            className='rounded-full h-14 w-14 mr-2 object-cover cursor-pointer self-center mt-2'
            />          
            <p className='mt-2 font-extrabold text-slate-500'>

            {listing.createdBy.username} <br />  
                    
            {listing.createdBy.phonenumber}
            
            </p>
            
            </div>                             
             
            <p className='flex items-center mt-1 gap-2 text-sm'>
              <FaMapMarkerAlt className='text-xl' />
              <span className='uppercase'>{listing.city}</span> 
              </p> 
              {listing.address &&(
             <p>{listing.address} </p>             
            
            )}
            <div className='flex gap-4 mb-2 '>
              <p className=' w-full max-w-[200px] text-center border-2 border-sky-500 dark:border-amber-700 p-1 rounded-md'>
              {listing.type === 'rent' ? 'For Rent' : (listing.type === 'parts' ? 'Part' : 'For Sale')}
              
              </p>
              <p className='text-xl '>
              {listing.regularPrice.toLocaleString('en-US')}

              {listing.type === 'rent' && ' / day'}$
            </p>
              {listing.offer && (
                <p className=' w-full max-w-[250px]  text-center p-1 rounded-md text-slate-400 underline'>
                  Longer rent price:
                  ${listing.discountPrice }/day 
                </p>
              )}
              <p className='font-bold flex'>{listing.leasing && 'Leasing Possible'}</p>
            
            </div> {listing.type ==='rent' && (
              <div>
                
              <Calendar
              className='  '
              value={convertGetReservations(listing.reservations)}
              readOnly={true}  
              />   </div>
                            )}
            
            {listing.type ==='parts' && (
        
            <div className=' flex font-bold text-sm items-center gap-1'>
            <GiCardboardBox/>
                Type of part : {`${listing.cartype}`}
            </div>
            )}

            {listing.type ==='parts'  && (
            <h2>Parts suits best:</h2>)}

            <ul className=' font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
            
             <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaCar className='text-2xl' />
              <p className='font-extrabold'>
                {`${listing.brand} `}
                {`${listing.model} `}
                               
              </p>
              </li>
              <li className='flex items-center gap-3 whitespace-nowrap '>
              <FaRegCalendarAlt className='text-2xl' />
              {`${listing.year}`}
              </li>
              {(listing.type === 'sale' || listing.type === 'rent') && ( 
                <>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <GiCarSeat className='text-2xl' />
                {listing.seats > 1
                  ? `${listing.seats} Seats - `
                  : `${listing.seats} Seat - `}
                  {`${listing.interior}`}
              </li>
              {listing.adaptedforthedisabled && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <TbDisabled  className='text-2xl' />
                Adapted for disabled
              </li>
              )}
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <GiCarDoor className='text-2xl' />
                {listing.doors > 1
                  ? `${listing.doors} Doors `
                  : `${listing.doors} Door `}
              </li>

                        
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaRoad className='text-2xl' />
                {`${listing.mileage} Km`}
              </li>
              </>)}

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <GiCarWheel className='text-2xl' />
                {`${listing.wheeldrive}`}
              </li>
              
              <li className='flex items-center gap-1 whitespace-nowrap'>
              <GiGearStickPattern className='text-2xl' />
              {`${listing.transmission}`}
              </li>
             
              <li className='flex items-center gap-1 whitespace-nowrap'>
              <BsFuelPump className='text-2xl' />
              {`${listing.engine}`}
              </li>
              {(listing.type === 'sale' || listing.type === 'rent' ) && (
              <li className='flex items-center gap-1 whitespace-nowrap'>
              <GiSmokeBomb className='text-2xl' />
              {`${listing.emission}`}
              </li>
              )}
             {listing.kW > 1 ? (
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <SiPagespeedinsights className='text-2xl' />
                {`${listing.kW} KW (${(listing.kW * 1.34).toFixed(2)} bhp)`}
              </li>
             ) : null}
              <li className='flex items-center gap-1 whitespace-nowrap'>
              <TbEngine className='text-2xl' />
              {`${listing.capacity} `}
              </li>
              {listing.servicebook && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <GiArchiveRegister className='text-2xl' />
                Service book
              </li>
              )}
               {listing.registered && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaRegistered className='text-2xl' />
                Registered
              </li>
              )}
                {listing.customscleared && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <GiFullFolder className='text-2xl' />
                Customs cleared
              </li>
              )}
                {listing.oldtimer && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaCarSide  className='text-2xl' />
                Oldtimer
              </li>
              )}
                {listing.foreignplates && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaRegCreditCard className='text-2xl' />
                Foreign plates
              </li>
              )}
                {listing.damaged && (
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaCarCrash className='text-2xl' />
                Car is damaged
              </li>
              )}
                          
            </ul>
            
            <div>
               <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]  max-w-6xl  mx-auto mt-5 rounded-3xl  '
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
                       

            <p className='border-2 p-5 rounded-md  border-sky-500 dark:border-amber-700 '>              
              {listing.description}
            </p>

            {(listing.type ==='rent' || listing.type === 'sale') && (
            <div className='flex gap-10 p-5 rounded-xl bg-gradient-to-t from-transparent via-transparent dark:to-gray-950'>
            <h1 className='font-bold '>Other:</h1>
            <AttributeList />            
            </div>
            )}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-sky-600 dark:bg-amber-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-10'>
                Contact seller
              </button>
            )}
            {contact && <SellerContact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}