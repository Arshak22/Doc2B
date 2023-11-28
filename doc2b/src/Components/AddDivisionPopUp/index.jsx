import React from "react";
import './style.css';

import { RxCross2 } from "react-icons/rx";

export default function AddDivisionPopUp({ darkMode, close }) {
    return (
        <div className={"AddPopUp AddPositionPopUp AddDivisionPopUp" + (darkMode ? ' Dark DarkPopUp' : '')}>
            <button className={'event-closeBtn' + (darkMode ? ' whiteX' : '')} onClick={close}>
                <RxCross2 />
            </button>
            <div className='staffInputSec NameInptSec'>
                <div>
                    <label htmlFor="Division">Ստորաբաժանում</label>
                    <input type="text" name="Division" id="Division" className={darkMode ? ' darkInpt' : ''} />
                </div>
            </div>
            <div className="add-divison-btn">
                <button className="welcome-btn">Ավելացնել</button>
            </div>
        </div>
    );
};