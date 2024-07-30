import { useState, useRef } from 'react';

type useSpeedType = [number, (event: TouchEvent) => void, (event: TouchEvent) => void];

// スワイプで速度を変更するカスタムフック
function useSpeed(): useSpeedType {
  // 速度
  const [speed, setSpeed] = useState<number>(0);
  const speedRef = useRef<number>(0);
  const tempSpeedRef = useRef<number>(0);
  // タッチポイントのY座標
  const onTouchPointYRef = useRef<number>(0);

  const handleTouchStart = (event: TouchEvent) => {
    onTouchPointYRef.current = event.touches[0].clientY;
    tempSpeedRef.current = speedRef.current;
  }

  const handleTouchMove = (event: TouchEvent) => {
    const dy = onTouchPointYRef.current - event.touches[0].clientY;
    const newSpeed = tempSpeedRef.current + dy * 0.00005;
    speedRef.current = Math.min(Math.max(newSpeed, 0), 0.02);
    setSpeed(Math.floor(speedRef.current * 1000) / 1000);
  }

  return [speed, handleTouchStart, handleTouchMove];
}

export default useSpeed;