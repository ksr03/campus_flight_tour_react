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

  // 衝突判定ロジック
  // for (const building of buildings) {
  //   const [sizeX, sizeY, sizeZ] = building.size;
  //   const [centerX, centerY, centerZ] = building.center;

  //   const minX = centerX - sizeX / 2;
  //   const maxX = centerX + sizeX / 2;
  //   const minY = centerY - sizeY / 2;
  //   const maxY = centerY + sizeY / 2;
  //   const minZ = centerZ - sizeZ / 2;
  //   const maxZ = centerZ + sizeZ / 2;

  //   if (
  //     newPosition[0] >= minX && newPosition[0] <= maxX &&
  //     newPosition[1] >= minY && newPosition[1] <= maxY &&
  //     newPosition[2] >= minZ && newPosition[2] <= maxZ
  //   ) {
  //     // 衝突が検出された場合、移動をキャンセルする
  //     return cameraPosition;
  //   }
  // }

  return newPosition
}

export default checkCollision