interface Props {
  speed: number;
}

function SpeedMeter(props: Props) {
  return (
    <div
      className="m-plus-rounded-1c-regular"
      style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        color: 'white',
        fontSize: '1rem',
      }}
    >
      <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>速度: {props.speed}</span>
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