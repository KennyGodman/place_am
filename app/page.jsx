"use client"
import React, { useState, useEffect } from 'react';
import "@styles/home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import logo from "@assets/images/placeam_logo.png";
import comingSoon from "@assets/images/comingSoon.png";
import phone from "@assets/images/phone.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';
import { Axios } from 'axios';


const Home = () => {
  const [ isActive, setIsActive ] = useState(true);
  const [ showComingSoon, setShowComingSoon ] = useState(true);
  const [ loader, setLoader ] = useState(false);
  const [ email, setEmail ] = useState({
    email: ""
  })

  useEffect(() => {
    const interval = setInterval(() => {
        setIsActive(!isActive)
      }, 4000)

      return () => {
        clearInterval(interval)
      }
  }, [isActive])

  const handleChange = (e) => {
    const { value } = e.target

    setEmail({
        email : value
    })
  }

  useEffect(() => {
    const comingInterval = setInterval(() => {
        setShowComingSoon(!showComingSoon)
    }, 4000)

    return () => {
        clearInterval(comingInterval)
    }
  }, [showComingSoon])

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoader(true);
    
    fetch("https://placeam.com/api/waitlist", {
        method: "POST",
        body:JSON.stringify({
            email: email.email
        })
    }).then(data => {
        console.log(data)
        toast("You have been added to the waiting list")
        setEmail({email:""});
        setLoader(false)
    }).catch(error => {
        console.error('Error:', error);
        toast("Failed to add you to the waiting list, TRY AGAIN LATER")
        setLoader(false)
    })  
  }

  return (
        <section className='main'>
            <ToastContainer/>
            <div className='header'>
                <Image src={logo} className='logo' alt="Placeam Logo"/>
                <Image src={comingSoon} className={showComingSoon ? "comingSoon" : "disableComingSoon"} alt="Coming-Soon"/>
            </div>
            <div className='hero-section'>
                <div className="hero-overlay">
                    <h1>
                        Experience the Future of 
                        Luxury Fashion Resale with 
                        Placeam
                    </h1>
                </div>
            </div>
            <div className='main-content'>
                <div className='left-image'>
                    <Image src={phone} alt="Phone" className='phone-image'/>
                </div>
                <div className='right-content'>
                    {isActive ? <h1 className='content-title'><span>Meet</span> Placeam</h1> : <h1 className='content-title'><span>Why</span> Placeam</h1>}
                    
                    
                    <div className={ isActive ? `card active` : `card inActive`}>
                        <h2>Seamless Shopping Experience</h2>
                        <p>
                            Welcome to Placeam, the ultimate destination for luxury fashion enthusiasts. 
                            Our innovative digital marketplace revolutionizes the way you buy, sell, 
                            and donate high-end clothing and accessories.
                        </p>
                    </div>
                    <div className={ isActive ? `card inActive` : `card active`}>
                        <h2>Authenticity Guaranteed</h2>
                        <p>
                            Placeam offers an intuitive, user-friendly platform for all your luxury fashion needs. 
                            From listing your items to making secure purchases, 
                            our streamlined process ensures a hassle-free experience for both buyers and sellers.
                        </p>
                    </div>
                </div>
            </div>
            <form className='waitlist-form' onSubmit={handleSubmit}>
                <h1>Join the Waitlist</h1>
                <p>
                    Buy, sell, and donate high-end fashion effortlessly. 
                    Stay ahead in the world of sustainable luxury, 
                    join the waitlist now!
                </p>
                <div className="input-box">
                    <input type="email" value={email.email} placeholder='sample@gmail.com' onChange={(e) => handleChange(e)} required/>
                    <button type="submit">{loader ?
                        <ThreeDots
                            visible={true}
                            height="20"
                            width="40"
                            color="#000000"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        /> 
                        : 
                        "Join waitlist"
                    }
                    </button>
                </div>
            </form>
            <div className='social-icons'>
                <a target="_blank" href='https://x.com/PlaceamNg?t=v1kpOgfGtJXYlgdSmgAGkw&s=09'>
                    <FaXTwitter className='icon'/>
                </a>
                <a target="_blank" href="https://www.instagram.com/placeam.ng?igsh=MWlqMjRwMmF3MDBzMg%3D%3D&utm_source=qr">
                    <FaInstagram className='icon'/>
                </a>
                <a target="_blank" href='https://www.facebook.com/profile.php?id=61563843128076&mibextid=ZbWKwL'>
                    <FaFacebookF className='icon'/>
                </a>
            </div>
        </section>
  )
};

export default Home;