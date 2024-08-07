import { useEffect } from 'react';
import './imageSlider.css'

export default function ImageSlider({handleClose,  show, name, images, media_type}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    "use strict";
    // Select all slides
    const slides = document.querySelectorAll(".cat-slide");

    // loop through slides and set each slides translateX
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${indx * 100}%)`;
    });

    // select next slide button
    const nextSlide = document.querySelector(".btn-next");

    // current slide counter
    let curSlide = 0;
    // maximum number of slides
    let maxSlide = slides.length - 1;

    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
      // check if current slide is the last and reset current slide
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      //   move slide by -100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });

    // select next slide button
    const prevSlide = document.querySelector(".btn-prev");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
      // check if current slide is the first and reset current slide to last
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }

      //   move slide by 100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
  },[name])

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='modal-header'>
          <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x w-9 h-9 modal-header-icon cursor-pointer" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
        <div class="slider">
          { images?.map((imageName, index) => {
            return <div key={index} class="cat-slide">
              { media_type === "image" ? <iframe src={imageName} alt={`Image ${index + 1}`} className='content-media-frame'></iframe> : null}
            </div>
          }) }
          <button class="btn btn-next"> {">"} </button>
          <button class="btn btn-prev">{"<"} </button>
        </div>
      </section>
    </div>
  )
}