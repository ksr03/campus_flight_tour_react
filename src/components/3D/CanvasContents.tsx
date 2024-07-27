import { PerspectiveCamera } from "@react-three/drei";
import CampusModel from "./CampusModel";
// import { useThree } from "@react-three/fiber";
import { Euler } from "three";

interface Props {
    cameraPosition: [number, number, number]
    cameraRotation: [number, number, number]
    }

function CanvasContents(props: Props) {
    // const { camera } = useThree()
    const rotation = new Euler(...props.cameraRotation, 'YXZ')
    // camera.rotation.copy(rotation)
    return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 1, 1]} intensity={1.5} />
      <PerspectiveCamera
        makeDefault
        position={props.cameraPosition}
        rotation={rotation}
        fov={100}
        near={0.1}
        far={100}
      />
      <CampusModel/>
    </>
  );
}

export default CanvasContents;