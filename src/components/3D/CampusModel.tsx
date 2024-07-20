import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'

function CampusModel (): JSX.Element {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/') // DRACOのデコーダーのパスを設定

  const { scene } = useLoader(GLTFLoader, '/models/campus.glb', loader => {
    loader.setDRACOLoader(dracoLoader)
  })
  const copiedScene = useMemo(() => scene.clone(), [scene])

  return (
    <group>
      <primitive object={copiedScene} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  )
}

export default CampusModel