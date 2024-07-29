import './App.css';
import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Header from './component/header/header';
import Main from './component/main/main';
import Footer from './component/footer/footer';
import SignIn from './component/crud/SignIn';
import Dashboard from './component/crud/Dashboard';
import { AuthContext } from './component/context/AuthContext';
import About from './component/about/about';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosBasket } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsCart } from 'react-icons/bs';
function App() {
  const { currentUser } = useContext(AuthContext);

  const [show, setShow] = useState(false)

  const handleShow = () => {
    const root = document.getElementsByTagName("html")[0]
    root.style.overflowY = show ? "auto" : "hidden"
    setShow(!show)
  }

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />;
  }

  return (
    <div className=''>
      <BrowserRouter>
        <div className='w-[100%] mx-auto flex items-center fixed top-0 left-0 z-10 bg-orange-100'>
          <div className="w-[95%] h-14 mx-auto flex flex-wrap items-center justify-between font-bold">
            <span className="ml-3 text-2xl text-green-600  font-bold">ASL BURGER</span>
            <nav className="menubar xl:block sm:hidden md:ml-auto md:mr-auto ">
              <NavLink to="/" className="mr-5  text-black hover:text-cyan-600 text-xl">Home</NavLink>
              <NavLink to="/about" className="mr-5 text-black hover:text-cyan-600 text-xl">About</NavLink>
              <NavLink to="/dashboard" className="mr-5 text-black hover:text-cyan-600 text-xl">Dashboard</NavLink>
            </nav>
            <div className='hidden sm:block'>
              {!show && (
                <GiHamburgerMenu onClick={handleShow} />
              )}
              {show && (
                <nav className="absolute w-[100%] h-[100vh] bg-[#fff] top-0 left-0 flex flex-col justify-evenly items-center ">
                  <div className='w-[100%] h-auto flex justify-between p-[20px] items-center'>
                    <p className='text-[20px] font-bold text-red-700'>MenuBar</p>
                    <IoCloseSharp onClick={handleShow} className='cursor-pointer bg-white' size={34} />
                  </div>
                  <hr className='w-[94%] mx-auto h-[2px] bg-slate-500' />
                  <div className='h-[70%] items-center flex flex-col justify-evenly'>
                    <NavLink to="/" className="mr-5 text-black hover:text-stone-500 text-xl" onClick={handleShow}>Home</NavLink>
                    <NavLink to="/about" className="mr-5 text-black hover:text-stone-500 text-xl" onClick={handleShow}>About</NavLink>
                    <NavLink to="/dashboard" className="mr-5 text-black hover:text-stone-500 text-xl" onClick={handleShow}>Dashboard</NavLink>
                  </div>
                </nav>
              )}
            </div>
            <div className='flex items-center'>
          
            <BsCart className='text-2xl ml-2'/>
            </div>
          
          </div>
        </div>
        <Routes>
          <Route element={<Header />} path='/' /> 
          <Route element={<About />} path='/about' />
          <Route element={<SignIn />} path='/signin' />
          <Route element={<RequireAuth><Dashboard /></RequireAuth>} path='/dashboard' />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
