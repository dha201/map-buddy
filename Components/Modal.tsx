'use client';

import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-custom-gradient bg-opacity-90 rounded-lg overflow-hidden shadow-lg w-full max-w-md mx-4 h-auto max-h-[90vh] p-4 flex flex-col glass">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1"
          onClick={onClose}
        >
          x
        </button>
        <div className="flex flex-col h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
