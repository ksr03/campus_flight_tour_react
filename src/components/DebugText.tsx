interface Props {
  children: JSX.Element
}

function DebugText({ children }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem',
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
}

export default DebugText;