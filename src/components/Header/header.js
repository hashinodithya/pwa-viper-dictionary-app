
import { createMuiTheme, TextField, ThemeProvider, MenuItem } from "@mui/material";
import React from "react";
import "./header.css";
import countries from "../../data/languages";
const Header = ({
  setCategory, category, word, setWord
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary:{
        main:'#fff'
      },
    },
  });

  const handleChange = (language) => {
    setCategory(language);
    setWord("");
    // setMeanings([]);
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Viper Dictionary"} </span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            label="Search your Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
           <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <button style={{ margin: "10px" }} onClick={playAudio}>Play Audio</button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
