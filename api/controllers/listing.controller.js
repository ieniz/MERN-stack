import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import brandModelData from '../../client/src/BrandModelData.js';


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
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent', 'parts'] };
      }
      
      let cartype = req.query.cartype;
  
      if (cartype === '' || cartype === undefined) {
        cartype = { $in: [ 
        'SUV' ,'Hatchback','Limousine','Pickup','Station wagon','Sedan',
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
      
      // Check if brand is not provided or is empty
      if (!brand) {
        // If not provided or empty, set brand to an array of brands
        brand = Object.keys(brandModelData);
      } else {
        // If provided, split brand string by comma and trim whitespace
        brand = brand.split(',').map(item => item.trim());
      }
      
      // Check if model is not provided or is empty
      if (!model) {
        // If not provided or empty, set model to an array of models from all brands
        model = Object.values(brandModelData).flat();
      } else {
        // If provided, split model string by comma and trim whitespace
        model = model.split(',').map(item => item.trim());
      }
      
      // Log the extracted brand and model for debugging (optional)
      console.log('Extracted brand:', brand);
      console.log('Extracted model:', model);
    
    
    
   
      
    

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
        type,
        cartype,
        brand,
        model,
        
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };