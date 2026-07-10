import {NavLink ,Link} from 'react-router-dom'
import { IoLogOutOutline } from 'react-icons/io5'
import { HiOutlineSun ,HiOutlineMoon ,HiOutlineBell } from 'react-icons/hi'
export const Navbar = ({onMenuToggle}) => {
    return (
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80  backdrop-blur-md  border-b border-gray-200 dark:border-gray-800" >
        <div className='flex items-center justify-between h-16 px-4 lg:px-6'>
          <div className='flex items-center gap-3'>
            <button onClick={onMenuToggle} className='lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'>
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16M4' />
              </svg>
            </button>
            <Link className='flex items-center gap-2 '>
              <div className='h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center'>
                <span className='text-white font-bold text-xl '>A</span>
              </div>
              <span className='text-xl font-bold text-gray-900 dark:text-white hedden sm:block'>ASTU WORK</span>
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <button className='p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors '>
              <HiOutlineMoon size={20} />
            </button>
            <Link className='hidden sm:flex  items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
              <div className='h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center '>
                <span className='text-primary-700 dark: text-primary-300 text-xl font-bold '>G</span>
              </div>
              <div className='text-left '>
                <p className='text-sm font-medium text-gray-900 dark:text-white'>Gedish</p>
                <p className='text-xs text-gray-500 capitalize '>User</p>
              </div>
            </Link>
            <button className='p-2 rounded-lg text-gray-600 hover:bg-red-500 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900/20' aria-label='logout'>
              <IoLogOutOutline size={20}/>
            </button>
          </div>
        </div>
      </header>
    );
}