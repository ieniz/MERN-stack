
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
   
    <Navbar  className='border-2  shadow-xl rounded-none xl:rounded-b-full  border-sky-600 dark:border-amber-700'> 

    
        <Link to='/'>          
<h1 class="flex items-center text-sm sm:text-4xl font-extrabold dark:text-white">Mobile<img class="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 dark:grayscale:-0" src="/slike/auto.png" width="100" 
     height="100" ></img>    
<span class="bg-sky-100 text-blue-500  sm:text-2xl font-semibold  px-2.5 py-0.5 rounded dark:bg-amber-500 dark:text-black ">Rent&Sell</span></h1>
        </Link>
        
       
        <form className='mr-40'>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline  dark:text-white'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline  dark:text-white'>
              About
            </li>
          </Link>
          
          <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className=' text-slate-700 hover:underline dark:text-white'> Sign in</li>
            )}
            
               
          </Link>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())} >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
          
        </Button>
        </ul>
       
      
    
    </Navbar>
    
  );
}
