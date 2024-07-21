import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import CampusModel from './CampusModel'

interface Props {
  cameraPosition: [number, number, number]
  cameraRotation: [number, number, number]
}

function Viewport (props: Props): JSX.Element {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1.5} />
        {/* <Environment preset="city" />
        <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.75}
        scale={10}
        blur={1}
        far={0.8}
      /> */}
        <PerspectiveCamera
          makeDefault
          position={props.cameraPosition}
          rotation={props.cameraRotation}
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