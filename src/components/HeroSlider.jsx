import { useEffect, useState } from "react";
import "../styles/hero.css";

const slides = [
  { img: "/banner1.jpg", title: "Minister of Labor and Skills", desc: "H.E Muferihat Kamil Ahmed", link: "#" },
  { img: "/banner2.jpg", title: "State Minister for Technical and Vocational Education", desc: "H.E Dr. Teshale Berecha", link: "#" },
  { img: "/banner3.jpg", title: "State Minister for Labor Employment and Market Sector", desc: "H.E Mr. Solomon soka", link: "#" },
  { img: "/banner4.jpg", title: "State Minister for Labor affairs", desc: "H.E Mr. DANIEL TERESSA SHONEs", link: "#" },
  { img: "/banner5.jpg", title: "State Minister advisor", desc: "H.E Mrs. Nebiya Mohamed", link: "#" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Click dot
  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === current ? "active" : ""}`}>
            <img src={slide.img} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <a href={slide.link} className="read-more">Read More</a>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="prev" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>&#10094;</button>
        <button className="next" onClick={() => setCurrent((current + 1) % slides.length)}>&#10095;</button>

        {/* Dots */}
        <div className="dots">
          {slides.map((_, index) => (
            <span key={index} className={`dot ${index === current ? "active-dot" : ""}`} onClick={() => goToSlide(index)}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
