import { Suspense } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import CampusModel from './CampusModel'
import Loading from './Loading'

interface Props {
  cameraPosition: [number, number, number]
  cameraRotation: [number, number, number]
}

function Viewport (props: Props): JSX.Element {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[0, 5, 0]} intensity={1} />
          <PerspectiveCamera
            makeDefault
            position={props.cameraPosition}
            rotation={props.cameraRotation}
            fov={80}
            near={0.1}
            far={100}
          />
          <CampusModel/>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Viewport