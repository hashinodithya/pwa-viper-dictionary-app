import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import {Container, Tabs, Tab, Box} from "@mui/material";
import Header from './components/Header/header';
import Definitions from './components/Definitions/definitions';
import Translation from './components/Translations/translations';

// import { useState } from 'react';

function App() {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord]= useState("");
  const [category, setCategory]= useState("en");
  const [value, setValue] = useState(0); 
  const [wordToDefine, setWordToDefine] = useState('');
  // const [translation, setTranslation] = useState("");
  // const [wordTranslate, setWordTranslate]= useState("");

  const translateToEnglish = async (word) => {
    try {
      if (!word || category === 'en') return word; // Skip translation if already in English
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${word}&langpair=${category}|en`
      );
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return word; // Fallback to the original word if translation fails
    }
  };

  const fetchDefinitions = async (wordToSearch) => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.error('Definition fetch error:', error);
      setMeanings([]);
    }
  };

  useEffect(() => {
    const getWordDefinition = async () => {
      if (!word) return;
      const translatedWord = await translateToEnglish(word); // Translate to English first
      setWordToDefine(translatedWord);
      fetchDefinitions(translatedWord); // Fetch definitions using the translated word
    };
    getWordDefinition();
    // eslint-disable-next-line
  }, [word, category]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // const translateText = async () => {
  //   if (!wordTranslate) return; 
  //   try {
  //     const response = await fetch(
  //       `https://api.mymemory.translated.net/get?q=${wordTranslate}&langpair=en|es`
  //     );
  //     const data = await response.json();
  //     setTranslation(data.responseData.translatedText);
  //     console.log(data.responseData)
  //   } catch (error) {
  //     console.log("Translation error:", error);
  //   }
  // };

 
  return (
    <div className="App"
    style={{height:"100vh", backgroundColor:"#79777a",color:"white"}}>

      <Container
      maxWidth="md"
      style= {{ display:"flex", flexDirection:"column", height:"100vh"}}>
      
      <Box style={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs for definitions and translation"
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Definitions" />
            <Tab label="Translation" />
          </Tabs>
        </Box>

        {value === 0 && ( <Header category={category} setCategory={setCategory}
      word={word} setWord={setWord}/> 
        )}

      {value === 0 && (
        meanings && (
        <Definitions word={wordToDefine} meanings={meanings} category={category}
        />
      ))}
      {value === 1 && (
      <Translation/>
      )}
      </Container>
      
    </div>
  );
}

export default App;
