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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75  ">
      <div className="relative bg-custom-gradient bg-opacity-90 rounded-lg overflow-hidden shadow-lg w-1/4 h-3/4 p-4 flex flex-col glass">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white rounded-md"
          style={{ padding: '0.5px 6px', marginTop: '0.5px', marginBottom: '1px' }}
          onClick={onClose}
        >
          x
        </button>
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}
