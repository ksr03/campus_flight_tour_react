interface Props {
  speed: number;
}

function SpeedMeter(props: Props) {
  return (
    <div
      className="m-plus-rounded-1c-regular"
      style={{
        position: 'fixed',
        top: '50px',
        left: 0,
        padding: '5px',
        color: 'white',
        fontSize: '1rem',
        zIndex: 1000,
      }}
    >
      <span style={{ fontWeight: 'bold' }}>速度</span>: {props.speed}
      <div
        style={{
          width: '33px',
          height: '370px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img src="/images/meter.png" style={{ width: '100%', height: '100%', position: 'relative' }} />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '327px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              width: '5px',
              height: `${props.speed * 10}%`,
              backgroundColor: 'red',
              borderRadius: '10px',
              transition: '0.05s',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SpeedMeter;