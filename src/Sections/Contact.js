import React, { useState } from 'react'
import { LuPhone, LuMail, LuMapPin, LuClock } from 'react-icons/lu'
import '../Styles/Contact.css'

const Contact = () => {
  const [sent, setSent] = useState(false)

  // No backend is connected yet — confirm receipt on the page instead of reloading it.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title" className="section-title">
            Let&rsquo;s make <em>someone&rsquo;s day.</em>
          </h2>
          <p className="contact-lead">
            Have a question or need help choosing the perfect bouquet? We&rsquo;d love to hear from you.
          </p>

          <ul className="contact-details">
            <li>
              <LuPhone aria-hidden="true" />
              <div>
                <span className="contact-label">Call us</span>
                <a href="tel:+1234567890">+123-456-7890</a>
              </div>
            </li>
            <li>
              <LuMail aria-hidden="true" />
              <div>
                <span className="contact-label">Email</span>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </div>
            </li>
            <li>
              <LuMapPin aria-hidden="true" />
              <div>
                <span className="contact-label">Studio</span>
                <span>Chandigarh, India – 160017</span>
              </div>
            </li>
            <li>
              <LuClock aria-hidden="true" />
              <div>
                <span className="contact-label">Hours</span>
                <span>Mon – Sat, 9am – 8pm</span>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required className="box" />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required className="box" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-phone">
              Phone <span className="field-optional">(optional)</span>
            </label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className="box" />
          </div>
          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="box"
              rows="5"
              required
              placeholder="Tell us about the occasion, your budget, or any questions."
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-lg">
              Send Message <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            <p className="form-status" role="status">
              {sent && "Thank you — we've received your message and will reply within one working day."}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
