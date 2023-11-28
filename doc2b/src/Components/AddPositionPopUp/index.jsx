import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import './style.css';

export default function AddPositionPopUp({ darkMode, close }) {
  const defaultGorcaruytBlocks = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    content: "",
  }));

  const [gorcaruytBlocks, setGorcaruytBlocks] = useState(defaultGorcaruytBlocks);

  const addMoreGorcaruyt = () => {
    setGorcaruytBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: Date.now(), content: "" },
    ]);
  };

  const deleteGorcaruyt = (id) => {
    setGorcaruytBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.id !== id)
    );
  };

  const handleContentChange = (id, newContent) => {
    setGorcaruytBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  return (
    <div className={"AddPopUp AddPositionPopUp" + (darkMode ? ' Dark DarkPopUp' : '')}>
      <button className={'event-closeBtn' + (darkMode ? ' whiteX' : '')} onClick={close}>
        <RxCross2 />
      </button>
      <div className='singleStaffRow'>
        <div className='staffInputSec NameInptSec'>
          <div>
            <label htmlFor="Position">Պաշտոնը</label>
            <input type="text" name="Position" id="Position" className={darkMode ? ' darkInpt' : ''} />
          </div>
        </div>
      </div>
      <div className="gorcaruyt-popup-section">
        {gorcaruytBlocks.map((block) => (
          <div key={block.id} className={"gorcaruyt-block popup-gorcaruyt" + (darkMode ? ' darkInpt' : '')}>
            <textarea
              name=""
              id=""
              rows="2"
              placeholder="Գործառույթ"
              className={(darkMode ? ' darkInpt2' : '') + (gorcaruytBlocks.length > 3 ? ' shortTextarea' : '')}
              value={block.content}
              onChange={(e) => handleContentChange(block.id, e.target.value)}
            ></textarea>
            {gorcaruytBlocks.length > 3 && (
              <button className='delete-gorcaruyt' onClick={() => deleteGorcaruyt(block.id)}>
                <ImCross />
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <button className="add-more-gorcaruyt" onClick={addMoreGorcaruyt}>+</button>
      </div>
      <div className="add-gorcaruyt-btn">
        <button className="welcome-btn">Ավելացնել</button>
      </div>
    </div>
  );
};
