import "./index.scss";

interface modalProps {
  width: string;
  height: string;
  content: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({ width, height, content }) => {
  return (
    <div className="modal" style={{ width, height }}>
      {content}
    </div>
  );
};

export default Modal;
