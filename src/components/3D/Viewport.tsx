import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Euler, Quaternion } from 'three'
import CampusModel from './CampusModel'
import * as THREE from 'three'

interface Props {
  cameraPosition: [number, number, number]
  cameraRotation: [number, number, number]
}

function Viewport (props: Props): JSX.Element {
  const qt = new Quaternion().setFromEuler(new Euler(...props.cameraRotation, 'ZXY'))
  qt.multiply(new Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2))
  qt.slerp(qt, 0.3)
  // const rotation = new Euler(...props.cameraRotation, 'YXZ')
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 1]} intensity={1.5} />
        <PerspectiveCamera
          makeDefault
          position={props.cameraPosition}
          rotation={new Euler().setFromQuaternion(qt)}
          fov={100}
          near={0.1}
          far={100}
        />
        <CampusModel/>
      </Canvas>
    </div>
  )
}

export default Viewport