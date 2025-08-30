import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <div>
      <section className="footer">

        <div className="box-container">

            <div className="box">
                <h3>quick lines</h3>
                <a href="#">home</a>
                <a href="#">about</a>
                <a href="#">products</a>
                <a href="#">review</a>
                <a href="#">contact</a>
            </div>

            <div className="box">
                <h3>quick lines</h3>
                <a href="#">my account</a>
                <a href="#">my order</a>
                <a href="#">my favorites</a>
            </div>

            <div className="box">
                <h3>locations</h3>
                <a href="#">India</a>
                <a href="#">USA</a>
                <a href="#">france</a>
                <a href="#">japan</a>
            </div>

            <div className="box">
                <h3>contact info</h3>
                <a href="#">+123-456-7890</a>
                <a href="#">example@gmail.com</a>
                <a href="#">Chandigarh, India - 160017</a>
                <img src="./assets/payment.png" alt=""/>
            </div>

        </div>

        
    </section>
    </div>
  )
}

export default Footer
