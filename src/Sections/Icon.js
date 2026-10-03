import React from 'react'
import '../Styles/Icon.css'
import { LuTruck, LuRotateCcw, LuFlower2, LuShieldCheck } from "react-icons/lu";

const BENEFITS = [
  { BenefitIcon: LuTruck, title: 'Free Delivery', text: 'On eligible orders' },
  { BenefitIcon: LuRotateCcw, title: 'Easy Returns', text: '10-day guarantee' },
  { BenefitIcon: LuFlower2, title: 'Freshness Guaranteed', text: 'Carefully packed flowers' },
  { BenefitIcon: LuShieldCheck, title: 'Secure Payments', text: '100% secure checkout' },
];

const Icon = () => {
  return (
    <section className="icon-container" aria-labelledby="benefits-title">
      <h2 id="benefits-title" className="visually-hidden">Why shop with Floralia</h2>
      <ul className="container benefits">
        {BENEFITS.map(({ BenefitIcon, title, text }) => (
          <li className="benefit" key={title}>
            <BenefitIcon className="benefit-icon" aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Icon
