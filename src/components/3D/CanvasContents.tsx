import { PerspectiveCamera } from "@react-three/drei";
import CampusModel from "./CampusModel";
import { useThree } from "@react-three/fiber";
import { Euler } from "three";

interface Props {
    cameraPosition: [number, number, number]
    cameraRotation: Euler
    }

function CanvasContents(props: Props) {
    const { camera } = useThree()
    camera.rotation.copy(props.cameraRotation)
    return (
    <>
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
    </>
  );
}

export default CanvasContents;