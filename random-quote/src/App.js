import React, { useEffect, useRef, useState } from "react";
import './App.css';

function App() {

  const [quotes, setQuotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  const colorRef = useRef();
  let colors = ['#fff00', '#90ee90', 'ffa500', '#ff68ff', '#a9a9e7'];

  const changeTheme = () => {
    setIsActive(current => !current);
  };

  const nextQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum])      
      });
  };

  useEffect(() => {
    nextQuote();
  }, []);

  useEffect(() => {
    colorRef.current.style.color = colors[Math.floor(Math.random() * colors.length)];
  }, [quotes])

  return (
  <div className="app">
    <div className="cls-1"  style={{
          backgroundColor: isActive ? '#7cc6fe' : '#141233'
    }}>
      <div className="main" >
        <div className="content" >
          <p className="p-1" ref={colorRef} > {quotes.text}</p>
          <p className="p-2"> {quotes.author} </p>
        </div>
      </div>
      <div className="btn-0" > 
        <button className="btn-1" onClick={nextQuote} >Next</button>
        <button className="btn-2" onClick={changeTheme} >Change theme</button>
      </div>
    </div>
  </div>
  );
}
export default App;