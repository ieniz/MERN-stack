
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
   
    <Navbar  className='border-2  shadow-xl rounded-none  xl:rounded-b-full  border-sky-600 dark:border-amber-700'> 

    
  
      
          <Link to='/' className='lg:ml-10'>          
<h1 className="text-xl sm:text-4xl flex  items-center  font-extrabold  dark:text-white">Mobile<img class="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 dark:grayscale:-0" src="/slike/auto.png" width="100" 
     height="100" ></img>    
<span className="bg-sky-100  text-blue-500  sm:text-2xl font-semibold  px-2.5 py-0.5 rounded dark:bg-amber-500 dark:text-black ">Rent&Sell</span></h1>
        </Link>
       
       
     
         <form className='mr-10 '>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
         </form>
      
      <Button className='w-12 h-10 mr-10  lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      

      
        <ul className='flex gap-4 mr-10 '>
          <Link to='/'>
            <li className='relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white bg-sky-200 dark:bg-gray-800 rounded-lg group'>
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 dark:bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span class="relative">Home</span>
            </li>
          </Link>
         
          <Link to='/about'>
          <li className='relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white bg-sky-200 dark:bg-gray-800 rounded-lg group'>
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-500 dark:bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span class="relative">About</span>
            </li>
          </Link>
          
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-10 w-10 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='relative inline-flex items-center justify-center px-2 py-2 overflow-hidden font-mono font-bold tracking-tighter text-sky-700 hover:text-white dark:text-white bg-sky-200 dark:bg-gray-800 rounded-lg group'>
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
