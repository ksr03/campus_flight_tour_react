import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import CampusModel from './CampusModel'

interface Props {
  cameraPosition: [number, number, number]
  qt: THREE.Quaternion
}

function CanvasContents(props: Props) {
  const { camera } = useThree()
  camera.position.set(...props.cameraPosition)
//   camera.quaternion.copy(props.qt)
  camera.quaternion.set(props.qt.x, props.qt.y, props.qt.z, props.qt.w)
  camera.quaternion.slerp(props.qt, 0.1)
  return (
    <>
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 1]} intensity={1.5} />
        {/* <PerspectiveCamera
          makeDefault
          position={props.cameraPosition}
          rotation={new Euler().setFromQuaternion(props.qt)}
          fov={100}
          near={0.1}
          far={100}
        /> */}
        <CampusModel/>
      </Canvas>
    </>
  )
}

export default CanvasContents