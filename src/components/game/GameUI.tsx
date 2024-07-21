import ControlButton from "./ControlButton";

interface Props {
  handleIsMoving: (isMoving: boolean) => void;
}

function GameUI (props: Props): JSX.Element {
  return (
    <>
      <img
        src="/images/cockpit.png"
        style={{ position: 'fixed', right: 0, bottom: 0, width: '100%', objectFit: 'cover' }}
      />
        <div
          style={{
            position: 'fixed',
            right: 0, bottom: 0,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
        <ControlButton onClick={() => props.handleIsMoving(true)} label="進む" bgColor="#00C14D" />
        <ControlButton onClick={() => props.handleIsMoving(false)} label="止まる" bgColor="#FF2121" />
        </div>
    </>
  )
}

export default GameUI