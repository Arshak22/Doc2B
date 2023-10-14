import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import Document from "../../assets/Images/Document.png";
import DocumentAccepted from "../../assets/Images/DocumentAccepted.png";
import DocumentDeclined from "../../assets/Images/DocumentDeclined.png";
import DocumentInProcess from "../../assets/Images/DocumentInProcess.png";

import { HiDotsHorizontal } from "react-icons/hi";

export default function DocumentSlider({ documnets }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [menuVisible, setMenuVisible] = useState([]);
  const menuRefs = useRef([]);

  useEffect(() => {
    setMenuVisible(new Array(documnets.length).fill(false));
    menuRefs.current = menuRefs.current.slice(0, documnets.length);
  }, [documnets.length]);

  const toggleMenu = (index) => {
    const updatedMenuVisible = [...menuVisible];
    updatedMenuVisible[index] = !updatedMenuVisible[index];
    setMenuVisible(updatedMenuVisible);
  };

  const handleClickOutside = (event, index) => {
    if (
      menuRefs.current[index] &&
      !menuRefs.current[index].contains(event.target)
    ) {
      const updatedMenuVisible = [...menuVisible];
      updatedMenuVisible[index] = false;
      setMenuVisible(updatedMenuVisible);
    }
  };

  useEffect(() => {
    const handleOutsideClicks = (event, index) => {
      handleClickOutside(event, index);
    };

    menuRefs.current.forEach((menuRef, index) => {
      if (menuRef) {
        document.addEventListener("mousedown", (event) =>
          handleOutsideClicks(event, index)
        );
      }
    });

    return () => {
      menuRefs.current.forEach((menuRef, index) => {
        if (menuRef) {
          document.removeEventListener("mousedown", (event) =>
            handleOutsideClicks(event, index)
          );
        }
      });
    };
  }, [menuVisible]);

  return (
    <div className="sliderSection">
      <Slider {...settings}>
        {documnets.map((elem, index) => {
          return (
            <div className={!elem.category ? "document": "document application"} key={index}>
              <div className="three-dots">
                <HiDotsHorizontal
                  className="three-dots-icon"
                  onClick={() => toggleMenu(index)}
                />
                {menuVisible[index] && (
                  <div className="dots-menu" ref={(el) => (menuRefs.current[index] = el)}>
                    <ul>
                      <li>Դիտել</li>
                      <li>Ներբեռնել</li>
                      <li>Ուղարկել</li>
                      <li>Ջնջել</li>
                    </ul>
                  </div>
                )}
              </div>
              <h2>{elem.name}</h2>
              <h3>{elem.date}</h3>
              {!elem.category ? <img src={Document} alt={`document${index}`} className="documentPic"/> :
              elem.category === 'Accepted' ? <img src={DocumentAccepted} alt={`document${index}`} className="documentPic"/> :
              elem.category === 'Declined' ? <img src={DocumentDeclined} alt={`document${index}`} className="documentPic"/> :
              elem.category === 'In Process' ? <img src={DocumentInProcess} alt={`document${index}`} className="documentPic"/> : null}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};