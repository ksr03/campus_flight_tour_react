import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import CampusModel from './CampusModel'
import { Euler } from 'three'

interface Props {
  cameraPosition: [number, number, number]
  cameraRotation: Euler
}

function Viewport (props: Props): JSX.Element {
  const { camera } = useThree()
  camera.rotation.copy(props.cameraRotation)
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 1]} intensity={1.5} />
        <PerspectiveCamera
          makeDefault
          position={props.cameraPosition}
          // rotation={props.cameraRotation}
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