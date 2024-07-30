import Modal from "react-modal";

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
      <h2>使い方</h2>
      <ul>
        <li>スマートフォンを動かすと周りを見渡すことができます。</li>
        <li>画面をスワイプすると、ドローンの速度を変えられます。</li>
      </ul>
    </Modal>
  )
}

export default HelpModal;