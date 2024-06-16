import { useState, useEffect } from 'react'; //dodan useeffect
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom'; //useParams
import brandModelData from '../BrandModelData.js';
import cities  from '../CitiesModelData.js';
import { FaCar } from "react-icons/fa";
import { GiKeyCard , GiCarSeat, GiCardboardBox} from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import DatePicker from "react-multi-date-picker"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/red.css"
import "react-multi-date-picker/styles/layouts/mobile.css"




import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';


export default function CreateListing() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({

    imageUrls: [],
    name: '',
    description: '',
    city:'',
    address: '',
    type: 'rent',
    seats: 1,
    doors: 4,
    kW: 1,
    mileage: 1,
    regularPrice: 10,
    discountPrice: 0,
    offer: false,
    registered: false,
    airconditioner: false,
    model:'',
    brand:'',
    engine:'',
    year:'',
    capacity:'',
    transmission:'',
    wheeldrive:'',
    emission:'',
    cartype:'',
    interior:'',
    metallic: false,
    alloywheels: false,
    digitalairconditioning: false,
    steeringwheelcontrols: false,
    navigation: false,
    touchscreen: false,
    headupdisplay: false,
    usbport: false,
    cruisecontrol: false,
    bluetooth: false,
    carplay: false,
    rainsensor: false,
    parkassist: false,
    lightsensor: false,
    blindspotsensor: false,
    startstopsystem: false,
    hillassist: false,
    seatmemory: false,
    seatmassage: false,
    seatheating: false,
    seatcooling: false,
    powerwindows: false,
    powerseatadjustment: false,
    armrest: false,
    panoramicroof: false,
    sunroof: false,
    foglights: false,
    electricmirrors: false,
    alarm: false,
    centrallocking: false,
    remoteunlocking: false,
    airbag: false,
    abs: false,
    esp: false,
    dpffapfilter: false,
    powersteering: false,
    turbo: false,
    isofix: false,
    towbar: false,
    customscleared: false,
    foreignplates: false,
    leasing: false,
    servicebook: false,
    damaged: false,
    adaptedforthedisabled: false,
    oldtimer: false,
    createdBy:currentUser._id,
    reservations:[],

  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);



  const convertGetReservations= reservationsdates=>{
    return reservationsdates.map(r=>new Date(r) )
  }
  

  

  // umjesto console.log(formData); ide sljedece
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);
// dohvati podatke i setuj na podatke od listinga
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent'|| e.target.id === 'parts') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      
      e.target.id === 'registered' ||
      e.target.id === 'airconditioner' ||
      e.target.id === 'offer' ||
      e.target.id === 'metallic' ||
      e.target.id === 'alloywheels' ||
      e.target.id === 'digitalairconditioning' ||
      e.target.id === 'steeringwheelcontrols' ||
      e.target.id === 'navigation' ||
      e.target.id === 'touchscreen' ||
      e.target.id === 'headupdisplay' ||
      e.target.id === 'usbport' ||
      e.target.id === 'cruisecontrol' ||
      e.target.id === 'bluetooth' ||
      e.target.id === 'carplay' ||
      e.target.id === 'rainsensor' ||
      e.target.id === 'parkassist' ||
      e.target.id === 'lightsensor' ||
      e.target.id === 'blindspotsensor' ||
      e.target.id === 'startstopsystem' ||
      e.target.id === 'hillassist' ||
      e.target.id === 'seatmemory' ||
      e.target.id === 'seatmassage' ||
      e.target.id === 'seatheating' ||
      e.target.id === 'seatcooling' ||
      e.target.id === 'powerwindows' ||
      e.target.id === 'powerseatadjustment' ||
      e.target.id === 'armrest' ||
      e.target.id === 'panoramicroof' ||
      e.target.id === 'sunroof' ||
      e.target.id === 'foglights' ||
      e.target.id === 'electricmirrors' ||
      e.target.id === 'alarm' ||
      e.target.id === 'centrallocking' ||
      e.target.id === 'remoteunlocking' ||
      e.target.id === 'airbag' ||
      e.target.id === 'abs' ||
      e.target.id === 'esp' ||
      e.target.id === 'dpffapfilter' ||
      e.target.id === 'powersteering' ||
      e.target.id === 'turbo' ||
      e.target.id === 'isofix' ||
      e.target.id === 'towbar' ||
      e.target.id === 'customscleared' ||
      e.target.id === 'foreignplates' ||
      e.target.id === 'leasing' ||
      e.target.id === 'servicebook' ||
      e.target.id === 'damaged' ||
      e.target.id === 'adaptedforthedisabled' ||
      e.target.id === 'oldtimer'
          
      
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
   };
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFormData({
      ...formData,
      brand: selectedBrand,
      model: '', // Reset model when the brand changes
    });
   };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setFormData({
      ...formData,
      model: selectedModel,
    });
   };
  const handleInputChange = (fieldName, e) => {
    const selectedValue = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: selectedValue,
    });
};
  const handleDatesChange = dates => {
    setFormData({
      ...formData,
      reservations: dates,
    
    });
  }

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
const handleEmissionChange = (e) => {
  handleInputChange('emission', e);
};
const handleCarTypeChange = (e) => {
  handleInputChange('cartype', e);
};
const handleInteriorChange = (e) => {
  handleInputChange('interior', e);
};
const handleCityChange = (e) => {
  handleInputChange('city', e);
};

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1886; // Adjust the starting year based on your needs
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
  
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('Objavite sliku oglasa');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Cijena sa popustom mora biti niža od redovne cijene');
     
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
   
  };
  return (
    
    <main className='p-3 max-w-4xl mx-auto my-20'>
      <h1 className='text-3xl font-extrabold text-center my-7'>
        Ažuriranje oglasa
      </h1>
      
      


<ul onSubmit={handleSubmit} class="grid w-full gap-6 md:grid-cols-3 mb-5">
    <li>
        <input type="checkbox" id="sale" value="" className="hidden peer  border-amber-700" required=""
         onChange={handleChange}
         checked={formData.type === 'sale'}/>
        <label for="sale" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <FaCar style={{ fontSize: '2em'}}/>
                <div class="w-full text-lg font-semibold mt-1">Prodaja</div>
                <div class="w-full text-sm">Objavite Vaš automobil</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="rent" value="" className="hidden peer"
        onChange={handleChange}
        checked={formData.type === 'rent'}/>
        <label for="rent" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
            <GiKeyCard style={{ fontSize: '2em'}}/>
                <div class="w-full text-lg font-semibold mt-1">Rentanje</div>
                <div class="w-full text-sm">Rentanje Vašeg automobila</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="parts" value="" className="hidden peer"
        onChange={handleChange}
        checked={formData.type === 'parts'}/>
        <label for="parts" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-amber-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
              <div className='flex gap-7'><GiCardboardBox style={{ fontSize: '2em'}}/><GiCarSeat style={{ fontSize: '2em'}}/><FaScrewdriverWrench style={{ fontSize: '2em'}}/></div>
            
                <div class="w-full text-lg font-semibold mt-1">Dijelovi</div>
                <div class="w-full text-sm"> Dijelovi automobila i ostalo </div>
            </div>
        </label>
    </li>
</ul>


      
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 mb-10'>
        <div className='flex flex-col gap-4 '>
        <select
            type='text'
           
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='cartype'
            required
            onChange={handleCarTypeChange}
            value={formData.cartype}
          >
            <option value="" disabled hidden>Odaberite tip</option>
            {formData.type === 'parts' && (
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
            {(formData.type === 'sale' || formData.type ==='rent') && (
              <>
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
          
          </select>
          <select
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
             dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='brand'
            required
            onChange={handleBrandChange}
            value={formData.brand}
          >
            <option value='' disabled>
              Odaberite brend
            </option>
            {formData.type ==='parts' && (
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
            required
            onChange={handleModelChange}
            value={formData.model}
            disabled={!formData.brand} //This disables model dropdown if no brand is selected
          >
            <option value='' disabled>
              {formData.brand ? 'Odaberite model' : 'Odaberite brend'}
            </option>
            {formData.type ==='parts' && (
              <option>
                Svi modeli
              </option>
            )}
            {brandModelData[formData.brand] &&
              brandModelData[formData.brand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
          <select
            type='text'
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='engine'
            required
            onChange={handleEngineTypeChange}
            value={formData.engine}
          >  
          <option value="" disabled hidden>Tip motora</option>
          {formData.type ==='parts' && (
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
            type='number'        
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='year'
            required
            onChange={handleDateChange}
            value={formData.year}
      >
            <option value='' disabled>
             Godište
            </option>
           {generateYearOptions()}
           </select>
           
           </div>
           


          <div className='flex flex-col gap-4 '>
           <select
            type='text'
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='capacity'
            required
            onChange={handleCapacityChange}
            value={formData.capacity}
          >
              
            <option value='' disabled >
              Zapremina motora
            </option>  
            {formData.type ==='parts' && (
              <option>
                Sve zapremine
              </option>
            )}
            {generateEngineSizeOptions()}
          </select>
        
          <select
            type='text'
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='transmission'
            required
            onChange={handleTransmissionChange}
            value={formData.transmission}
          >
             <option value="" disabled hidden>Tip mjenjača</option>
             {formData.type ==='parts' && (
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
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='wheeldrive'
            required
            onChange={handleWheelDriveChange}
            value={formData.wheeldrive}
          >
             <option value="" disabled hidden>Pogon</option>
             {formData.type ==='parts' && (
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
          
          {(formData.type === 'sale' || formData.type === 'rent' ) && (<>
          <select
            type='text'
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='emission'
           
            onChange={handleEmissionChange}
            value={formData.emission}
          >
           
             <option value="" disabled hidden>Emisioni standard</option>
             
             <option >
            Euro 1
            </option> 
            <option >
            Euro 2
            </option>  
            <option >
            Euro 3
            </option>  
            <option >
            Euro 4
            </option>
            <option >
            Euro 5
            </option>  
            <option >
            Euro 6
            </option>
          </select>
            </>)}
          {(formData.type === 'sale' || formData.type === 'rent' || formData.cartype === 'Unutrašnja oprema') && (<>
          <select
            type='text'
            className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            id='interior'
            onChange={handleInteriorChange}
            value={formData.interiortype}
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
            
          </select>
         
          </>)}
          
          </div>  
          <div className='flex-col flex-1'>
          <div className='flex flex-col flex-1 gap-3 mt-5'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white '
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg  border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white whitespace-pre '
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
            
          />
          <input
            type='text'
            placeholder='Address (Optional)'
            className='border p-3 rounded-lg  border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          </div>
          <div >
          <select
          type="text"
          className='mt-3.5 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
          id="city"
          onChange={handleCityChange}
          value={formData.city}
        >
          {cities.CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
          </div>
          </div>
          </form>
                  
           
           
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        
        <div className='flex flex-col gap-4 flex-1 '>
          
        {formData.type ==='rent' && (
        <div >
        <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" id='offer' className="sr-only peer"
        onChange={handleChange}
        checked={formData.offer}/>
        
        <div class="relative  w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
        rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
        after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
        <span class="ms-3 flex-wrap text-sm font-mono text-gray-700 dark:text-gray-300 mr-10">Popust na duže rentanje</span>
        <p className=' font-mono text-gray-700 dark:text-gray-300 mr-5'>Odaberite koji datumi nisu dostupni:</p>
        </label>
        
        <DatePicker 
        className="bg-dark red rmdp-mobile"
        style={{
          backgroundColor: "transparent",
          height: "24px",
          borderRadius: "8px",
          fontSize: "14px",
          
        }}
            multiple
            value={convertGetReservations(formData.reservations)} 
            onChange={handleDatesChange}
            
          />
        </div>
           
           )}
           
          <div className='gap-6 flex flex-wrap'>
          <div className='flex flex-wrap gap-6'>
          {(formData.type === 'sale' || formData.type === 'rent') && (
           <>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='seats'
                min='1'
                max='100'
                className='p-3 border bg-transparent  border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.seats}
              />
              <p>Sjedišta</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='doors'
                min='2'
                max='6'
                className='p-3 border bg-transparent border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.doors}
              />
              <div className='flex flex-col items-center'>
                <p>Vrata</p>                             
              
              </div>
              
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='kW'
                min='1'
                max='50'
                className='p-3 border bg-transparent border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.kW}
              />
              <p>kW</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='mileage'
                min='0'
                max='5000000'
                className='p-3 border bg-transparent border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.mileage}
              />
              <div className='flex flex-col items-center'>
                <p>Kilometraža</p>                             
              
              </div>
             
            </div>
            </>
              )}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                className='p-3 border bg-transparent border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Cijena</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / dan)</span>
                )}
              </div>
              
            </div>
            
            {formData.offer && (
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                className='p-3 border bg-transparent border-gray-600 rounded-lg'
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Popust</p>
                {formData.type === 'rent' && (
                    <span className='text-xs'>($ / dan)</span>
                  )}
              </div>
            </div>
            )}
          </div> 
          </div>
          {(formData.type ==='rent' || formData.type === 'sale') && (
            <>
          <h2 className='font-mono text-gray-500 dark:text-zinc-300 '>Legalno:</h2>
         
          <div className='flex-wrap sm:flex gap-7 border-2 border-sky-500 dark:border-amber-700 rounded-md p-2  '>
            <div>
{/* Registered */}
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='registered' className="sr-only peer"
            onChange={handleChange}
            checked={formData.registered}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Registrovan</span>
            </label>
            </div>
{/* Customs cleared */}
            <div>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='customscleared' className="sr-only peer"
            onChange={handleChange}
            checked={formData.customscleared}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Ocarinjen</span>
            </label>
            </div>
{/* Foreign plates */}
            <div>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='foreignplates' className="sr-only peer"
            onChange={handleChange}
            checked={formData.foreignplates}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Strane table</span>
            </label>
            </div>
{/* Leasing */}
            <div>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='leasing' className="sr-only peer"
            onChange={handleChange}
            checked={formData.leasing}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Lizing</span>
            </label>
            </div>
{/* Service book */}
            <div>
            <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id='servicebook' className="sr-only peer"
            onChange={handleChange}
            checked={formData.servicebook}/>
            
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
            <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Servisna knjiga</span>
            </label>
            </div>
            </div>


            <h2 className='font-mono text-gray-500 dark:text-zinc-300 '>Ostalo:</h2>

 <div className='flex-wrap sm:flex gap-16 border-2 border-sky-500 dark:border-amber-700 rounded-lg p-8 '>

            <div>
              
{/* airconditioner */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='airconditioner' className="sr-only peer"
      onChange={handleChange}
      checked={formData.airconditioner}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Klima</span>
  </label>
</div>

{/* metallic */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='metallic' className="sr-only peer"
      onChange={handleChange}
      checked={formData.metallic}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Metalik</span>
  </label>
</div>

{/* alloywheels */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='alloywheels' className="sr-only peer"
      onChange={handleChange}
      checked={formData.alloywheels}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Alu felge</span>
  </label>
</div>

{/* digitalairconditioning */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='digitalairconditioning' className="sr-only peer"
      onChange={handleChange}
      checked={formData.digitalairconditioning}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Digitalna klima</span>
  </label>
</div>
         
{/* steeringwheelcontrols */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='steeringwheelcontrols' className="sr-only peer"
      onChange={handleChange}
      checked={formData.steeringwheelcontrols}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Komande na volanu</span>
  </label>
</div>


{/* navigation */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='navigation' className="sr-only peer"
      onChange={handleChange}
      checked={formData.navigation}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Navigacija</span>
  </label>
</div>

{/* touchscreen */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='touchscreen' className="sr-only peer"
      onChange={handleChange}
      checked={formData.touchscreen}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Touchscreen</span>
  </label>
</div>

{/* head-up display */}
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='headupdisplay' className="sr-only peer"
      onChange={handleChange}
      checked={formData.headupdisplay}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Head-up displej</span>
  </label>
</div>
 

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='usbport' className="sr-only peer"
      onChange={handleChange}
      checked={formData.usbport}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">USB port</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='cruisecontrol' className="sr-only peer"
      onChange={handleChange}
      checked={formData.cruisecontrol}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Tempomat</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='bluetooth' className="sr-only peer"
      onChange={handleChange}
      checked={formData.bluetooth}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Bluetooth</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='carplay' className="sr-only peer"
      onChange={handleChange}
      checked={formData.carplay}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">CarPlay</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='rainsensor' className="sr-only peer"
      onChange={handleChange}
      checked={formData.rainsensor}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Senzor kiše</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='parkassist' className="sr-only peer"
      onChange={handleChange}
      checked={formData.parkassist}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Park Assist</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='lightsensor' className="sr-only peer"
      onChange={handleChange}
      checked={formData.lightsensor}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Senzor auto svijetla</span>
  </label>
</div>
</div>  
<div>
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='blindspotsensor' className="sr-only peer"
      onChange={handleChange}
      checked={formData.blindspotsensor}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Senzor mrtvog ugla</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='startstopsystem' className="sr-only peer"
      onChange={handleChange}
      checked={formData.startstopsystem}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Start-Stop Sistem</span>
  </label>
</div>

            
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='hillassist' className="sr-only peer"
      onChange={handleChange}
      checked={formData.hillassist}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Hill Assist</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='seatmemory' className="sr-only peer"
      onChange={handleChange}
      checked={formData.seatmemory}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Memorija sjedišta</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='seatmassage' className="sr-only peer"
      onChange={handleChange}
      checked={formData.seatmassage}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Masaža sjedišta</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='seatheating' className="sr-only peer"
      onChange={handleChange}
      checked={formData.seatheating}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Grijanje siceva</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='seatcooling' className="sr-only peer"
      onChange={handleChange}
      checked={formData.seatcooling}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Hlađenje siceva</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='powerwindows' className="sr-only peer"
      onChange={handleChange}
      checked={formData.powerwindows}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">El. podizači stakala</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='powerseatadjustment' className="sr-only peer"
      onChange={handleChange}
      checked={formData.powerseatadjustment}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">El. pomjeranje sjedišta</span>
  </label>
</div>


<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='armrest' className="sr-only peer"
      onChange={handleChange}
      checked={formData.armrest}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Naslon za ruku</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='panoramicroof' className="sr-only peer"
      onChange={handleChange}
      checked={formData.panoramicroof}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Šiber</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='sunroof' className="sr-only peer"
      onChange={handleChange}
      checked={formData.sunroof}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Panorama krov</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='foglights' className="sr-only peer"
      onChange={handleChange}
      checked={formData.foglights}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Maglenke</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='electricmirrors' className="sr-only peer"
      onChange={handleChange}
      checked={formData.electricmirrors}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Električni retrovizori</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='alarm' className="sr-only peer"
      onChange={handleChange}
      checked={formData.alarm}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Alarm</span>
  </label>
</div>
</div>
<div>
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='centrallocking' className="sr-only peer"
      onChange={handleChange}
      checked={formData.centrallocking}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Centralna brava</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
   <input type="checkbox" id='remoteunlocking' className="sr-only peer"
      onChange={handleChange}
      checked={formData.remoteunlocking}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Daljinsko otključavanje</span>
  </label>
</div>
<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='airbag' className="sr-only peer"
      onChange={handleChange}
      checked={formData.airbag}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Airbag</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='abs' className="sr-only peer"
      onChange={handleChange}
      checked={formData.abs}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">ABS</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='esp' className="sr-only peer"
      onChange={handleChange}
      checked={formData.esp}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">ESP</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='dpffapfilter' className="sr-only peer"
      onChange={handleChange}
      checked={formData.dpffapfilter}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">DPF/FAP Filter</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='powersteering' className="sr-only peer"
      onChange={handleChange}
      checked={formData.powersteering}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Servo volan</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='turbo' className="sr-only peer"
      onChange={handleChange}
      checked={formData.turbo}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Turbo</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='isofix' className="sr-only peer"
      onChange={handleChange}
      checked={formData.isofix}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">ISOFIX</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='towbar' className="sr-only peer"
      onChange={handleChange}
      checked={formData.towbar}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Kuka</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='damaged' className="sr-only peer"
      onChange={handleChange}
      checked={formData.damaged}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Oštećen</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='adaptedforthedisabled' className="sr-only peer"
      onChange={handleChange}
      checked={formData.adaptedforthedisabled}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Prilagođen invalidima</span>
  </label>
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" id='oldtimer' className="sr-only peer"
      onChange={handleChange}
      checked={formData.oldtimer}/>
    
    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600 
      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"></div>
    <span class="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">Oldtimer</span>
  </label>
</div></div>

    </div>
    </>
)}             
    </div>


        
       
      </form>
      <form onSubmit={handleSubmit} className='mt-5'>
      <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Slike:
          <span className='font-normal text-gray-600 ml-2'>Prva slika je naslovna (max 6)</span>
          </p>
                
            <input 
              onChange={(e) => setFiles(e.target.files)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file" 
              id="images" 
              accept='image/*' 
              multiple
              placeholder='lkasdj'
             />

            <button 
             type='button'
             disabled={uploading}
             onClick={handleImageSubmit}
             className='p-3 text-sky-700 border border-sky-700 rounded uppercase hover:shadow-lg disabled:opacity-80 dark:border-amber-400 dark:text-amber-700'
             
             >{uploading ? 'Postavljanje...' : 'Postavi'}
             
              
              </button>
              <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
              </p>
            {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Obriši
                </button>
              </div>
            ))}
        <button
         disabled={loading || uploading}
         className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          
          {loading ? 'Ažuriranje...' : 'Ažuriraj'}</button>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          
        </div>
        </form>
        
    </main>
  );
}