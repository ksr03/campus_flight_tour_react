interface Props {
  children: JSX.Element
}

function SpeechBubble({ children }: Props) {
  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {children}
        <div style={arrowStyle}></div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: 'calc(100% - 20px)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const bubbleStyle: React.CSSProperties = {
    position: 'relative',
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '-13px',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '15px solid white',
  };

export default SpeechBubble;