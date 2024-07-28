import * as THREE from 'three'

// 高さの最小値
const MIN_HEIGHT = 0.5

// マップの大きさ
const MAP_SIZE = 9

/**
 * 地面・建物との衝突判定を行う関数
 */
function checkCollision(cameraPosition: [number, number, number], velocity: THREE.Vector3): [number, number, number] {
  const newPosition: [number, number, number] = [
    Math.max(-MAP_SIZE / 2, Math.min(MAP_SIZE / 2, cameraPosition[0] + velocity.x)),
    Math.max(MIN_HEIGHT, cameraPosition[1] + velocity.y),
    Math.max(-MAP_SIZE / 2, Math.min(MAP_SIZE / 2, cameraPosition[2] + velocity.z))
  ];
  return newPosition
}

export default checkCollision