import { FaCar } from "react-icons/fa";
import { GiKeyCard , GiCarSeat, GiCardboardBox} from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { useFormHandlers } from "../functions/formHandlers.js";

import { CITIES } from '../constants/CITIES.js';
import { brandModelData } from '../constants/BrandModelData.js';

export default function CreateListing() {
    const {
        setFiles,
        formData,
        imageUploadError,
        uploading,
        error,
        loading,
        handleImageSubmit,
        handleRemoveImage,
        handleChange,
        handleBrandChange,
        handleModelChange,
        handleEngineTypeChange,
        handleDateChange,
        handleCapacityChange,
        handleTransmissionChange,
        handleWheelDriveChange,
        handleEmissionChange,
        handleCarTypeChange,
        handleInteriorChange,
        handleCityChange,
        generateYearOptions,
        generateEngineSizeOptions,
        handleSubmit,
    } = useFormHandlers();
    
    
    const divGroupedClasses = "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-amber-600\n" +
        "      rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white\n" +
        "      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5\n" +
        "      after:transition-all dark:border-gray-600 peer-checked:bg-sky-600 dark:peer-checked:bg-amber-500"

    const labelClasses = 'inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer \n' +
        '                      dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-amber-600 hover:text-gray-600 \n' +
        '                      dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
    
    const selectClasses = 'block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none\n' +
        '            dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'

  return (
      <main className="p-3 max-w-4xl mx-auto my-20">
          <h1 className="text-3xl font-extrabold text-center my-7">Create a Listing</h1>

          <h3 className="mb-5 text-lg font-mono font-medium text-gray-900 dark:text-white">
              Choose type of your listing
          </h3>

          <ul onSubmit={handleSubmit} className="grid w-full gap-6 md:grid-cols-3 mb-5">
              <li>
                  <input
                      type="checkbox"
                      id="sale"
                      value=""
                      className="hidden peer  border-amber-700"
                      required=""
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                  />
                  <label htmlFor="sale"
                      className={labelClasses}
                  >
                      <div className="block">
                          <FaCar style={{ fontSize: "2em" }} />
                          <div className="w-full text-lg font-semibold mt-1">Sell</div>
                          <div className="w-full text-sm">Sell your car</div>
                      </div>
                  </label>
              </li>
              <li>
                  <input
                      type="checkbox"
                      id="rent"
                      value=""
                      className="hidden peer"
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                  />
                  <label
                      htmlFor="rent"
                      className={labelClasses}
                  >
                      <div className="block">
                          <GiKeyCard style={{ fontSize: "2em" }} />
                          <div className="w-full text-lg font-semibold mt-1">Rent</div>
                          <div className="w-full text-sm">Rent your car</div>
                      </div>
                  </label>
              </li>
              <li>
                  <input
                      type="checkbox"
                      id="angular-option"
                      value=""
                      className="hidden peer"
                  />
                  <label
                      htmlFor="angular-option"
                      className={labelClasses}
                  >
                      <div className="block">
                          <div className="flex gap-7">
                              <GiCardboardBox style={{ fontSize: "2em" }} />
                              <GiCarSeat style={{ fontSize: "2em" }} />
                              <FaScrewdriverWrench style={{ fontSize: "2em" }} />
                          </div>

                          <div className="w-full text-lg font-semibold mt-1">Part</div>
                          <div className="w-full text-sm">
                              Sell accessories and parts of your car
                          </div>
                      </div>
                  </label>
              </li>
          </ul>

          <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 mb-10"
          >
              <div className="flex flex-col gap-4 ">
                  <select
                      type="text"
                      className={selectClasses}
                      id="cartype"
                      required
                      onChange={handleCarTypeChange}
                      value={formData.cartype}
                  >
                      <option>Limousine</option>
                      <option>Hatchback</option>
                      <option>Pickup</option>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Station wagon</option>
                  </select>
                  <select
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-sky-500 appearance-none
             dark:text-gray-400 dark:border-amber-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      id="brand"
                      required
                      onChange={handleBrandChange}
                      value={formData.brand}
                  >
                      <option value="" disabled>
                          Select Brand
                      </option>
                      {Object.keys(brandModelData).map((brand) => (
                          <option key={brand} value={brand}>
                              {brand}
                          </option>
                      ))}
                  </select>
                  <select
                      className={selectClasses}
                      id="model"
                      required
                      onChange={handleModelChange}
                      value={formData.model}
                      disabled={!formData.brand} //This disables model dropdown if no brand is selected
                  >
                      <option value="" disabled>
                          {formData.brand ? "Select Model" : "Select Brand First"}
                      </option>
                      {brandModelData[formData.brand] &&
                          brandModelData[formData.brand].map((model) => (
                              <option key={model} value={model}>
                                  {model}
                              </option>
                          ))}
                  </select>
                  <select
                      type="text"
                      className={selectClasses}
                      id="engine"
                      required
                      onChange={handleEngineTypeChange}
                      value={formData.engine}
                  >
                      <option>E-V</option>
                      <option>Diesel</option>
                      <option>Petrol</option>
                      <option>Hybrid</option>
                  </select>
                  <select
                      type="number"
                      className={selectClasses}
                      id="year"
                      required
                      onChange={handleDateChange}
                      value={formData.year}
                  >
                      <option value="" disabled>
                          Select Year
                      </option>
                      {generateYearOptions()}
                  </select>
              </div>

              <div className="flex flex-col gap-4 ">
                  <select
                      type="text"
                      className={selectClasses}
                      id="capacity"
                      required
                      onChange={handleCapacityChange}
                      value={formData.capacity}
                  >
                      <option>Electric or pick size below</option>
                      {generateEngineSizeOptions()}
                  </select>

                  <select
                      type="text"
                      className={selectClasses}
                      id="transmission"
                      required
                      onChange={handleTransmissionChange}
                      value={formData.transmission}
                  >
                      <option>Automatic</option>
                      <option>Manual</option>
                  </select>
                  <select
                      type="text"
                      className={selectClasses}
                      id="wheeldrive"
                      required
                      onChange={handleWheelDriveChange}
                      value={formData.wheeldrive}
                  >
                      <option>RWD</option>
                      <option>FWD</option>
                      <option>AWD</option>
                      <option>4WD</option>
                  </select>
                  <select
                      type="text"
                      className={selectClasses}
                      id="emission"
                      required
                      onChange={handleEmissionChange}
                      value={formData.emission}
                  >
                      <option>Euro 1</option>
                      <option>Euro 2</option>
                      <option>Euro 3</option>
                      <option>Euro 4</option>
                      <option>Euro 5</option>
                      <option>Euro 6</option>
                  </select>
                  <select
                      type="text"
                      className={selectClasses}
                      id="interior"
                      onChange={handleInteriorChange}
                      value={formData.interiortype}
                  >
                      <option>Leather</option>
                      <option>Vinyl</option>
                      <option>Alcantra</option>
                      <option>Polyester</option>
                      <option>Faux Leather</option>
                  </select>
              </div>
              <div className="flex-col flex-1">
                  <div className="flex flex-col flex-1 gap-3 mt-5">
                      <input
                          type="text"
                          placeholder="Name"
                          className="border p-3 rounded-lg border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white "
                          id="name"
                          maxLength="62"
                          minLength="10"
                          required
                          onChange={handleChange}
                          value={formData.name}
                      />
                      <textarea
                          type="text"
                          placeholder="Description"
                          className="border p-3 rounded-lg  border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white"
                          id="description"
                          required
                          onChange={handleChange}
                          value={formData.description}
                      />
                      <input
                          type="text"
                          placeholder="Address (Optional)"
                          className="border p-3 rounded-lg  border-sky-500 dark:border-amber-600 dark:bg-transparent dark:text-white"
                          id="address"
                          onChange={handleChange}
                          value={formData.address}
                      />
                  </div>
                  <div>
                      <select
                          type="text"
                          className={selectClasses}
                          id="city"
                          required
                          onChange={handleCityChange}
                          value={formData.city}
                      >
                            {CITIES.map((value, name) => (
                                <option key={value} value={value}>
                                    {name}
                                </option>
                            ))}
                      </select>
                  </div>
              </div>
          </form>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-4 flex-1 ">
                  {formData.type === "rent" && (
                      <div>
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="offer"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.offer}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 flex-wrap text-sm font-mono text-gray-700 dark:text-gray-300">
              Attract more guests by adding discount on longer rents)
            </span>
                          </label>
                      </div>
                  )}

                  <div className="gap-6 flex flex-wrap">
                      <div className="flex flex-wrap gap-6">
                          <div className="flex items-center gap-2">
                              <input
                                  type="number"
                                  id="seats"
                                  min="1"
                                  max="100"
                                  required
                                  className="p-3 border bg-transparent  border-gray-600 rounded-lg"
                                  onChange={handleChange}
                                  value={formData.seats}
                              />
                              <p>Seats</p>
                          </div>
                          <div className="flex items-center gap-2">
                              <input
                                  type="number"
                                  id="doors"
                                  min="2"
                                  max="6"
                                  className="p-3 border bg-transparent border-gray-600 rounded-lg"
                                  onChange={handleChange}
                                  value={formData.doors}
                              />
                              <div className="flex flex-col items-center">
                                  <p>Doors</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <input
                                  type="number"
                                  id="kW"
                                  min="1"
                                  max="50"
                                  required
                                  className="p-3 border bg-transparent border-gray-600 rounded-lg"
                                  onChange={handleChange}
                                  value={formData.kW}
                              />
                              <p>kW</p>
                          </div>
                          <div className="flex items-center gap-2">
                              <input
                                  type="number"
                                  id="mileage"
                                  min="0"
                                  max="5000000"
                                  className="p-3 border bg-transparent border-gray-600 rounded-lg"
                                  onChange={handleChange}
                                  value={formData.mileage}
                              />
                              <div className="flex flex-col items-center">
                                  <p>Mileage</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <input
                                  type="number"
                                  id="regularPrice"
                                  min="1"
                                  max="10"
                                  required
                                  className="p-3 border bg-transparent border-gray-600 rounded-lg"
                                  onChange={handleChange}
                                  value={formData.regularPrice}
                              />
                              <div className="flex flex-col items-center">
                                  <p>Regular price</p>
                                  {formData.type === "rent" && (
                                      <span className="text-xs">($ / day)</span>
                                  )}
                              </div>
                          </div>

                          {formData.offer && (
                              <div className="flex items-center gap-2">
                                  <input
                                      type="number"
                                      id="discountPrice"
                                      min="1"
                                      max="10"
                                      required
                                      className="p-3 border bg-transparent border-gray-600 rounded-lg"
                                      onChange={handleChange}
                                      value={formData.discountPrice}
                                  />
                                  <div className="flex flex-col items-center">
                                      <p>Discount</p>
                                      {formData.type === "rent" && (
                                          <span className="text-xs">($ / day)</span>
                                      )}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
                  <h2 className="font-mono text-gray-500 dark:text-zinc-300 ">Legal:</h2>

                  <div className="flex-wrap sm:flex gap-7 border-2 border-sky-500 dark:border-amber-700 rounded-md p-2  ">
                      <div>
                          {/* Registered */}
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="registered"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.registered}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
              Registered
            </span>
                          </label>
                      </div>
                      {/* Customs cleared */}
                      <div>
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="customscleared"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.customscleared}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
              Customs cleared
            </span>
                          </label>
                      </div>
                      {/* Foreign plates */}
                      <div>
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="foreignplates"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.foreignplates}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
              Foreign plates
            </span>
                          </label>
                      </div>
                      {/* Leasing */}
                      <div>
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="leasing"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.leasing}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
              Leasing
            </span>
                          </label>
                      </div>
                      {/* Service book */}
                      <div>
                          <label className="inline-flex items-center cursor-pointer">
                              <input
                                  type="checkbox"
                                  id="servicebook"
                                  className="sr-only peer"
                                  onChange={handleChange}
                                  checked={formData.servicebook}
                              />

                              <div
                                  className={divGroupedClasses}
                              ></div>
                              <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
              Service book
            </span>
                          </label>
                      </div>
                  </div>

                  <h2 className="font-mono text-gray-500 dark:text-zinc-300 ">Other:</h2>

                  <div className="flex-wrap sm:flex gap-16 border-2 border-sky-500 dark:border-amber-700 rounded-lg p-8 ">
                      <div>
                          {/* airconditioner */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="airconditioner"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.airconditioner}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Airconditioner
              </span>
                              </label>
                          </div>

                          {/* metallic */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="metallic"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.metallic}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Metallic
              </span>
                              </label>
                          </div>

                          {/* alloywheels */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="alloywheels"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.alloywheels}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Alloy wheels
              </span>
                              </label>
                          </div>

                          {/* digitalairconditioning */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="digitalairconditioning"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.digitalairconditioning}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Digital air conditioner
              </span>
                              </label>
                          </div>

                          {/* steeringwheelcontrols */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="steeringwheelcontrols"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.steeringwheelcontrols}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Steering wheel controls
              </span>
                              </label>
                          </div>

                          {/* navigation */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="navigation"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.navigation}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Navigation
              </span>
                              </label>
                          </div>

                          {/* touchscreen */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="touchscreen"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.touchscreen}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Touchscreen
              </span>
                              </label>
                          </div>

                          {/* head-up display */}
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="headupdisplay"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.headupdisplay}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Head up display
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="usbport"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.usbport}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                USB port
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="cruisecontrol"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.cruisecontrol}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Cruise Control
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="bluetooth"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.bluetooth}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Bluetooth
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="carplay"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.carplay}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                CarPlay
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="rainsensor"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.rainsensor}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Rain Sensor
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="parkassist"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.parkassist}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Park Assist
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="lightsensor"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.lightsensor}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Light Sensor
              </span>
                              </label>
                          </div>
                      </div>
                      <div>
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="blindspotsensor"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.blindspotsensor}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Blind Spot Sensor
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="startstopsystem"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.startstopsystem}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Start-Stop System
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="hillassist"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.hillassist}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Hill Assist
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="seatmemory"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.seatmemory}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Seat Memory
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="seatmassage"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.seatmassage}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Seat Massage
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="seatheating"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.seatheating}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Seat Heating
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="seatcooling"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.seatcooling}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Seat Cooling
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="powerwindows"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.powerwindows}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Power Windows
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="powerseatadjustment"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.powerseatadjustment}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Power Seat Adjustment
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="armrest"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.armrest}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Armrest
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="panoramicroof"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.panoramicroof}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Panoramic Roof
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="sunroof"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.sunroof}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Sunroof
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="foglights"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.foglights}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Fog Lights
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="electricmirrors"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.electricmirrors}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Electric Mirrors
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="alarm"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.alarm}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Alarm
              </span>
                              </label>
                          </div>
                      </div>
                      <div>
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="centrallocking"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.centrallocking}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Central Locking
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="remoteunlocking"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.remoteunlocking}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Remote Unlocking
              </span>
                              </label>
                          </div>
                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="airbag"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.airbag}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Airbag
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="abs"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.abs}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                ABS
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="esp"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.esp}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                ESP
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="dpffapfilter"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.dpffapfilter}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                DPF/FAP Filter
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="powersteering"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.powersteering}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Power Steering
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="turbo"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.turbo}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Turbo
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="isofix"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.isofix}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                ISOFIX
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="towbar"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.towbar}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Tow Bar
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="damaged"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.damaged}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Damaged
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="adaptedforthedisabled"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.adaptedforthedisabled}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Adapted for the
              </span>
                              </label>
                          </div>

                          <div>
                              <label className="inline-flex items-center cursor-pointer">
                                  <input
                                      type="checkbox"
                                      id="oldtimer"
                                      className="sr-only peer"
                                      onChange={handleChange}
                                      checked={formData.oldtimer}
                                  />

                                  <div
                                      className={divGroupedClasses}
                                  ></div>
                                  <span className="ms-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                Oldtimer
              </span>
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
          <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex flex-col flex-1 gap-4">
                  <p className="font-semibold">
                      Images:
                      <span className="font-normal text-gray-600 ml-2">
          The first image will be the cover (max 6)
        </span>
                  </p>

                  <input
                      onChange={(e) => setFiles(e.target.files)}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                  />

                  <button
                      type="button"
                      disabled={uploading}
                      onClick={handleImageSubmit}
                      className="p-3 text-sky-700 border border-sky-700 rounded uppercase hover:shadow-lg disabled:opacity-80 dark:border-amber-400 dark:text-amber-700"
                  >
                      {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <p className="text-red-700 text-sm">
                      {imageUploadError && imageUploadError}
                  </p>
                  {formData.imageUrls.length > 0 &&
                      formData.imageUrls.map((url, index) => (
                          <div
                              key={url}
                              className="flex justify-between p-3 border items-center"
                          >
                              <img
                                  src={url}
                                  alt="listing image"
                                  className="w-20 h-20 object-contain rounded-lg"
                              />
                              <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                              >
                                  Delete
                              </button>
                          </div>
                      ))}
                  <button
                      disabled={loading || uploading}
                      className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                  >
                      {loading ? "Creating..." : "Create listing"}
                  </button>
                  {error && <p className="text-red-700 text-sm">{error}</p>}
              </div>
          </form>
      </main>
  );
}