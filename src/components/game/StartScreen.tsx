import { TbHandClick } from "react-icons/tb";

interface Props {
  isStarted: boolean;
  onClick: () => void;
}

function StartScreen(props: Props): JSX.Element {
  return (
    <button
        onClick={props.onClick}
        className="m-plus-rounded-1c-regular"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: props.isStarted ? 0 : 1,
          backgroundColor: 'white',
          border: 'none',
          transition: '.5s',
          zIndex: props.isStarted ? 0 : 9000,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p className="m-plus-rounded-1c-regular" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>タップして始める</p>
          <TbHandClick style={{ fontSize: '40px', marginLeft: '10px' }} />
        </div>
      </button>
  )
}

export default StartScreen;
