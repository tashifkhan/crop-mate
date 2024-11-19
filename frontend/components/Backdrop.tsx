import React from 'react';
import { X } from 'lucide-react';

interface ResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  result: string | React.ReactNode;
}

const ResultDialog: React.FC<ResultDialogProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  result 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#9EC8B9] rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose} 
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          {result}
        </div>
      </div>
    </div>
  );
};

export default ResultDialog;
