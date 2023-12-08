import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom' ;

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex  justify-between items-center max-w-6xl mx-auto p-3'>
        <Link  to="/">
        <h1 className='text-sm sm:text-xl font-bold flex flex-wrap'>
            <span className='text-slate-500 pr-1'>WAAN </span> 
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-100 rounded-lg  p-3 flex items-center'>
            <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholder='search...'/>
            <FaSearch  />
        </form>
        <ul className='flex gap-4'>
        <Link  to="/">
            <li className='hidden sm:inline font-semibold text-slate-700 hover:underline'>Home</li>
        </Link>
        <Link  to="/about"> 
        <li className='hidden sm:inline font-semibold text-slate-700 hover:underline'>About</li>
        </Link>
        <Link  to="/signin">
        <li className='text-slate-700 font-semibold hover:underline'>Sign In</li>
        </Link>
        </ul>
        </div>
       
    </header>
  )
}

export default Header