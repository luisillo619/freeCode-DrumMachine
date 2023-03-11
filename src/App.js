import React, { useState } from "react";
import "./App.css";
import bankOne from "./Helpers/bankeOne";
import bankTwo from "./Helpers/bankeTwo";

function App() {
  const [power, setPower] = useState(true);
  const [powerBank, setPowerBank] = useState(false)
  const [display, setDisplay] = useState("");

  const [currentPadBank, setCurrentPadBank] = useState(bankOne);
  const [currentPadBankId, setCurrentPadBankId] = useState("Heater Kit");

  const powerControl = () => {
    setPower(!power);
    setDisplay("");
  };
 

  const selectBank = () => {
    if (power) {
      if (currentPadBank === bankOne) {
        setCurrentPadBank(bankTwo);
        setCurrentPadBankId("Smooth Piano Kit");
        setDisplay("Smooth Piano Kit");
      } else {
        setCurrentPadBank(bankOne);
        setCurrentPadBankId("Heater Kit");
        setDisplay("Heater Kit");
      }
    }
    setPowerBank(!powerBank)
  };

  const displayClipName = (name) => {
    if (power) {
      setDisplay(name);
    }
  };

  

  const clips = [].slice.call(document.getElementsByClassName("clip"));

  clips.forEach((sound) => {
    sound.volume = 0.5;
  });

  const triggerClip = (e) => {
    if (power) {
      const clip = e.target.childNodes[0];
      clip.currentTime = 0;
      clip.play();
      displayClipName(e.target.id.replace(/-/g, " "));
    }
  };

  document.addEventListener("keydown", (e) => {
    const id = e.key.toUpperCase();
    const clip = document.getElementById(id);
    if (clip) {
      clip.currentTime = 0;
      clip.play();
      displayClipName(clip.parentNode.id.replace(/-/g, " "));
    }
  });

  return (
    <div id="drum-machine" className="inner-container">
      <div id="display" className="display">
        {display}
      </div>
      <div className="pad-bank">
        {currentPadBank.map((drumObj, i, padBankArr) => {
          return (
            <div
              key={padBankArr[i].id}
              className="drum-pad"
              id={padBankArr[i].id}
              onClick={triggerClip}
            >
              <audio
                className="clip"
                id={padBankArr[i].keyTrigger}
                src={padBankArr[i].url}
              />
              {padBankArr[i].keyTrigger}
            </div>
          );
        })}
      </div>
      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={powerControl}>
            <div className={`inner ${power && "inner-selected"}`} />
          </div>
        </div>
        <p id="bank-name">{currentPadBankId}</p>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={selectBank}>
          <div className={`inner_Left ${powerBank && "inner_Right"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;