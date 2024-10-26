import { createPortal } from "react-dom";
import { RxCrossCircled } from "react-icons/rx";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="rounded-md max-w-[80%] min-w-[300px] min-h-[200px] bg-white fixed left-[50%] top-[50%] z-20 translate-y-[-50%] translate-x-[-50%]">
            <div className="relative p-3 pe-9">
              <RxCrossCircled
                onClick={onClose}
                className="cursor-pointer text-[30px] absolute right-0 top-0"
              />
              <h2 className="font-bold text-[16px]">Edit the Contact.</h2>
            </div>
            <div className="pt-0 p-3">
              <div>{children}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-default absolute top-0 left-0 z-10 h-screen w-screen backdrop-blur-sm"
          />
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
