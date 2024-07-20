import { Html, useProgress } from '@react-three/drei'

function Loading (): JSX.Element {
  const { progress } = useProgress()
  return (
    <Html center>
    <div>{`${Math.floor(progress)}%`}</div>
    </Html>
  )
}

export default Loading