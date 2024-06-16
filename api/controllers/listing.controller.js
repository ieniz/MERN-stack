import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import brandModelData from '../../client/src/BrandModelData.js';
import cities from '../../client/src/CitiesModelData.js';



export const createListing = async (req, res, next) => {
  try {
    console.log(req.body)
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('createdBy');
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
  
  }


  export const getListings = async (req, res, next) => {
    try {
      
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

      let offer = req.query.offer;      
      
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let customscleared = req.query.customscleared;
  
      if (customscleared === undefined || customscleared === 'false') {
        customscleared = { $in: [false, true] };
      }

      let foreignplates = req.query.foreignplates;
  
      if (foreignplates === undefined || foreignplates === 'false') {
        foreignplates = { $in: [false, true] };
      }

      let servicebook = req.query.servicebook;
  
      if (servicebook === undefined || servicebook === 'false') {
        servicebook = { $in: [false, true] };
      }
      
      let leasing = req.query.leasing;
  
      if (leasing === undefined || leasing === 'false') {
        leasing= { $in: [false, true] };
      }
  
      let registered = req.query.registered;
  
      if (registered === undefined || registered === 'false') {
        registered = { $in: [false, true] };
      }

      let oldtimer= req.query.oldtimer;
  
      if (oldtimer === undefined || oldtimer === 'false') {
        oldtimer = { $in: [false, true] };
      }

      let damaged = req.query.damaged;
  
      if (damaged === undefined || damaged === 'false') {
        damaged = { $in: [false, true] };
      }

      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent', 'parts'] };
      }
      
      let cartype = req.query.cartype;
  
      if (cartype === '' || cartype === undefined) {
        cartype = { $in: [ 
        'SUV', 'Hečbek', 'Limuzina', 'Pickup', 'Karavan', 'Sedan',
        'Mali servis - Filteri',
        'Kaišni prenos/ Remenje / Veliki servis',
        'Senzori',
        'Delovi za servisiranje/pregled/održavanje',
        'Karoserija',
        'Hlađenje/Grijanje/ventilacija/elektronika klime',
        'Kvačilo/Zamajac/priključni dijelovi kvačila',
        'Motor',
        'Pogon točkova/Poluosovina',
        'Sigurnosni sistemi',
        'Unutrašnja oprema',
        'Elektrika',
        'Informacioni/komunikacioni sistemi',
        'Luksuzna oprema',
        'Sistem upravljanja',
        'Sistem zaključavanja',
        'Izduvni sistem',
        'Kočioni sistem, diskovi i plocice',
        'Opruge/ Amortizeri',
        'Sistem za dovod goriva/Priprema goriva',
        'Hibridni/električni pogon',
        'Kompresorski agregat',
        'Mjenjač/dijelovi za mjenjač',
        'Osovinski pogon',
        'Sistem za paljenje/bobina,svjećice,grijači',
        'Točkovi/Pneumatici',
        'Vješanje/Seleni/ Glavčina točka/ Ležajevi'] };
      }

      let brand = req.query.brand;
      let model = req.query.model;

      if (!brand || brand === 'Svi brendovi') {
        // If brand is not provided or "Any brand" is selected
        brand = ['Svi brendovi', ...Object.keys(brandModelData)];
      } else {
        // Splitting brand string by comma and trim whitespace
        brand = brand.split(',').map(item => item.trim());
      }

      if (!model || model === 'Svi modeli') {
        // If model is not provided or "Any model" is selected
        model = ['Svi modeli', ...Object.values(brandModelData).flat()];
      } else {
        // Splitting model string by comma and trim whitespace
        model = model.split(',').map(item => item.trim());
      }
      

      let city = req.query.city;
      if (!city) {
          city = Object.values(cities).flat();
      } else {
          // Splitting model string by comma and trim whitespace
          city = city.split(',').map(item => item.trim());
      }
      
      let year = req.query.year;
      const startYear = 1896;
      const endYear = 2024; 

      
      const allYears = Array.from({ length: endYear - startYear + 1 }, (_, index) => (startYear + index).toString());

      
      if (year === undefined || year === '') {
        year = { $in: allYears};
      }

      let engine = req.query.engine;
  
      if (engine === undefined || engine === '') {
        engine = { $in: ['E-V', 'Dizel', 'Benzin','Hibrid','Svi tipovi motora'] };
      }
    

      const startSize = 0.6;
      const endSize = 7.5;
      const increment = 0.1;
      const enginesizes = ['Sve zapremine'];
      
      for (let i = startSize; i <= endSize; i += increment) {
          enginesizes.push(i.toFixed(1));
      }
      

      let capacity = req.query.capacity;
  
      if (capacity === undefined || capacity === '') {
        capacity = { $in: enginesizes };
      }
      
      let transmission = req.query.transmission;
  
      if (transmission === undefined || transmission === '') {
        transmission = { $in: ['Automatik', 'Manuelni','Svi tipovi'] };
      }

      let wheeldrive = req.query.wheeldrive;
  
      if (wheeldrive=== undefined || wheeldrive === '') {
        wheeldrive = { $in: ['AWD', '4WD', 'RWD','FWD','Svi pogoni'] };
      }

      let interior = req.query.interior;

      if (interior === undefined || interior === '') {
        interior = { $exists: true }; // Include listings where the interior is defined
      } else {
        interior = { $in: ['Alkantara', 'Poliester', 'Imitacija kože', 'Vinil', 'Koža'] };
      }
     
     
      const minPrice = parseFloat(req.query.minPrice) || 0;
      const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
      
      const minMileage = parseFloat(req.query.minMileage) || 0;
      const maxMileage = parseFloat(req.query.maxMileage) || Number.MAX_SAFE_INTEGER;

      const minkW = parseFloat(req.query.minkW) || 0;
      const maxkW = parseFloat(req.query.maxkW) || Number.MAX_SAFE_INTEGER;

      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        customscleared,
        leasing,
        servicebook,
        foreignplates,
        registered,
        damaged,
        oldtimer,
        type,
        cartype,
        brand,
        model,
        year,
        city,
        engine,
        capacity,
        transmission,
        wheeldrive,
        interior,
        regularPrice: { $gte: minPrice, $lte: maxPrice },
        mileage: { $gte: minMileage, $lte: maxMileage },
        kW: { $gte: minkW, $lte: maxkW }
        
       
        
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };