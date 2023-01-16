import React, {useState, useEffect} from 'react';
import './App.css';
import HeaderComponent from './app/components/headerComponent/HeaderComponent';
import MainContent from './app/components/mainContent/MainContent';


function App() {
  const [drawer, setDrawer] = useState(false);

  return(
    <div className="App">
      <HeaderComponent drawer={drawer} setDrawer={setDrawer} />
      <MainContent drawer={drawer} />
    </div>
  )
};
export default App;