import { Canvas } from '@react-three/fiber'
import CanvasContents from './CanvasContents'

interface Props {
  cameraPosition: [number, number, number]
  cameraRotation: [number, number, number]
}

function Viewport (props: Props): JSX.Element {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <CanvasContents cameraPosition={props.cameraPosition} cameraRotation={props.cameraRotation} />
      </Canvas>
    </div>
  )
}

export default Viewport