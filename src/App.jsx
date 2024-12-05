import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [cnt, setCnt] = useState({ wordCount: 0, charCount: 0, clickCount: 0 });
  const [text, setText] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [theme, setTheme] = useState("light");

  // Function to handle text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    const words = newText.trim().split(/\s+/);
    setCnt({
      wordCount: words.length,
      charCount: newText.length,
      clickCount: cnt.clickCount,
    });
  };

  // Handlers for text formatting and tools
  const applyStyle = (style) => {
    setCnt({ ...cnt, clickCount: cnt.clickCount + 1 });
    if (style === "bold") setBold(!bold);
    if (style === "italic") setItalic(!italic);
    if (style === "underline") setUnderline(!underline);
  };

  const transformText = (type) => {
    setCnt({ ...cnt, clickCount: cnt.clickCount + 1 });
    if (type === "uppercase") setText(text.toUpperCase());
    if (type === "lowercase") setText(text.toLowerCase());
  };

  const removeDuplicates = () => {
    setCnt({ ...cnt, clickCount: cnt.clickCount + 1 });
    setText([...new Set(text.split(/\s+/))].join(" "));
  };

  const removeExtraSpaces = () => {
    setCnt({ ...cnt, clickCount: cnt.clickCount + 1 });
    setText(text.replace(/\s+/g, " ").trim());
  };

  const sortText = (order) => {
    const words = text.split(/\s+/);
    if (order === "alphabetical") setText(words.sort().join(" "));
    if (order === "reverse") setText(words.reverse().join(" "));
  };

  const textToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyToClipboard = () => navigator.clipboard.writeText(text);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme === "light" ? "dark-theme" : "light-theme";
  };

  return (
    <div className="app-container">
      <nav className={`navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
        <h3>Text Manipulator</h3>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>

      <div className="content">
        <aside className={`sidebar ${theme === "dark" ? "sidebar-dark" : "sidebar-light"}`}>
          <h2>Tools</h2>
          <button className="btn btn-success" onClick={() => transformText("uppercase")}>Uppercase</button>
          <button className="btn btn-info" onClick={() => transformText("lowercase")}>Lowercase</button>
          <button className="btn btn-info" onClick={() => applyStyle("bold")}>Bold</button>
          <button className="btn btn-info" onClick={() => applyStyle("italic")}>Italic</button>
          <button className="btn btn-info" onClick={() => applyStyle("underline")}>Underline</button>
          <button className="btn btn-success" onClick={removeDuplicates}>Remove Duplicates</button>
          <button className="btn btn-info" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
          <button className="btn btn-info" onClick={() => sortText("alphabetical")}>Sort Alphabetically</button>
          <button className="btn btn-info" onClick={textToSpeech}>Text to Speech</button>
          <button className="btn btn-success" onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        </aside>

        <main className="main">
          <textarea
            style={{
              fontWeight: bold ? "bold" : "normal",
              fontStyle: italic ? "italic" : "normal",
              textDecoration: underline ? "underline" : "none",
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
            }}
            rows="10"
            cols="80"
            placeholder="Start typing here..."
            value={text}
            onChange={handleTextChange}
          ></textarea>

          <div className="text-summary">
            <h3>Text Summary:</h3>
            <p>Words: {cnt.wordCount} | Characters: {cnt.charCount}</p>
            <p>
              Button Clicks:{" "}
              <span style={{ color: cnt.clickCount > 10 ? "red" : "black" }}>
                {cnt.clickCount}
              </span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
