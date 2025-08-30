import React from 'react'
import '../Styles/About.css'

const About = () => {
  return (
    <div>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span>
        </h1>
        <div className="row">
          <div className="video-container">
            <video src="./assets/about-video.mp4" loop autoPlay muted></video>
            <h3>best flower sellers</h3>
          </div>
          <div className="content">
            <h3>why choose us?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, quas nemo suscipit tenetur praesentium dolor iste a doloremque nesciunt. Eius, eveniet? Magnam, ipsa? Voluptas aspernatur architecto maxime tempora, sint quisquam?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos ducimus dignissimos vero? Illum laboriosam ratione dicta quas incidunt ipsa ullam</p>
            <a href="#" className="btn">learn more</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
