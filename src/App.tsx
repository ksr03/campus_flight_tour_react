import Viewport from "./components/3D/Viewport"

function App() {
  return (
    <>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'skyblue' }}>
        <Viewport cameraPosition={[0, 0.5, 2]} cameraRotation={[-0.2, -0.3, 0.1]} />
      </div>
    </>
  )
}

export default App
