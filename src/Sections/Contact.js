import React from 'react'
import '../Styles/Contact.css'

const Contact = () => {
  return (
    <div>
      <section className="contact" id="contact">

        <h1 className="heading"><span>contact</span></h1>

        <div className="row">

            <form action="">
                <input type="text" placeholder="name" className="box"></input>
                <input type="email" placeholder="email" className="box"></input>
                <input type="number" placeholder="number" className="box"></input>
                <textarea name="" className="box" placeholder="message" cols="30" rows="10"></textarea>
                <input type="submit" value="send message" className="btn"></input>
            </form>

            <div className="image">
                <img src="./assets/contact.jpg" alt=""/>
            </div>


        </div>


    </section>
    </div>
  )
}

export default Contact
