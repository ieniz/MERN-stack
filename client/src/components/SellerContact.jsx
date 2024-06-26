import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SellerContact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Kontaktirajte <span className='font-semibold '>{landlord.username}</span>{' '}
            za{' '}
            <span className='font-semibold capitalize'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Unesite poruku...'
            className='w-full border p-3 rounded-lg text-black'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-sky-600 dark:bg-amber-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Pošaljite mail          
          </Link>
        </div>
      )}
    </>
  );
}