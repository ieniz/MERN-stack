import { Footer, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsGithub,  BsGooglePlay, BsApp, BsApple, } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-4 border-sky-600 dark:border-amber-700'>
      <div className='w-full max-w-7xl mx-auto'>
     
        <div className ='flex justify-between hiden sm:flex'>


<div>        <Footer.Title title="Company" />
            
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Brand Center</Footer.Link>
              
            
               </div>      

                <div>  
                <Footer.Title title='Download' />
                <Footer.Link href='#'>Android</Footer.Link>
                <Footer.Link href='#'>IOS</Footer.Link>
                
                </div>
                
                <div>   
               <Footer.Title title="help center" />                   
               <Footer.Link href="#">Discord Server</Footer.Link>             
               <Footer.Link href="#">Contact Us</Footer.Link>            
               </div>
            

                <div> 
                <Footer.Title title='Legal' />
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link></div>
              
                </div>
  
  
          
            
        
        <Footer.Divider />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Eniz Ičanović"
            year={new Date().getFullYear()}
          />
          <h1 className="flex items-center text-sm sm:text-2xl font-extrabold dark:text-white">Mobile
          <img className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 dark:grayscale:-0" src="/slike/auto.png" width="100"height="100" ></img>    
          <span className="bg-blue-100 text-blue-800  text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-amber-500 dark:text-black ms-2">Rent&Sell</span></h1>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsGooglePlay}/>
            <Footer.Icon href='#' icon={BsApple}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='https://github.com/ieniz/MERN-stack' icon={BsGithub}/>
           
            </div>
          
        </div>
      </div>
    </Footer>
    
  );
}