import React from "react";

interface PROPS {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: PROPS) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 !mt-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 dark:bg-white dark:bg-opacity-50">
      <div className="w-full max-w-[22rem] transform overflow-hidden rounded-lg bg-background shadow-lg transition-all md:max-w-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
