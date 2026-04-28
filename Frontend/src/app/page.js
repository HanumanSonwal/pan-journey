import Header from '@/component/Header'
import Head from 'next/head'
import React from 'react'
import Footer from '@/component/Footer'
import Hero from "@/component/Hero";
function page() {
  return (
    <div>
      <Header/>
       <Hero/>
      <Footer/>
     
    </div>
  )
}

export default page
