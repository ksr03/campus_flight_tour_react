import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
import Viewport from "../3D/Viewport"
import GameUI from "./GameUI"
import StartScreen from "./StartScreen"
import checkCollision from "../../utils/checkCollision"
import getText from "../../utils/getText"

/// カメラの初期位置と回転
const INITIAL_CAMERA_POSITION: [number, number, number] = [0, 1.5, 0]
const INITIAL_CAMERA_ROTATION: [number, number, number] = [-Math.PI / 4, 0, 0]

function Game() {
  const timerRef = useRef<number | null>(null);
  // ゲーム画面が表示されているかどうか
  const [isStarted, setIsStarted] = useState<boolean>(false);
  // カメラの位置
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(INITIAL_CAMERA_POSITION)
  // カメラの回転
  const [cameraRotation, setCameraRotation] = useState<[number, number, number]>(INITIAL_CAMERA_ROTATION)
  // カメラの速度
  const [cameraSpeed, setCameraSpeed] = useState<number>(0)
  // 前進しているかどうか
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const handleIsMoving = (isMoving: boolean) => setIsMoving(isMoving)
  // 建物の説明文
  const [text, setText] = useState<string>('自由に探索してみよう')

  // const [test, setTest] = useState<string>('none')

  /**
   * デバイスの向きからカメラの回転を更新する関数
   */
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    const { alpha, beta } = event;

    const betaRad = Math.max(-Math.PI / 4 + 0.01, Math.min(-Math.PI / 4 + THREE.MathUtils.degToRad(beta ?? 0), Math.PI / 4 - 0.01));
    // const gammaRad = Math.max(-Math.PI / 4, Math.min(-THREE.MathUtils.degToRad(gamma ?? 0), Math.PI / 4))
    const gammaRad = 0;
    const alphaRad = THREE.MathUtils.degToRad(alpha ?? 0);

    setCameraRotation([betaRad, alphaRad, gammaRad]);
    // setTest(beta?.toFixed(0).toString() ?? 'null');
  };

  /**
   * センサーの許可をリクエストする関数
   */
  const requestPermission = async () => {
    // DeviceorientationEventの許可が必要な場合の処理
    if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> }).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<'granted' | 'denied'> }).requestPermission();
        if (response === 'granted') {
          // パーミッションが許可された場合はイベントリスナーを追加
          window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
      } catch (error) {
        console.error('Device orientation permission request failed:', error);
      }
    } else {
      // パーミッションが不要な場合はイベントリスナーを追加
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  /**
   * カメラの位置を更新する関数
   */
  const updateCameraPosition = () => {
    const [beta, gamma] = cameraRotation;

    // カメラの向いている方向ベクトルを計算（カメラのローカル座標系を使用）
    const direction = new THREE.Vector3(0, 0, -1); // カメラの前方方向を表す
    direction.applyEuler(new THREE.Euler(beta, gamma, 0)); // 回転を適用

    // 移動量を計算
    direction.multiplyScalar(cameraSpeed);

    // 新しい位置を計算
    const newPosition: [number, number, number] = checkCollision(cameraPosition, direction);

    // テキストを更新
    setText(getText(newPosition));

    setCameraPosition(newPosition);
  };

  useEffect(() => {  
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
  }, [cameraPosition, cameraRotation, cameraSpeed, isMoving, isStarted]);

  // ゲーム終了時にイベントリスナーを削除
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ゲームスタート時にデバイスの許可をリクエスト
  useEffect(() => {
    requestPermission();
  }, [isStarted]);

  return (
    <>
      {/* ゲームスタートボタン */}
      <StartScreen onClick={() => setIsStarted(true)} isStarted={isStarted} />
      {/* 3Dビューポート */}
      <div style={{ width: '100%', height: '100%', backgroundColor: 'skyblue', zIndex: '100' }}>
        <Viewport cameraPosition={cameraPosition} cameraRotation={cameraRotation} />
      </div>
      {/* 2D UI */}
      <GameUI
        handleIsMoving={handleIsMoving}
        isMoving={isMoving}
        speed={(cameraSpeed * 1000).toFixed(0).toString()}
        text={text}
        position={[cameraPosition[0], cameraPosition[2]]}
        rotation={cameraRotation[1]}
      />
      {/* <div style={{ position: 'fixed', top: '0', right: '0', zIndex: 1000 }}>
        <p>{'test: '+test}</p>
        <p>{'cameraRotation'+cameraRotation}</p>
      </div> */}
    </>
  )
}

export default Game
