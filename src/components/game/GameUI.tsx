import ControlButton from "./ControlButton";
import SpeechBubble from "./SpeechBubble";

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
            <ControlButton onClick={() => props.handleIsMoving(true)} label="進む" bgColor="#00C14D" />
            <ControlButton onClick={() => props.handleIsMoving(false)} label="止まる" bgColor="#FF2121" />
          </div>
        </div>
    </>
  )
}

export default GameUI