import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

import { FaCar } from "react-icons/fa";
import { GiKeyCard , GiCarSeat, GiCardboardBox} from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    registered: false,
    airconditioner: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const registeredFromUrl = urlParams.get('registered');
    const airconditionerFromUrl = urlParams.get('airconditioner');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      registeredFromUrl ||
      airconditionerFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        registered: registeredFromUrl === 'true' ? true : false,
        airconditioner: airconditionerFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'||
      e.target.id === 'parts'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'registered' ||
      e.target.id === 'airconditioner' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('registered', sidebardata.registered);
    urlParams.set('airconditioner', sidebardata.airconditioner);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 rounded-3xl border-b-2 md:border-r  border-sky-500 dark:border-amber-700 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-mono '>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border border-sky-500 dark:border-amber-600 bg-transparent rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          
          <div>
        <input type="checkbox" id="all" value="" className="sr-only peer  border-amber-700" 
         onChange={handleChange}
         checked={sidebardata.type === 'all'}/>
        <label for="all" class="inline-flex items-center justify-between w-80 p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
            <div className='flex gap-20'><GiCardboardBox style={{ fontSize: '2em'}}/><GiKeyCard style={{ fontSize: '2em'}}/><FaCar style={{ fontSize: '2em'}}/></div>
                <div class=" text-center text-2xl font-bold mt-1">All categories</div>
                
            </div>
        </label>
        </div>
          <div className='flex gap-2 flex-wrap items-center'>
           
          <div>
        <input type="checkbox" id="parts" value="" className="sr-only peer  border-amber-700" 
         onChange={handleChange}
         checked={sidebardata.type === 'parts'}/>
        <label for="parts" class="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
            <div className='flex gap-1'><GiCardboardBox style={{ fontSize: '2em'}}/><GiCarSeat style={{ fontSize: '2em'}}/><FaScrewdriverWrench style={{ fontSize: '2em'}}/></div>
                <div class="text-center text-lg font-semibold mt-2">Parts</div>
                
            </div>
        </label>
        </div>
            <div>
        <input type="checkbox" id="rent" value="" className="sr-only peer  border-amber-700" 
         onChange={handleChange}
         checked={sidebardata.type === 'rent'}/>
        <label for="rent" class="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <GiKeyCard style={{ fontSize: '2em'}}/>
                <div class="text-center text-lg font-semibold mt-2">Rent</div>
                
            </div>
        </label>
        </div>

            <div>
        <input type="checkbox" id="sale" value="" className="sr-only peer  border-amber-700" 
         onChange={handleChange}
         checked={sidebardata.type === 'sale'}/>
        <label for="sale" class="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <FaCar style={{ fontSize: '2em'}}/>
                <div class="text-center text-lg font-semibold mt-2">Buy</div>
                
            </div>
        </label>
        </div>
            
           
          </div>
        
        {sidebardata.type === 'rent' && (
          <div>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='offer' className="sr-only peer"
              onChange={handleChange}
              checked={sidebardata.offer}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
              rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
              after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Search for discount on longer rents</span>
            </label>
            </div>)}


          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='registered'
                className='rounded-full bg-transparent'
                onChange={handleChange}
                checked={sidebardata.registered}
              />
              <span>registered</span>
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='airconditioner'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.airconditioner}
              />
              <span>airconditioner</span>
              
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='rounded-lg p-3 bg-transparent'
            >
              <option class="bg-slate-700" value='regularPrice_desc'>Price high to low</option>
              <option class="bg-slate-700" value='regularPrice_asc'>Price low to hight</option>
              <option class="bg-slate-700"value='createdAt_desc'>Latest</option>
              <option class="bg-slate-700" value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-sky-500 dark:bg-amber-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-bold border-b border-sky-500 dark:border-amber-700 p-3 dark:text-white mt-2'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
            {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-amber-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}