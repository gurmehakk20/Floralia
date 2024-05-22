import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div>
      <section class="contact" id="contact">

        <h1 class="heading"><span>contact</span></h1>

        <div class="row">

            <form action="">
                <input type="text" placeholder="name" class="box"></input>
                <input type="email" placeholder="email" class="box"></input>
                <input type="number" placeholder="number" class="box"></input>
                <textarea name="" class="box"  placeholder="message" cols="30" rows="10"></textarea>
                <input type="submit" value="send message" class="btn"></input>
            </form>

            <div class="image">
                <img src="../contact.jpg" alt=""/>
            </div>


        </div>


    </section>
    </div>
  )
}

export default Contact
