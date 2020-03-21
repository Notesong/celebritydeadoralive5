import React from "react";

const CelebCard = ({ currentCeleb }) => {
  return (
    // Displays celebrity information, including image and name
    <div className='celeb-card'>
      <img src={currentCeleb.imageUrl} alt={currentCeleb.name} />
      <h3>{currentCeleb.name}</h3>
      <h4>{currentCeleb.info}</h4>
    </div>
  )
}
export default CelebCard; 