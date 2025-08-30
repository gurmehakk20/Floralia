import React from 'react'
import '../Styles/Review.css'
import { FaStar } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const review = () => {
  return (
    <div>
      <section className="review" id="review">

        <h1 className="heading">
            customer's <span>review</span>
        </h1>

        <div className="box-container">

            <div className="box">
                <div className="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.</p>
                <div className="user">
                    <img src="./cust/img-1.jpeg" alt=""/>
                    <div className="user-info">
                        <h3>john deo</h3>
                        <span>happy customer</span>
                    </div>
                </div>
                {/* <span><FaQuoteRight /></span> */}
            </div>

            <div className="box">
                <div className="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.
                    
                </p>
                <div className="user">
                    <img src="./cust/img-2.jpg" alt=""/>
                    <div className="user-info">
                        <h3> Hayley </h3>
                        <span>happy customer</span>
                    </div>
                </div>
                {/* <span><FaQuoteRight /></span> */}
            </div>

            <div className="box">
                <div className="stars">
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                    <FaStar size={'3em'} color='yellow'/>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt a mollitia, eveniet culpa ea maiores sequi itaque ab repellat doloribus illum iusto veniam ipsa eos atque animi quos facere.</p>
                <div className="user">
                    <img src="./cust/img-3.webp" alt=""/>
                    <div className="user-info">
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
