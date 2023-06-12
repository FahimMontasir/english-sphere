import Icon from "./Icon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* background  */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm backdrop-filter" />

      <div className="fixed inset-0 m-5 flex items-center justify-center md:m-10">
        <div
          className={`h-full w-full max-w-4xl rounded-lg bg-white-c p-3 md:p-8 ${className}`}
        >
          <div className="-mt-[5px] flex items-center justify-end md:-mt-[15px]">
            <button onClick={onClose}>
              <Icon
                name="close"
                className="h-[15px] w-[15px] fill-error md:h-[20px] md:w-[20px]"
              />
            </button>
          </div>
          <main className="mt-[10px] h-[95%] overflow-y-auto md:h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Modal;
