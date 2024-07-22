interface Props {
  onClick: () => void;
  label: string;
  bgColor: number[];
  isActive: boolean;
}

function ControlButton({ onClick, label, bgColor, isActive }: Props) {
  const color: number[] = isActive ? bgColor : [Math.max(0, bgColor[0] -100), Math.max(0, bgColor[1] - 100), Math.max(0, bgColor[2] - 100)];
  const shadowColor: number[] = [Math.max(0, bgColor[0] - 40), Math.max(0, bgColor[1] - 40), Math.max(0, bgColor[2] - 40)];
  return (
    <button
      onClick={onClick}
      className="m-plus-rounded-1c-regular"
      style={{
        width: '100px',
        height: '50px',
        backgroundColor: `rgb(${color.join(',')})`,
        border: 'none',
        borderRadius: '50px',
        boxShadow: `0 ${isActive ? 5 : 0}px 0 rgb(${shadowColor.join(',')})`,
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: isActive ? 'white' : '#aaa',
        zIndex: 1000,
        transform: `translateY(${isActive ? -5 : 0}px)`,
        transition: '.2s'
      }}
    >
      {label}
    </button>
    );
}

export default ControlButton;