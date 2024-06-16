import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import brandModelData from '../BrandModelData.js';
import { FaCar } from "react-icons/fa";
import { GiKeyCard , GiCarSeat, GiCardboardBox} from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import cities  from '../CitiesModelData.js';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    cartype: '',
    brand:'',
    model:'',
    year:'',
    city:'',
    engine:'',
    capacity:'',
    transmission:'',
    wheeldrive:'',
    interior:'',
    registered: false,
    leasing: false,
    servicebook: false,
    foreignplates: false,
    customscleared: false,
    oldtimer:false,
    damaged:false,
    offer: false,
    minPrice:null,
    maxPrice:null,
    minMileage:null,
    maxMileage:null,
    minkW:null,
    maxkW:null,
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
    const yearFromUrl = urlParams.get('year');
    const cityFromUrl = urlParams.get('city');
    const engineFromUrl = urlParams.get('engine');
    const capacityFromUrl = urlParams.get('capacity');
    const transmissionFromUrl = urlParams.get('transmission');
    const wheeldriveFromUrl = urlParams.get('wheeldrive');
    const registeredFromUrl = urlParams.get('registered');
    const interiorFromUrl = urlParams.get('interior');
    const leasingFromUrl = urlParams.get('leasing');
    const foreignplatesFromUrl = urlParams.get('foreignplates');
    const servicebookFromUrl = urlParams.get('servicebook');
    const customsclearedFromUrl = urlParams.get('customscleared');
    const damagedFromUrl = urlParams.get('damaged');
    const oldtimerFromUrl = urlParams.get('oldtimer');    
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');
    const minMileageFromUrl = urlParams.get('minMileage');
    const maxMileageFromUrl = urlParams.get('maxMileage');
    const minkWFromUrl = urlParams.get('minkW');
    const maxkWFromUrl = urlParams.get('maxkW');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cartypeFromUrl ||
      brandFromUrl ||
      modelFromUrl ||
      yearFromUrl ||
      cityFromUrl ||
      engineFromUrl ||
      capacityFromUrl ||
      transmissionFromUrl ||
      wheeldriveFromUrl ||
      interiorFromUrl ||
      registeredFromUrl ||
      leasingFromUrl ||
      foreignplatesFromUrl ||
      servicebookFromUrl ||
      customsclearedFromUrl ||
      damagedFromUrl ||
      oldtimerFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl ||
      minMileageFromUrl ||
      maxMileageFromUrl ||
      minkWFromUrl ||
      maxkWFromUrl ||
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
        year: yearFromUrl || '',
        city: cityFromUrl || '',
        engine:engineFromUrl ||'',
        capacity:capacityFromUrl ||'',
        transmission:transmissionFromUrl ||'',
        wheeldrive:wheeldriveFromUrl || '',  
        interior:interiorFromUrl || '',
        registered: registeredFromUrl === 'true' ? true : false,
        leasing: leasingFromUrl === 'true' ? true : false,
        customscleared: customsclearedFromUrl === 'true' ? true : false,
        foreignplates: foreignplatesFromUrl === 'true' ? true : false,
        servicebook: servicebookFromUrl === 'true' ? true : false,
        oldtimer: oldtimerFromUrl === 'true' ? true : false,
        damaged: damagedFromUrl === 'true' ? true : false,
        minPrice:minPriceFromUrl || '',
        maxPrice: maxPriceFromUrl || '',
        minMileage:minMileageFromUrl || '',
        maxMileage: maxMileageFromUrl || '',
        minkW:minkWFromUrl || '',
        maxkW: maxkWFromUrl || '',        
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

   const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1886; 
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(<option key={year} value={year}>{year}</option>);
    }

    return years;
    
  };
  
  function generateEngineSizeOptions() {
    const options = [];
    for (let i = 0.6; i <= 7.5; i += 0.1) {
      options.push(
        <option key={i.toFixed(1)} value={i.toFixed(1)}>
          {i.toFixed(1)}
        </option>
      );
    }
    return options;
  }

  const handleInputChange = (fieldName, e) => {
    const selectedValue = e.target.value;
    setSidebardata({
      ...sidebardata,
      [fieldName]: selectedValue,
    });
};

