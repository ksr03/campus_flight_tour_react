interface Props {
  onClick: () => void;
  label: string;
  bgColor: string;
}

function ControlButton({ onClick, label, bgColor }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100px',
        height: '50px',
        backgroundColor: bgColor,
        border: 'none',
        borderRadius: '50px',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
        fontFamily: 'Ubuntu',
        fontSize: '20px',
        color: 'white',
      }}
    >
      {label}
    </button>
    );
}

export default ControlButton;