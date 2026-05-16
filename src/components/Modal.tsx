type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = (props: Props) => {
  const { isOpen, onClose } = props;
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>モーダルタイトル</h2>
        <p>これはモーダルの内容です。</p>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};
