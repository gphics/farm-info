import React from 'react'

function HomePage() {
  return (
    <div className='home-page'>
      <section className='home-intro'>
        <p>Farm-info is a website for farmers to manage their farm records easily through an elegant and functioning user interface. Operations that can be carried out include user authentication, create, read , update and delete a farm record.</p>
      </section>
      <section className='home-hero'>
        <img src="https://www.treehugger.com/thmb/7v1FFs5CVix6DsPHt4CB3Q4VJ2s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/143917299-56a885b43df78cf7729e892a.jpg" alt="home hero" />
      </section>
    </div>
  )
}

export default HomePage