import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Help & Shortcuts</h3>
            <button className="text-slate-400 hover:text-slate-600" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">About SimpleNote</h4>
            <p className="text-slate-600 text-sm">
              SimpleNote is a distraction-free note-taking app. Your notes are automatically saved as you type and are accessible via a unique URL.
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-slate-500">Bold text</div>
              <div className="text-slate-700">Ctrl+B</div>
              <div className="text-slate-500">Italic text</div>
              <div className="text-slate-700">Ctrl+I</div>
              <div className="text-slate-500">Underline text</div>
              <div className="text-slate-700">Ctrl+U</div>
              <div className="text-slate-500">Create bullet list</div>
              <div className="text-slate-700">Ctrl+Shift+8</div>
              <div className="text-slate-500">Create numbered list</div>
              <div className="text-slate-700">Ctrl+Shift+7</div>
            </div>
          </div>
          
          <Button 
            className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white"
            onClick={onClose}
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