const handleEngineTypeChange = (e) => {
  handleInputChange('engine', e);
};
const handleDateChange = (e) => {
  handleInputChange('year', e);
};
const handleCapacityChange = (e) => {
  handleInputChange('capacity', e);
};
const handleTransmissionChange = (e) => {
  handleInputChange('transmission', e);
};
const handleWheelDriveChange = (e) => {
  handleInputChange('wheeldrive', e);
};

const handleInteriorChange = (e) => {
  handleInputChange('interior', e);
};
const handleCityChange = (e) => {
  handleInputChange('city', e);
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
      e.target.id === 'damaged' ||
      e.target.id === 'oldtimer'||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
    if (
      e.target.type === 'number' 
     
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.value,
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
    urlParams.set('year',sidebardata.year);
    urlParams.set('city',sidebardata.city);
    urlParams.set('engine', sidebardata.engine);
    urlParams.set('capacity', sidebardata.capacity);
    urlParams.set('transmission', sidebardata.transmission);
    urlParams.set('wheeldrive', sidebardata.wheeldrive);
    urlParams.set('interior', sidebardata.interior);
    urlParams.set('registered', sidebardata.registered);
    urlParams.set('leasing', sidebardata.leasing);
    urlParams.set('foreignplates', sidebardata.foreignplates);
    urlParams.set('servicebook', sidebardata.servicebook);
    urlParams.set('customscleared', sidebardata.customscleared);
    urlParams.set('oldtimer', sidebardata.oldtimer);
    urlParams.set('damaged', sidebardata.damaged)
    urlParams.set('minPrice',sidebardata.minPrice);
    urlParams.set('maxPrice',sidebardata.maxPrice);
    urlParams.set('minMileage', sidebardata.minMileage);
    urlParams.set('maxMileage', sidebardata.maxMileage);
    urlParams.set('minkW',sidebardata.minkW);
    urlParams.set('maxkW',sidebardata.maxkW);
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

  const handleCheckboxClick = (checkboxId) => {
    setSidebardata((prevState) => ({
      ...prevState,
      searchTerm: '',
      cartype: '',
      brand: '',
      model: '',
      year: '',
      city: '',
      engine: '',
      capacity: '',
      transmission: '',
      wheeldrive: '',
      interior: '',
      registered: false,
      leasing: false,
      servicebook: false,
      foreignplates: false,
      customscleared: false,
      oldtimer: false,
      damaged: false,
      offer: false,
      minPrice: null,
      maxPrice: null,
      minMileage: null,
      maxMileage: null,
      minkW: null,
      maxkW: null,
    }));
    setSidebardata((prevState) => ({
      ...prevState,
      type: prevState.type === checkboxId ? prevState.type : checkboxId,
    }));
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
          onChange={() => handleCheckboxClick('all')}
          checked={sidebardata.type === 'all'}/>
        <label for="all" class="inline-flex items-center justify-between w-90  p-5 text-gray-500 bg-white border-2 
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
            <div className='flex gap-20'><GiCardboardBox style={{ fontSize: '3em'}}/><GiKeyCard style={{ fontSize: '3em'}}/><FaCar style={{ fontSize: '3em'}}/></div>
                <div className=" text-center text-2xl font-bold mt-1">Sve kategorije</div>
                
            </div>
        </label>
        </div>
          <div className='flex gap-2 flex-wrap items-center'>
           
          <div>
        <input type="checkbox" id="parts" value="" className="sr-only peer  border-amber-700" 
          onChange={() => handleCheckboxClick('parts')}
          checked={sidebardata.type === 'parts'}/>
        <label for="parts" className="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
            <div className='flex gap-1'><GiCardboardBox style={{ fontSize: '2em'}}/><FaScrewdriverWrench style={{ fontSize: '2em'}}/></div>
                <div className="text-center text-lg font-semibold mt-2">Dijelovi</div>
                
            </div>
        </label>
        </div>
            <div>
        <input type="checkbox" id="rent" value="" className="sr-only peer  border-amber-700" 
         onChange={() => handleCheckboxClick('rent')}
         checked={sidebardata.type === 'rent'}/>
        <label for="rent" className="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block ">
                <GiKeyCard className='mx-auto' style={{fontSize: '2em '}}/>
                <div className="text-center text-lg font-semibold mt-2">Rentanje</div>
                
            </div>
        </label>
        </div>

            <div>
        <input type="checkbox" id="sale" value="" className="sr-only peer  border-amber-700" 
          onChange={() => handleCheckboxClick('sale')}
          checked={sidebardata.type === 'sale'}/>
        <label for="sale" class="inline-flex items-center justify-between  p-5 text-gray-500 bg-white border-2
         border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600
          dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50
           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <FaCar className='mx-auto' style={{ fontSize: '2em'}}/> 
                <div class="text-center text-lg font-semibold mt-2">Prodaja</div>
                
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
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Samo oglasi sa popustom na duže rentanje</span>
            </label>
            </div>)}

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
               <option value='' disabled>
              Odaberite kategoriju
            </option>
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
               <option value='' disabled>
              Odaberite tip vozila
            </option>
             <option>
                Limuzina
            </option>
            <option>
                Hečbek
            </option>
            <option>
                Pickup
            </option>
            <option>
                Sedan
            </option>
            <option>
                SUV
            </option>
            <option>
                Karavan
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
              Odaberite brend
            </option>
            {sidebardata.type ==='parts' && (
              <option>
                Svi brendovi
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
              {sidebardata.brand ? 'Odaberite model' : 'Odaberite prvo brend'}
            </option>
            {sidebardata.type ==='parts' && (
              <option>
                Svi modeli
              </option>
            )}
            {brandModelData[sidebardata.brand] &&
              brandModelData[sidebardata.brand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
          <select
            type='number'        
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='year'
            onChange={handleDateChange}
            value={sidebardata.year}
      >
            <option  disabled>
             Godina prve registracije
            </option>
           {generateYearOptions()}
           </select>

           <select
            type="text"
            className='mt-3.5 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id="city"
            onChange={handleCityChange}
            value={sidebardata.city}
        >
            {cities.CITIES.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
        </select>
        
        <select
            type='text'
            className='block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='engine'
            onChange={handleEngineTypeChange}
            value={sidebardata.engine}
          >  
          <option value="" disabled hidden>Tip motora</option>
          {sidebardata.type ==='parts' && (
              <option>
                Svi tipovi motora
              </option>
            )}
            <option >
              E-V
            </option>  
            <option >
              Dizel
            </option>  
            <option >
              Benzin
            </option>  
            <option >
              Hibrid
            </option>  
          </select>
          <select
            type='text'
            className='block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='capacity'
            onChange={handleCapacityChange}
            value={sidebardata.capacity}
          >
              
              <option value='' disabled >
              Zapremina motora
            </option>  
            {sidebardata.type ==='parts' && (
              <option>
              Sve zapremine
              </option>
            )}
            {generateEngineSizeOptions()}
          </select>

          <select
            type='text'
            className='block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='transmission'
            onChange={handleTransmissionChange}
            value={sidebardata.transmission}
          >
             <option value="" disabled hidden>Tip mjenjača</option>
             {sidebardata.type ==='parts' && (
              <option>
                Svi tipovi
              </option>
            )}
            <option >
            Automatik
            </option>  
            <option >
             Manuelni
            </option>  
          </select>

          <select
            type='text'
            className='block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='wheeldrive'
            onChange={handleWheelDriveChange}
            value={sidebardata.wheeldrive}
          >
             <option value="" disabled hidden>Pogon</option>
             
             {sidebardata.type ==='parts' && (
              <option>
                Svi pogoni
              </option>
            )}
             <option >
            RWD
            </option> 
            <option >
            FWD
            </option>  
            <option >
            AWD
            </option>  
            <option >
            4WD
            </option>
          </select>
          {(sidebardata.type === 'sale' || sidebardata.type === 'rent' || sidebardata.cartype === 'Unutrašnja oprema') && (
          <select
            type='text'
            className='block py-2.5 px-0  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='interior'
            onChange={handleInteriorChange}
            value={sidebardata.interior}
            
          >
             <option value="" disabled hidden>Tip interijera</option>
             <option>
                Koža
            </option>
            <option>
                Vinil
            </option>
            <option>
                Alkantara
            </option>
            <option>
                Poliester
            </option>
            <option>
                Imitacija kože
            </option> 
            
          </select>)}
          
          <div className='flex gap-6 items-center '>
        <div className='relative '>
            <input type="number" 
            id='minPrice'
            onChange={handleChange}
            value={sidebardata.minPrice}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Cijena od[BAM]</label>
        </div>
        <div className='relative '>
            <input type="number" 
            id='maxPrice'
            onChange={handleChange}
            value={sidebardata.maxPrice}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Cijena do[BAM]</label>
        </div>
          </div>
          {sidebardata.type ==='sale' && (
        <div className='flex gap-6 items-center '>
        <div className='relative '>
            <input type="number" 
            id='minMileage'
            onChange={handleChange}
            value={sidebardata.minMileage}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Kilometri od</label>
        </div>
        <div className='relative '>
            <input type="number" 
            id='maxMileage'
            onChange={handleChange}
            value={sidebardata.maxMileage}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Kilometri do</label>
        </div>
          </div>)}
          {(sidebardata.type ==='sale' || sidebardata.type ==='rent') && (
          <div className='flex gap-6 items-center '>
        <div className='relative '>
            <input type="number" 
            id='minkW'
            onChange={handleChange}
            value={sidebardata.minkW}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Minimalna snaga</label>
        </div>
        <div className='relative '>
            <input type="number" 
            id='maxkW'
            onChange={handleChange}
            value={sidebardata.maxkW}
            className='max-w-36 block py-2.5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' placeholder=""/>

            <label  className=" absolute bottom-9 left-0 text-sm text-gray-500  mx-1 px-1 peer-placeholder-shown:top-3  peer-placeholder-shown:text-gray-500  peer-focus:-top-3">Maksimalna snaga</label>
        </div>
          </div>
          )}
          
          {sidebardata.type === 'sale' && (
          <div className='flex gap-2 flex-wrap max-w-56 '>
            <label className='font-semibold'>Ostalo:</label>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='registered'
                className='rounded-full bg-transparent'
                onChange={handleChange}
                checked={sidebardata.registered}
              />
              <span>Registrovani automobili</span>
            </div>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                id='leasing'
                className='rounded-full bg-transparent'
                onChange={handleChange}
                checked={sidebardata.leasing}
              />
              <span>Moguća kupovina na lizing</span>
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='customscleared'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.customscleared}
              />
              <span>Ocarinjen</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='foreignplates'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.foreignplates}
              />
              <span>Strane table</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='servicebook'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.servicebook}
              />
              <span>Posjeduje servisnu knjigu</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='oldtimer'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.olditmer}
              />
              <span>Oldtimer</span>
              
            </div>
            <div className='flex gap-2 items-center '>
              <input
                type='checkbox'
                id='damaged'
                className='rounded-full bg-transparent '
                onChange={handleChange}
                checked={sidebardata.damaged}
              />
              <span className='flex'>Oštećeni automobil</span>
              
            </div>
          </div>
          )}
          <button className='bg-sky-500 dark:bg-amber-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Pretraži
          </button>
        </form>
      </div>
      
      <div className='flex-1'>
        <h1 className='text-3xl font-bold border-b border-sky-500 dark:border-amber-700 p-3 dark:text-white mt-2  '>
          Rezultati pretrage:
          <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='ml-5 border-sky-500 dark:border-amber-600 rounded-lg p-3 bg-transparent'
            >
              <option class="bg-transparent dark:bg-slate-700" value='regularPrice_desc'>Cijena od visoke ka nižoj</option>
              <option class="bg-transparent dark:bg-slate-700" value='regularPrice_asc'>Cijena od niže ka višoj</option>
              <option class="bg-transparent dark:bg-slate-700" value='createdAt_desc'>Najnovije objave</option>
              <option class="bg-transparent dark:bg-slate-700" value='createdAt_asc'>Najstarije objave</option>
            </select>
        </h1>
            
           
          
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>Nije pronađen traženi oglas!</p>
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
              Prikaži više
            </button>
          )}
        </div>
      </div>
    </div>
  );
}