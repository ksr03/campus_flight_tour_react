import buildings from '../data/buildings'

/**
 * 近くにある建物の説明文を返す関数
 */
function getText(cameraPosition: [number, number, number]): string {
  let nearestBuilding = null

  // 最も近い建物を探す
  for (const building of buildings) {
    const distance = Math.sqrt(
      (cameraPosition[0] - building.center[0]) ** 2 +
      (cameraPosition[2] - building.center[2]) ** 2
    );

    if (!nearestBuilding || distance < nearestBuilding.distance) {
      nearestBuilding = { ...building, distance }
    }
  }

  if (nearestBuilding && nearestBuilding.distance < 3) {
    return nearestBuilding.description
  }

  return '自由に探索してみよう'
}

export default getText