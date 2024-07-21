import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
import Viewport from "./3D/Viewport"
import ControlButton from "./ControlButton"
import DebugText from "./DebugText"

// カメラの初期位置と回転
const INITIAL_CAMERA_POSITION: [number, number, number] = [0, 0.2, 3]
const INITIAL_CAMERA_ROTATION: [number, number, number] = [-Math.PI / 4, 0, 0]

function Game() {
  const timerRef = useRef<number | null>(null);
  // カメラの位置
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(INITIAL_CAMERA_POSITION)
  // カメラの回転
  const [cameraRotation, setCameraRotation] = useState<[number, number, number]>(INITIAL_CAMERA_ROTATION)
  // カメラの速度
  const [cameraSpeed, setCameraSpeed] = useState<number>(0)
  // 前進しているかどうか
  const [isMoving, setIsMoving] = useState<boolean>(false)

  useEffect(() => {
    // カメラの位置を更新する関数
    const updateCameraPosition = () => {
      const [beta, gamma] = cameraRotation;
      const [x, y, z] = cameraPosition;
  
      // カメラの向いている方向ベクトルを計算（カメラのローカル座標系を使用）
      const direction = new THREE.Vector3(0, 0, -1); // カメラの前方方向を表す
      direction.applyEuler(new THREE.Euler(beta, gamma, 0)); // 回転を適用
  
      // 移動量を計算
      direction.multiplyScalar(cameraSpeed);
  
      // 新しい位置を計算
      const newPosition: [number, number, number] = [
        x + direction.x,
        y + direction.y,
        z + direction.z
      ];
  
      setCameraPosition(newPosition);
    };
  
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;

      const betaRad = Math.max(-Math.PI / 4 + 0.01, Math.min(-Math.PI / 4 + THREE.MathUtils.degToRad(beta ?? 0), Math.PI / 4 - 0.01));
      const gammaRad = Math.max(-Math.PI / 4, Math.min(-THREE.MathUtils.degToRad(gamma ?? 0), Math.PI / 4))
      const alphaRad = cameraRotation[1] + gammaRad / 40;

      setCameraRotation([betaRad, alphaRad, gammaRad]);
    };

    const requestPermission = async () => {
      // @ts-expect-error: Check for iOS 13+ permission request
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          // @ts-expect-error: Check for iOS 13+ permission request
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        } catch (error) {
          console.error('Device orientation permission request failed:', error);
        }
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  
    requestPermission();

    timerRef.current = setInterval(() => {
      if (isMoving) {
        const newSpeed = cameraSpeed + 0.0002;
        setCameraSpeed(Math.min(newSpeed, 0.02));
      } else {
        const newSpeed = cameraSpeed - 0.001;
        setCameraSpeed(Math.max(newSpeed, 0));
      }
      updateCameraPosition();
    }, 1000 / 60);

    // クリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [cameraPosition, cameraRotation, cameraSpeed, isMoving]);

  return (
    <>
      {/* 3Dビューポート */}
      <div style={{ width: '100%', height: '100%', backgroundColor: 'skyblue' }}>
        <Viewport cameraPosition={cameraPosition} cameraRotation={cameraRotation} />
      </div>
      {/* 2D UI */}
      <div
        style={{
          position: 'fixed',
          right: 0, bottom: 0,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <ControlButton onClick={() => setIsMoving(true)} label="START" bgColor="#2194FF" />
        <ControlButton onClick={() => setIsMoving(false)} label="STOP" bgColor="#FF2121" />
      </div>
      {/* デバッグ用テキスト */}
      <DebugText>
        <>
          {`cameraPosition: ${cameraPosition[0].toFixed(2).toString()}, ${cameraPosition[1].toFixed(2).toString()}, ${cameraPosition[2].toFixed(2).toString()}`}<br />
          {`cameraRotation: ${cameraRotation[0].toFixed(2).toString()}, ${cameraRotation[1].toFixed(2).toString()}, ${cameraRotation[2].toFixed(2).toString()}`}<br />
          cameraSpeed: {cameraSpeed}
        </>
      </DebugText>
    </>
  )
}

export default Game
