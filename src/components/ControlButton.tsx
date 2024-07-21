interface Props {
  onClick: () => void;
  label: string;
  bgColor: string;
}

function ControlButton({ onClick, label, bgColor }: Props) {
  return (
    <button
      onClick={onClick}
      className="m-plus-rounded-1c-regular"
      style={{
        width: '100px',
        height: '60px',
        backgroundColor: bgColor,
        border: 'none',
        borderRadius: '50px',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'white',
        zIndex: 1000,
      }}
    >
      {label}
    </button>
    );
}

export default ControlButton;