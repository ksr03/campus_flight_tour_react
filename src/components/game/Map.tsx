interface Props {
  position: [number, number];
  rotation: number;
}

function Map (props: Props): JSX.Element {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50px',
        right: 0,
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
      >
        <img
          src='/images/map.png'
          style={{
            position: 'relative',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
        <img
          src="/images/location.png"
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            transform: `translate(${props.position[0] * 11.1}px, ${props.position[1] * 11.1}px) rotate(${-props.rotation * 180 / Math.PI}deg)`,
          }}
        />
      </div>
    </div>
  );
}

export default Map