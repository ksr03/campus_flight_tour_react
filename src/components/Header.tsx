function Header () {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '50px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
      }}
    >
      <p className="monomaniac-one-regular" style={{ paddingLeft: '0.5rem', paddingBottom: '5px', fontSize: '1.8rem' }}>バーチャルキャンパスツアー</p>
    </div>
  )
}

export default Header