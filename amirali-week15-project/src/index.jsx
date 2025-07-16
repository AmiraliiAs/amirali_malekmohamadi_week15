import React, { useState } from "react";
import cities from "./cities.json";
import styles from "./Index.module.css";

function Index() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const getSuggestion = (value) => {
    if (!value) return "";

    const match = cities.find((city) => city.startsWith(value));
    return match || "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSuggestion(getSuggestion(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (suggestion && suggestion !== input) {
        e.preventDefault();
        setInput(suggestion);
        setSuggestion("");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.main_input}
        />
        {suggestion &&
          suggestion.startsWith(input) &&
          suggestion !== input && (
            <div className={styles.ghost_text}>
              <span style={{ visibility: "hidden" }}>{input}</span>
              {suggestion.slice(input.length)}
            </div>
          )}
      </div>
    </div>
  );
}

export default Index;
