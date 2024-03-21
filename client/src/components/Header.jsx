
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



  return (
   
    <Navbar  className=' shadow-xl rounded-none  xl:rounded-b-3xl   bg-gradient-to-t from-transparent via-transparent dark:to-gray-950'> 
    
      
          <Link to='/' className='lg:ml-10'>          
<h1 className="text-xl sm:text-4xl flex  items-center  font-extrabold  dark:text-white">Mobile<img class="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 dark:grayscale:-0" src="/slike/auto.png" width="100" 
     height="100" ></img>    
<span className="bg-sky-300  text-blue-800  sm:text-2xl font-semibold  px-2.5 py-0.5 rounded dark:bg-amber-600 dark:text-black ">Rent&Sell</span></h1>
        </Link>
       
       
     
         <form 
         onSubmit={handleSubmit}
         className='mr-10 '
         >

        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />

         </form>
      
         <Button type="submit"
          onClick={handleSubmit} className='w-12 h-10 mr-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
      

      
        <ul className='flex gap-4 mr-10 '>
          <Link to='/'>
            <li className='relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white dark:bg-gray-800 rounded-lg group'>
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 dark:bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span class="relative">Home</span>
            </li>
          </Link>
         
          <Link to='/about'>
          <li className='relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white dark:bg-gray-800 rounded-lg group'>
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 dark:bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span class="relative">About</span>
            </li>
          </Link>
          
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-10 w-10 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='relative inline-flex items-center justify-center px-2 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white dark:bg-gray-800 rounded-lg group'>
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 dark:bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
  <span class="relative">Sign In</span>
              </li>
            )}
            
               
          </Link>
          <Button className='w-12 h-10' color='gray' pill onClick={() => dispatch(toggleTheme())} >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
          
        </Button>
        </ul>
       
      
        
    </Navbar>
    
  );
}
