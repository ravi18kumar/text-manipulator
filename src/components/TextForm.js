import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase","success");

  };
  const handleCapitalizeAfterPeriod = () => {
    let newText = text[0].toUpperCase(); //Captalize first letter
    let capitalizeNext = true; //set to true so that first letter gets capitalized
    for (let i = 1; i < text.length; i++) {
        if (text[i] === ".") {
            capitalizeNext = true;
            newText += "."; // add the period back to the newText string
        } else if (capitalizeNext) {
            newText += text[i].toUpperCase();
            capitalizeNext = false;
        } else {
            newText += text[i];
        }
    }
    setText(newText);
    props.showAlert("Converted to Capitalize after period including first letter", "success");
};


  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text area cleared","success");

  };

  const handleOnChange = (event) => {
    console.log("On change");
    setText(event.target.value);
  };
  const handleCopy = () => {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Text copied to clipboard","success");

  };
  // Removes Extra spaces
  const handleRemoveWhitespaces = () => {
  let newText = text.replace(/\s+/g, ' ');
  setText(newText);
  props.showAlert("Unwanted whitespaces removed", "success");
};


const handleTextToSpeech = () => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "en-US";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  props.showAlert("Text read out loud", "success");
};

  const [text, setText] = useState("");
  // text="new text"; //Wrong way to change the state
  // setText("new text"); // correct way to change the state
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeAfterPeriod}>
          capitalize
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleRemoveWhitespaces}>
          spaceremover
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleTextToSpeech}>
          speech
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          convert to uppercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          convert to Lowercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>
          clear text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
          Copy text
        </button>
        {/* <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra spaces</button> */}
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").filter((element) =>{return element.length!==0}).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} minutes approx to read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the above textbox to preview it."}</p>
      </div>
    </>
  );
}
