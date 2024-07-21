import { useState, useEffect } from "react"
import { isMobile } from "react-device-detect";
import Game from "./components/Game"
import Loading from "./components/Loading";
import PCScreen from "./components/PCScreen";
import Header from "./components/Header";

const LOADING_TIME = 2000;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setTimeout(()=>setIsLoading(false), LOADING_TIME);
    } else {
      const loadTime = performance.now();
      window.addEventListener(
        'load',
        () => {
          const currentTime = performance.now();
          const diff = currentTime - loadTime;
          setTimeout(()=>setIsLoading(false), diff > LOADING_TIME ? 0 : LOADING_TIME - diff)
        }
      );
    }
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Header />
      {isMobile ? <Game /> : <PCScreen />}
      {/* <Game /> */}
    </>
  )
}

export default App
