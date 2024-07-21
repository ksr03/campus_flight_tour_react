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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '105%',
          height: '105%',
          opacity: props.isStarted ? 0 : 1,
          backgroundColor: 'white',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          color: 'black',
          transition: '.5s',
          zIndex: props.isStarted ? 0 : 9000,
        }}
      >
        読み込み完了！<br/>
        タップして始める
      </button>
  )
}

export default StartScreen;
