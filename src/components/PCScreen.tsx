const PCScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '.5s'
      }}
    >
      <div
      className="m-plus-rounded-1c-regular"
        style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        <p style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1.2rem', color: 'red' }}>PCには対応していません。</p>
        以下のQRコードから<br/>
        スマートフォンでアクセスしてください。
        <img src='/images/qrcode.png' alt='QRコード' style={{ width: '300px', height: '300px'}} />
      </div>
    </div>
  )
}

export default PCScreen