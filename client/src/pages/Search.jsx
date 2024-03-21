import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import brandModelData from '../BrandModelData.js';
import { FaCar } from "react-icons/fa";
import { GiKeyCard , GiCarSeat, GiCardboardBox} from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    cartype: '',
    brand:'',
    model:'',
    registered: false,
    leasing: false,
    servicebook: false,
    foreignplates: false,
    customscleared: false,
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
    const cartypeFromUrl = urlParams.get('cartype');
    const brandFromUrl = urlParams.get('brand');
    const modelFromUrl = urlParams.get('model');
    const registeredFromUrl = urlParams.get('registered');
    const leasingFromUrl = urlParams.get('leasing');
    const foreignplatesFromUrl = urlParams.get('foreignplates');
    const servicebookFromUrl = urlParams.get('servicebook');
    const customsclearedFromUrl = urlParams.get('customscleared');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cartypeFromUrl ||
      brandFromUrl ||
      modelFromUrl ||
      registeredFromUrl ||
      leasingFromUrl ||
      foreignplatesFromUrl ||
      servicebookFromUrl ||
      customsclearedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        cartype: cartypeFromUrl || '',
        brand: brandFromUrl || '',
        model: modelFromUrl || '',
        registered: registeredFromUrl === 'true' ? true : false,
        leasing: leasingFromUrl === 'true' ? true : false,
        customscleared: customsclearedFromUrl === 'true' ? true : false,
        foreignplates: foreignplatesFromUrl === 'true' ? true : false,
        servicebook: servicebookFromUrl === 'true' ? true : false,
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


  const handleChangeType = (e) => {
  const selectedType = e.target.value; 

  if (selectedType !== undefined) {
      // set cartype to the selected type
      setSidebardata({ ...sidebardata, cartype: selectedType });
    }
  }
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setSidebardata({
      ...sidebardata,
      brand: selectedBrand,
      model: '', // Reset model when the brand changes
    });
   };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setSidebardata({
      ...sidebardata,
      model: selectedModel,
    });
   };


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
      e.target.id === 'leasing' ||
      e.target.id === 'foreignplates' ||
      e.target.id === 'servicebook' ||
      e.target.id === 'customscleared' ||
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
    urlParams.set('cartype', sidebardata.cartype);
    urlParams.set('brand',sidebardata.brand);
    urlParams.set('model',sidebardata.model);
    urlParams.set('registered', sidebardata.registered);
    urlParams.set('leasing', sidebardata.leasing);
    urlParams.set('foreignplates', sidebardata.foreignplates);
    urlParams.set('servicebook', sidebardata.servicebook);
    urlParams.set('customscleared', sidebardata.customscleared);
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
            
            <input
              type='text'
              id='searchTerm'
              placeholder='Search term...'
              className='border border-sky-500 dark:border-amber-600  bg-transparent rounded-lg p-3 w-full'
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

            {sidebardata.type === 'sale' && (
          <div className='flex gap-2 flex-wrap items-center max-w-10'>
            <label className='font-semibold'>Legal:</label>
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
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='leasing'
                className='rounded-full bg-transparent'
                onChange={handleChange}
                checked={sidebardata.leasing}
              />
              <span>leasing</span>
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='customscleared'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.customscleared}
              />
              <span>customscleared</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='foreignplates'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.foreignplates}
              />
              <span>foreignplates</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='servicebook'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.servicebook}
              />
              <span>servicebook</span>
              
            </div>
          </div>
          )}
          {sidebardata.type !== 'all' && (
          <select
            type='text'
           
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='cartype'
            onChange={handleChangeType}
            value={sidebardata.cartype}
          >           

            {sidebardata.type === 'parts' && (
              <>
                <option>Mali servis - Filteri</option>
                <option>Kaišni prenos/ Remenje / Veliki servis</option>
                <option>Senzori</option>
                <option>Delovi za servisiranje/pregled/održavanje</option>
                <option>Karoserija</option>
                <option>Hlađenje/Grijanje/ventilacija/elektronika klime</option>
                <option>Kvačilo/Zamajac/priključni dijelovi kvačila</option>
                <option>Motor</option>
                <option>Pogon točkova/Poluosovina</option>
                <option>Sigurnosni sistemi</option>
                <option>Unutrašnja oprema</option>
                <option>Elektrika</option>
                <option>Informacioni/komunikacioni sistemi</option>
                <option>Luksuzna oprema</option>
                <option>Sistem upravljanja</option>
                <option>Sistem zaključavanja</option>
                <option>Izduvni sistem</option>
                <option>Kočioni sistem, diskovi i plocice</option>                
                <option>Opruge/ Amortizeri</option>
                <option>Sistem za dovod goriva/Priprema goriva</option>
                <option>Hibridni/električni pogon</option>
                <option>Kompresorski agregat</option>
                <option>Mjenjač/dijelovi za mjenjač</option>
                <option>Osovinski pogon</option>
                <option>Sistem za paljenje/bobina,svjećice,grijači</option>
                <option>Točkovi/Pneumatici</option>
                <option>Vješanje/Seleni/ Glavčina točka/ Ležajevi</option>
                                
                
              </>
            )}
            {(sidebardata.type === 'sale' || sidebardata.type ==='rent') && (
              <>
             <option >
            Limousine
            </option> 
            <option >
            Hatchback
            </option>  
            <option >
            Pickup
            </option>  
            <option >
            Sedan
            </option>
            <option >
            SUV
            </option>  
            <option >
            Station wagon
            </option>
            </>
            )}
          
          </select>)}
          
          <select
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
             dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='brand'
            onChange={handleBrandChange}
            value={sidebardata.brand}
          >
            <option value='' disabled>
              Select Brand
            </option>
            {sidebardata.type ==='parts' && (
              <option>
                Any brand
              </option>
            )}
            {Object.keys(brandModelData).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='model'
            onChange={handleModelChange}
            value={sidebardata.model}
            disabled={!sidebardata.brand} //This disables model dropdown if no brand is selected
          >
            <option value='' disabled>
              {sidebardata.brand ? 'Select Model' : 'Select Brand First'}
            </option>
            {sidebardata.type ==='parts' && (
              <option>
                Any model
              </option>
            )}
            {brandModelData[sidebardata.brand] &&
              brandModelData[sidebardata.brand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
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