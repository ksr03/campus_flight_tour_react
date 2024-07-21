import { IoPhonePortraitOutline } from "react-icons/io5";

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
        opacity: isLoading ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isLoading ? 9999 : 0,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p className="m-plus-rounded-1c-regular" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>縦画面でプレイしてください</p>
        <IoPhonePortraitOutline size={100} color="black" />
        <p className="m-plus-rounded-1c-regular" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>読み込み中....</p>
      </div>
    </div>
  )
}

export default Loading