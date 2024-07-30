import Modal from "react-modal";
import { MdOutlineScreenRotation } from "react-icons/md";
import { MdOutlineSwipeVertical } from "react-icons/md";

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

function HelpModal(props: Props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          backgroundColor: 'white',
          borderRadius: '5px',
        }
      }}
    >
      <h2
        className="m-plus-rounded-1c-regular"
        style={{
          fontWeight: 'bold',
          height: '30px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        使い方
      </h2>
      <hr style={{ width: '90%', margin: 'auto', marginBottom: '15px' }} />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <MdOutlineScreenRotation style={{ fontSize: '5rem', color:'#303030' }} />
        <p className="m-plus-rounded-1c-regular" style={{ paddingLeft: '10px', fontWeight: 'bold', color:'#303030' }}>スマートフォンを動かすと周りを見渡すことができます。</p>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <MdOutlineSwipeVertical style={{ fontSize: '5rem', color:'#303030' }} />
        <p className="m-plus-rounded-1c-regular" style={{ paddingLeft: '10px', fontWeight: 'bold', color:'#303030' }}>画面をスワイプすると、ドローンの速度を変えられます。</p>
      </div>
    </Modal>
  )
}

export default HelpModal;