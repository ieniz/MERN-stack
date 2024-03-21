import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerContact from '../components/SellerContact';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { Calendar } from "react-multi-date-picker";
import '../calendar.css';


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
            <div className='flex-wrap sm:flex '>
            <div className=' w-full md:w-2/3  '>
            <p className='text-2xl sm:text-3xl font-extrabold underline text-sky-500 dark:text-amber-600 '>
              {listing.name} 
            </p>         
                             
                                
                                  <div
                                    className="bg-gray-100 dark:bg-gray-900 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform max-w-80 mt-5">
                                    <div className="flex items-center gap-4">
                                      <img src={listing.createdBy.avatar}
                                      className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                    />
                                      <div className="w-fit transition-all transform duration-500">
                                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                                          {listing.createdBy.username}
                                        </h1>
                                        <p className="text-gray-400">Contact seller</p>
                                        <a
                                          className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                                          {listing.createdBy.email}
                                        </a>
                                      </div>
                                    </div>
                                    <div className="absolute group-hover:bottom-1 delay-300 -bottom-16 transition-all duration-500 bg-gray-600 dark:bg-gray-100 right-1 rounded-lg">
                                      <div className="flex justify-evenly items-center gap-2 p-1 text-2xl text-white dark:text-gray-600">
                                       {listing.createdBy.phonenumber}
                                      </div>
                                    </div>
                                  </div>
                                                          
             
            <p className='flex items-center mt-3 gap-2 text-sm'>
              <FaMapMarkerAlt className='text-xl' />
              <span className='uppercase'>{listing.city}</span> 
              </p> 
              {listing.address &&(
             <p className='mt-2 italic'>{listing.address} </p>             
            
            )}
            <div className='flex gap-4 mb-2 mt-5 '>
              <p className=' w-full max-w-[200px]  text-center border-2 border-sky-500 dark:border-amber-700 p-1 rounded-md'>
              {listing.type === 'rent' ? 'For Rent' : (listing.type === 'parts' ? 'Part' : 'For Sale')}
              
              </p>
              <p className='text-xl '>
              {listing.regularPrice.toLocaleString('en-US')}

              {listing.type === 'rent' && ' / day'}$
            </p>
            </div>
              {listing.offer && (
                <p className=' w-full max-w-[250px]  text-center p-1 rounded-md text-slate-400 underline'>
                  Longer rent price:
                  ${listing.discountPrice }/day 
                </p>
              )}
              <p className='font-bold flex'>{listing.leasing && 'Leasing Possible'}</p>
              
             
              </div>
              
              <div className='m-5 md:m-0'>
              <p className='font-extralight text-sky-500 dark:text-amber-600 mb-2'>Reserved dates :</p>
              {listing.type ==='rent' && (
                              
                              <Calendar
                              className=' '
                              value={convertGetReservations(listing.reservations)}
                              readOnly={true}  
                              />   
                                            )}
              </div>
            </div> 
            <hr className='border-sky-500 dark:border-amber-600'/>
            {listing.type ==='parts' && (
        
            <div className=' flex font-bold text-sm items-center gap-1'>
            <GiCardboardBox/>
                Type of part : {`${listing.cartype}`}
            </div>
            )}

            {listing.type ==='parts'  && (
            <h2>Parts suits best:</h2>)}

            <ul className=' font-extrabold mt-8 text-sm flex flex-wrap items-center gap-x-5 sm:gap-x-16 gap-y-5'>
            
             <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl '>
              <FaCar className='text-6xl' />
              <p className='font-extrabold'>
                {`${listing.brand} `}
                {`${listing.model} `}
                               
              </p>
              </li>
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
              <FaRegCalendarAlt className='text-6xl' />
              {`${listing.year}`}
              </li>
              {(listing.type === 'sale' || listing.type === 'rent') && ( 
                <>
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <GiCarSeat className='text-6xl' />
                {listing.seats > 1
                  ? `${listing.seats} Seats - `
                  : `${listing.seats} Seat - `}
                  {`${listing.interior}`}
              </li>
              {listing.adaptedforthedisabled && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <TbDisabled  className='text-6xl' />
                Adapted for disabled
              </li>
              )}
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <GiCarDoor className='text-6xl' />
                {listing.doors > 1
                  ? `${listing.doors} Doors `
                  : `${listing.doors} Door `}
              </li>

                        
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <FaRoad className='text-6xl' />
                {`${listing.mileage} Km`}
              </li>
              </>)}

              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl '>
                <GiCarWheel className='text-6xl' />
                {`${listing.wheeldrive}`}
              </li>
              
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl'>
              <GiGearStickPattern className='text-6xl' />
              {`${listing.transmission}`}
              </li>
             
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl'>
              <BsFuelPump className='text-6xl' />
              {`${listing.engine}`}
              </li>
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl'>
              <TbEngine className='text-6xl' />
              {`${listing.capacity} `}
              </li>
              {(listing.type === 'sale' || listing.type === 'rent' ) && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl'>
              <GiSmokeBomb className='text-6xl' />
              {`${listing.emission}`}
              </li>
              )}
             {listing.kW > 1 ? (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl '>
                <SiPagespeedinsights className='text-6xl' />
                {`${listing.kW} KW (${(listing.kW * 1.34).toFixed(2)} bhp)`}
              </li>
             ) : null}
             
              {listing.servicebook && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <GiArchiveRegister className='text-6xl' />
                Service book
              </li>
              )}
               {listing.registered && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <FaRegistered className='text-6xl' />
                Registered
              </li>
              )}
                {listing.customscleared && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <GiFullFolder className='text-6xl' />
                Customs cleared
              </li>
              )}
                {listing.oldtimer && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <FaCarSide  className='text-6xl' />
                Oldtimer
              </li>
              )}
                {listing.foreignplates && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl  '>
                <FaRegCreditCard className='text-6xl' />
                Foreign plates
              </li>
              )}
                {listing.damaged && (
              <li className='flex font-extrabold items-center gap-1 whitespace-nowrap text-xl '>
                <FaCarCrash className='text-6xl' />
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