import ControlButton from "./ControlButton";
import SpeechBubble from "./SpeechBubble";

interface Props {
  handleIsMoving: (isMoving: boolean) => void;
  isMoving: boolean;
  speed: string;
}

function GameUI (props: Props): JSX.Element {
  return (
    <>
      <img
        src="/images/cockpit.png"
        style={{ position: 'fixed', right: 0, bottom: 0, width: '100%', objectFit: 'cover', transform: 'translateY(30px)' }}
      />
      <div
        style={{
        width: '100%',
        height: '110px',
        position: 'fixed',
        bottom: 0,
        padding: 10,
        display: 'flex',
        gap: '10px',
        }}
      >
        <SpeechBubble>
          <p style={{ width: '100%', height: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>自由に探索してみよう</p>
        </SpeechBubble>
        <div style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
          <ControlButton onClick={() => props.handleIsMoving(true)} label="進む" bgColor={[0, 193, 77]} isActive={!props.isMoving} />
          <ControlButton onClick={() => props.handleIsMoving(false)} label="止まる" bgColor={[255, 33, 33]} isActive={props.isMoving} />
        </div>
      </div>
      <div
        className="m-plus-rounded-1c-regular"
        style={{
          position: 'fixed',
          top: '50px',
          left: 0,
          padding: '5px',
          color: 'white',
          fontSize: '1rem',
          zIndex: 1000,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>速度</span>: {props.speed} m/s
      </div>
    </>
  )
}

export default GameUI