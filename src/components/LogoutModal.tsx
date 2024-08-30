import React from 'react';
import '../styles/LogoutModal.css';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Вы действительно хотите выйти?</h2>
        <div className="modal-buttons">
          <button className="button-confirm" onClick={onConfirm}>Согласиться</button>
          <button className="button-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
