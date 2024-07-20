import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
import Viewport from "./components/3D/Viewport"
import ControlButton from "./components/ControlButton"

// カメラの初期位置と回転
const INITIAL_CAMERA_POSITION: [number, number, number] = [0, 0.5, 3]
const INITIAL_CAMERA_ROTATION: [number, number, number] = [0, 0, 0]

function App() {
  const timerRef = useRef<number | null>(null);
  // カメラの位置
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(INITIAL_CAMERA_POSITION)
  // カメラの回転
  const [cameraRotation, setCameraRotation] = useState<[number, number, number]>(INITIAL_CAMERA_ROTATION)
  // カメラの速度
  const [cameraSpeed, setCameraSpeed] = useState<number>(0)

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
      const { beta, alpha, gamma } = event;

      const betaRad = THREE.MathUtils.degToRad(beta ?? 0);
      const gammaRad = THREE.MathUtils.degToRad(gamma ?? 0);
      const alphaRad = THREE.MathUtils.degToRad(alpha ?? 0);

      setCameraRotation([betaRad, gammaRad, alphaRad]);
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    timerRef.current = setInterval(() => {
      updateCameraPosition();
    }, 1000 / 60);

    // クリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [cameraPosition, cameraRotation, cameraSpeed]);

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
        <ControlButton onClick={() => setCameraSpeed(0.03)} label="START" bgColor="#2194FF" />
        <ControlButton onClick={() => setCameraSpeed(0)} label="STOP" bgColor="#FF2121" />
      </div>
    </>
  )
}

export default App
