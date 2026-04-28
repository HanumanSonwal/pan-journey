import Header from '@/component/Header'
import Head from 'next/head'
import React from 'react'
import Footer from '@/component/Footer'
import Hero from "@/component/Hero";
import Home from '@/component/home';
function page() {
  return (
    <div>
      <Header/>
       <Hero/>
       <Home/>
      <Footer/>
     
    </div>
  )
}

export default page
