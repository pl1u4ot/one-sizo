import React, { useEffect, useState } from "react";
import "./Slider.css";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/C257/production/_129115794_gettyimages-1331807831-1.jpg",
    "/img/jail.jpg",
    "https://healthnewshub.org/wp-content/uploads/2024/03/Fast-Food-Restaurants.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-frame">
      <div
        className="slide-images"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {images.map((src, index) => (
          <div className="img-container" key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
            <div className="text-container">
              <h1>
                Добро пожаловать
              </h1>
              <b>Мы занимаемся доставкой в <i>​​СИЗО</i>    Кыргызстана</b>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-nav prev" onClick={prevSlide}>
        &#8592;
      </button>
      <button className="slider-nav next" onClick={nextSlide}>
        &#8594;
      </button>
    </div>
  );
}
