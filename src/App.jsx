import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import { useState } from 'react';
// import React from 'react'

const App = () => {
   const [keywords, setKeywords] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);

   const extractKeywords = async (text) => {
      setIsOpen(true);
      setLoading(true);

      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application.json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
         },
         body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: 'Extract keywords from this text. Make the first letter of each word uppercase and separate witch commas\n\n' //? it tells cGPT what to do
            + text + '', //? the input text
            temperature: 0.5, //? Value between 0 and 1, it controls the creativeness, 1=max 
            max_tokens: 60,  //? max words, in this case
            frequency_penalty: 0.8  //? the higher it is, the less repetitive the responses are, between -2.0 and 2.0
         })
      }
      const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);

      const json = await response.json();

      const data = json.choices[0].text.trim();

      console.log(data);
      setKeywords(data);
      setLoading(false);
   };

   return (
      <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
         <Container maxW='3xl' centerContent>
            <Header />
            <TextInput extractKeywords={extractKeywords}/>
            <Footer />
         </Container>
      </Box>
   );
};

export default App;
