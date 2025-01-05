import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import languages from "../../data/languages"; 
const Translation = () => {
  const [wordTranslate, setWordTranslate] = useState("");
  const [translation, setTranslation] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");

  const translateText = async () => {
    if (!wordTranslate) return; 
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${wordTranslate}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json();
      setTranslation(data.responseData.translatedText);
      console.log(data.responseData);
    } catch (error) {
      console.log("Translation error:", error);
    }
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(wordTranslate);
    speechSynthesis.speak(utterance);
  };

  const playAudioTranslation = () => {
    const utterance = new SpeechSynthesisUtterance(translation);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      
      <TextField
        select
        label="From"
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.label} value={lang.label}>
            {lang.value}
          </MenuItem>
        ))}
      </TextField>
        <TextField
          select
          label="To"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      >
        {languages
          .filter((lang) => lang.label !== "Autodetect") // Exclude "Auto Detect"
          .map((lang) => (
            <MenuItem key={lang.label} value={lang.label}>
              {lang.value}
            </MenuItem>
          ))}
      </TextField>
      
      <TextField
        variant="outlined"
        label="Word to Translate"
        value={wordTranslate}
        onChange={(e) => setWordTranslate(e.target.value)}
        style={{ marginBottom: "20px", width: "60%", marginTop: "20px" }}
      />
      <button style={{ margin: "10px" }} onClick={playAudio}>Play Audio</button>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={translateText}
        style={{ marginBottom: "20px" }}
      >
        Translate
      </Button>
      <div style={{ marginTop: "10px", fontSize: "18px" }}>
        Translation: <strong>{translation}</strong>
      </div>
      <button style={{ margin: "10px" }} onClick={playAudioTranslation}>Play Audio</button>
    </div>
  );
};

export default Translation;
