import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import INITIAL_FORM_STATE from "../constants/INITIAL_FORM_STATE.js";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase.js";
import RADIO_BUTTON_IDS from "../constants/RADIO_BUTTON_IDS.js";

export function useFormHandlers(){

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState( INITIAL_FORM_STATE );
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

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
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (  RADIO_BUTTON_IDS.includes(e.target.id ) ) {
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
                return setError('You must upload at least one image');
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
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

    }

    return {
        currentUser,
        navigate,
        files,
        setFiles,
        formData,
        setFormData,
        imageUploadError,
        setImageUploadError,
        uploading,
        setUploading,
        error,
        setError,
        loading,
        setLoading,
        handleImageSubmit,
        handleRemoveImage,
        handleChange,
        handleBrandChange,
        handleModelChange,
        handleInputChange,
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
    };
}