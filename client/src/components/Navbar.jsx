import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  }
  return (
    <div className='shadow bg-white'>
      <nav className='flex item-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to="/">
          <img src="/logo.svg" alt="logo" className='brightness-0' />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className='max-sm:hidden'>Hi {user?.name}</p>
          <button onClick={logoutUser} className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full sctive:scale-95 transition-all">Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;