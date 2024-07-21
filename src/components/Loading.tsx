type Props = {
    isLoading: boolean
}

const Loading = ({isLoading}:Props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        fontSize: '1.2rem',
        opacity: isLoading ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isLoading ? '9999' : '0',
        transition: '.5s'
      }}
    >
        縦画面でプレイしてください
    </div>
  )
}

export default Loading