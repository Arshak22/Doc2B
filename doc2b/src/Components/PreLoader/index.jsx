import React from "react";
import { useGlobalContext } from "../../Context/Context";

import Lottie from 'react-lottie';
import * as Doc2BLoader from "../../assets/lotties/Doc2B loader.json";
import * as Doc2BLoaderDark from "../../assets/lotties/Doc2B loader Dark.json";
import './style.css';

export default function PreLoader() {
  const { darkMode } = useGlobalContext();

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: darkMode ? Doc2BLoaderDark : Doc2BLoader,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
      <div className="preLoader">
        <div>
        <Lottie options={defaultOptions}
              height={280}
              width={280}
        />
        </div>
      </div>
    );
}