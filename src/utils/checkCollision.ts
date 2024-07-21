import * as THREE from 'three'

// 地面の高さ
const GROUND_HEIGHT = 0

/**
 * 地面・建物との衝突判定を行う関数
 */
function checkCollision(cameraPosition: [number, number, number], velocity: THREE.Vector3): [number, number, number] {
  const newPosition: [number, number, number] = [
    cameraPosition[0] + velocity.x,
    Math.max(GROUND_HEIGHT, cameraPosition[1] + velocity.y),
    cameraPosition[2] + velocity.z
  ]
  return newPosition
}

export default checkCollision