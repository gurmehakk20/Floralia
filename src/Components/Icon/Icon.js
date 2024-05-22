import React from 'react'
import './Icon.css'
import { FaCartArrowDown } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { CiGift } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";

const Icon = () => {
  return (
    <div>
        <section class="icon-container">

        <div class="icons">
            <FaCartArrowDown size={"4em"}/>
            <div class="info">
                <h3>free delivery</h3>
                <span>on all orders</span>
            </div>
        </div>

        <div class="icons">
            <TbMoneybag size={"4em"}/>
            <div class="info">
                <h3>10 days returns</h3>
                <span>moneyback guarantee </span>
            </div>
        </div>

        <div class="icons">
            <CiGift size={"4em"}/>
            <div class="info">
                <h3>offer & delivery</h3>
                <span>on all orders</span>
            </div>
        </div>

        <div class="icons">
            <RiSecurePaymentLine size={"4em"}/>
            <div class="info">
                <h3>secure payments</h3>
                <span>protected by paypal</span>
            </div>
        </div>

    </section>
    </div>
  )
}

export default Icon
