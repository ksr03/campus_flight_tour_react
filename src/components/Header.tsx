import { FaQuestionCircle } from "react-icons/fa";
import HelpModal from "./HelpModal";
import { useState } from "react";

function Header () {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

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
      <button
        style={{
          marginLeft: 'auto',
          marginRight: '0.8rem',
          padding: '2px 8px',
          fontSize: '0.8rem',
          backgroundColor: 'white',
          border: '1px solid #AAA',
          borderRadius: '20px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
        onClick={handleIsOpen}
      >
        <FaQuestionCircle style={{ verticalAlign: 'middle', paddingBottom: '2px' }} />
        使い方
      </button>
      <HelpModal isOpen={isOpen} onRequestClose={handleIsOpen} />
    </div>
  )
}

export default Header