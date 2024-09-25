import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Accordion from '../components/Accordion'

const FaqPage = () => {
  return (
    <div>
      <Navbar />
      <h2 style={{marginLeft: "20vw", marginTop: "30px"}}>Frequently Asked Questions: </h2>
      <div className="faq">
      
        <Accordion />
      </div>
      <Footer />
    </div>
  )
}

export default FaqPage
