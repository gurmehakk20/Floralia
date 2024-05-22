import React from 'react'
import './Review.css'
import { FaStar } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const review = () => {
  return (
    <div>
      <section class="review" id="review">

        <h1 class="heading">
            customer's <span>review</span>
        </h1>

        <div class="box-container">

            <div class="box">
                <div class="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.</p>
                <div class="user">
                    <img src="../cust/img-1.jpeg" alt=""/>
                    <div class="user-info">
                        <h3>john deo</h3>
                        <span>happy customer</span>
                    </div>
                </div>
                {/* <span><FaQuoteRight /></span> */}
            </div>

            <div class="box">
                <div class="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.
                    
                </p>
                <div class="user">
                    <img src="../cust/img-2.jpg" alt=""/>
                    <div class="user-info">
                        <h3> Hayley </h3>
                        <span>happy customer</span>
                    </div>
                </div>
                {/* <span><FaQuoteRight /></span> */}
            </div>

            <div class="box">
                <div class="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.</p>
                <div class="user">
                    <img src="../cust/img-3.webp" alt=""/>
                    <div class="user-info">
                        <h3>Alexandre</h3>
                        <span>happy customer</span>
                    </div>
                </div>
                {/* <span><FaQuoteRight /></span> */}
            </div>

            
        </div>
    </section>
    </div>
  )
}

export default review
