import { useState, useEffect, useRef } from "react"
import * as THREE from 'three'
import Viewport from "../3D/Viewport"
import GameUI from "./GameUI"
import StartScreen from "./StartScreen"
import checkCollision from "../../utils/checkCollision"
import getText from "../../utils/getText"
import useSpeed from "../../hooks/useSpeed"

/// カメラの初期位置と回転
const INITIAL_CAMERA_POSITION: [number, number, number] = [3, 0.3, 3]
const INITIAL_CAMERA_ROTATION: [number, number, number] = [0, 0, 0]

function Game() {
  const timerRef = useRef<number | null>(null);
  // ゲーム画面が表示されているかどうか
  const [isStarted, setIsStarted] = useState<boolean>(false);
  // カメラの位置
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(INITIAL_CAMERA_POSITION)
  // カメラの回転
  const [rotationY, setRotationY] = useState<number>(0)
  const [qt, setQt] = useState<THREE.Quaternion>(new THREE.Quaternion().setFromEuler(new THREE.Euler(...INITIAL_CAMERA_ROTATION, 'ZXY')))
  // カメラの速度
  const [speed, handleTouchStart, handleTouchMove] = useSpeed();
  // 建物の説明文
  const [text, setText] = useState<string>('自由に探索してみよう')

  /**
   * デバイスの向きからカメラの回転を更新する関数
   */
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    const { beta, alpha, gamma } = event;

    const betaRad = THREE.MathUtils.degToRad(beta ?? 0);
    const alphaRad = THREE.MathUtils.degToRad(alpha ?? 0);
    const gammaRad = THREE.MathUtils.degToRad(-(gamma ?? 0));

    // 新しいクォータニオンを計算
    const _euler = new THREE.Euler(betaRad, alphaRad, gammaRad, 'YXZ');
    const _qt = new THREE.Quaternion().setFromEuler(_euler);

    // x軸を中心に-90度回転
    const _q1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    _qt.multiply(_q1);
  
    setRotationY(alphaRad);
    setQt(_qt.clone());
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
    // カメラの向いている方向ベクトルを計算（カメラのローカル座標系を使用）
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(qt);

    // 移動量を計算
    direction.multiplyScalar(speed * 2);

    // 新しい位置を計算
    const newPosition: [number, number, number] = checkCollision(cameraPosition, direction);

    // テキストを更新
    setText(getText(newPosition));

    setCameraPosition(newPosition);
  };

  useEffect(() => {
    if (!isStarted) return;

    // 既存のタイマーをクリア
    if (timerRef.current)
      clearInterval(timerRef.current);

    // 新しいタイマーをセット
    timerRef.current = setInterval(() => {
      // 1秒間に60回カメラの位置を更新
      updateCameraPosition();
    }, 1000 / 60);
  }, [cameraPosition, speed, qt]);

  // ゲーム終了時にイベントリスナーを削除
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ゲームスタート時にデバイスの許可をリクエスト
  useEffect(() => {
    requestPermission();
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
  }, [isStarted]);

  return (
    <>
      {/* ゲームスタートボタン */}
      <StartScreen onClick={() => setIsStarted(true)} isStarted={isStarted} />
      {/* 3Dビューポート */}
      <div style={{ width: '100%', height: '100%', backgroundColor: 'skyblue', zIndex: '100' }}>
        <Viewport cameraPosition={cameraPosition} qt={qt} />
      </div>
      {/* 2D UI */}
      <GameUI
        speed={speed * 1000}
        text={text}
        position={[cameraPosition[0], cameraPosition[2]]}
        rotation={rotationY}
      />
    </>
  )
}

export default Game
