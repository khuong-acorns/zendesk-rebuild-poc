import React from 'react'
import styled from 'styled-components'
import './hero.css'
import heroImg from "./hero.png"

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  background: rgba(82, 159, 70, 1);
`

const Hero = () => {
  return <Section>
  <div className="container search-container">
    <div>
      <h1 className="hero-h1">
        Acorns Help Center
      </h1>
      <p className="hero-element-subheading">
        Ask us anything!
      </p>
    </div>
    <div className="search border-radius max-w-md my-6 font-size-xl">
      <input className='form-field flex-centered mr-4 bg-white mb-0 p-1transition' placeholder='Need help?' type="search"></input>
      <button form="searchForm" type="submit" className="btn search-submit-button acorns-black-bg">
        Search
      </button>
    </div>
  </div>
  <div className="acorns-hero-img-container bg-primary">
    <img className="acorns-hero-img" src={heroImg} />
  </div>
</Section>
}

export { Hero }