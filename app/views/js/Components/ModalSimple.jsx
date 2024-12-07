import React from 'react';
import { createPortal } from 'react-dom';

const ModalSimple = ({ isOpen, onClose, title, children, acceptLabel, declineLabel, onAccept, onDecline, width='max-w-2xl transform translate-x-1/2' }) => {
  if (!isOpen) return null; // Jika modal tidak terbuka, jangan render apa-apa

  return createPortal(
    <>
      <div
        className="bg-black w-full h-full absolute top-0 left-0 z-40 opacity-10"
        // onClick={onClose} // Menutup modal saat overlay diklik
      ></div>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full w-full"
      >
        <div className={`relative p-4 w-full max-h-full ${width}`}>
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                {title} {/* Menggunakan props title */}
              </h3>
              <button
                type="button"
                onClick={onClose} // Menutup modal saat tombol close diklik
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              >
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {children} {/* Konten modal yang dinamis */}
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
              <button
                onClick={onAccept} // Callback untuk tombol accept
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {acceptLabel || "Accept"} {/* Menggunakan props untuk label tombol */}
              </button>
              <button
                onClick={onDecline || onClose} // Callback untuk tombol decline atau menutup modal
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                {declineLabel || "Decline"} {/* Menggunakan props untuk label tombol */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
     document.body
  );
};

export default ModalSimple;
