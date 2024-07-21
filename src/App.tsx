import { useState, useEffect } from "react"
import Game from "./components/Game"
import Loading from "./components/Loading";

const LOADING_TIME = 3000;

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
      <Game />
    </>
  )
}

export default App
