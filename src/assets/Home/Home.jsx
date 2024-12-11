import React from 'react'
import Header from './Header/Header'
import Slider from './Slider/Slider';
import Footer from './Footer/Footer'
export default function Home() {
  return (
    <>
        <Header />
        {/* <main> */}
          <Slider />
          <Footer />
        {/* </main>  */}
    </>
  )
}
