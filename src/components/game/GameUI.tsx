import SpeechBubble from "./SpeechBubble";
import Map from "./Map";
import SpeedMeter from "./SpeedMeter";

interface Props {
  speed: number;
  text: string;
  position: [number, number];
  rotation: number;
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
          <p className="m-plus-rounded-1c-regular" style={{ width: '100%', height: '100%', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' }}>
            {props.text}
          </p>
        </SpeechBubble>
      </div>
      <SpeedMeter speed={props.speed} />
      <Map position={props.position} rotation={props.rotation} />
    </>
  )
}

export default GameUI