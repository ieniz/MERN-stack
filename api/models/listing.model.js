import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    kW: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    airconditioner: {
      type: Boolean,
      required: true,
    },
    registered: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    engine:{
      type: String,
      required: true,

    },
    year:{
      type: String,
      required: true,

    },
    capacity:{
      type: String,
      required: true,

    },
    transmission:{
      type: String,
      required: true,

    },
    wheeldrive:{
      type: String,
      required: true,

    },
    emission:{
      type: String,
      required: true,

    },
    cartype:{
      type: String,
      required: true,

    },
    interior:{
      type: String,
      required: true,

    },
    metallic: {
      type: Boolean,
      required: false,
    },
    alloywheels: {
      type: Boolean,
      required: false,
    },
    digitalairconditioning: {
      type: Boolean,
      required: false,
    },
    steeringwheelcontrols: {
      type: Boolean,
      required: false,
    },
    navigation: {
      type: Boolean,
      required: false,
    },
    touchscreen: {
      type: Boolean,
      required: false,
    },
    headupdisplay: {
      type: Boolean,
      required: false,
    },
    usbport: {
      type: Boolean,
      required: false,
    },
    cruisecontrol: {
      type: Boolean,
      required: false,
    },
    bluetooth: {
      type: Boolean,
      required: false,
    },
    carplay: {
      type: Boolean,
      required: false,
    },
    rainsensor: {
      type: Boolean,
      required: false,
    },
    parkassist: {
      type: Boolean,
      required: false,
    },
    lightsensor: {
      type: Boolean,
      required: false,
    },
    blindspotsensor: {
      type: Boolean,
      required: false,
    },
    startstopsystem: {
      type: Boolean,
      required: false,
    },
    hillassist: {
      type: Boolean,
      required: false,
    },
    seatmemory: {
      type: Boolean,
      required: false,
    },
    seatmassage: {
      type: Boolean,
      required: false,
    },
    seatheating: {
      type: Boolean,
      required: false,
    },
    seatcooling: {
      type: Boolean,
      required: false,
    },
    powerwindows: {
      type: Boolean,
      required: false,
    },
    powerseatadjustment: {
      type: Boolean,
      required: false,
    },
    armrest: {
      type: Boolean,
      required: false,
    },
    panoramicroof: {
      type: Boolean,
      required: false,
    },
    sunroof: {
      type: Boolean,
      required: false,
    },
    foglights: {
      type: Boolean,
      required: false,
    },
    electricmirrors: {
      type: Boolean,
      required: false,
    },
    alarm: {
      type: Boolean,
      required: false,
    },
    centrallocking: {
      type: Boolean,
      required: false,
    },
    remoteunlocking: {
      type: Boolean,
      required: false,
    },
    airbag: {
      type: Boolean,
      required: false,
    },
    abs: {
      type: Boolean,
      required: false,
    },
    esp: {
      type: Boolean,
      required: false,
    },
    dpffapfilter: {
      type: Boolean,
      required: false,
    },
    powersteering: {
      type: Boolean,
      required: false,
    },
    turbo: {
      type: Boolean,
      required: false,
    },
    isofix: {
      type: Boolean,
      required: false,
    },
    towbar: {
      type: Boolean,
      required: false,
    },
    customscleared: {
      type: Boolean,
      required: false,
    },
    foreignplates: {
      type: Boolean,
      required: false,
    },
    leasing: {
      type: Boolean,
      required: false,
    },
    servicebook: {
      type: Boolean,
      required: false,
    },
    damaged: {
      type: Boolean,
      required: false,
    },
    adaptedforthedisabled: {
      type: Boolean,
      required: false,
    },
    oldtimer: {
      type: Boolean,
      required: false,
    },
    

    
    
  
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;