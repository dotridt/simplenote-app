import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { getNoteUrl } from "@/lib/noteUtils";

interface ShareModalProps {
  noteId: string;
  onClose: () => void;
  onCopy: () => void;
}

export default function ShareModal({ noteId, onClose, onCopy }: ShareModalProps) {
  const noteUrl = getNoteUrl(noteId);
  
  const handleCopyAndClose = () => {
    onCopy();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Share Note</h3>
            <button className="text-slate-400 hover:text-slate-600" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          
          <p className="mb-4 text-slate-600">Share this unique link to give others access to this note:</p>
          
          <div className="flex items-center bg-slate-100 rounded-md px-3 py-2 mb-4">
            <Input
              type="text"
              value={noteUrl}
              readOnly
              className="bg-transparent border-none shadow-none focus:outline-none text-sm flex-grow mr-2 w-full text-slate-600"
            />
            <button 
              className="text-sky-500 hover:text-sky-600 transition-colors text-sm font-medium"
              onClick={onCopy}
            >
              Copy
            </button>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline" 
              className="flex-1 py-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white"
              onClick={handleCopyAndClose}
            >
              Copy & Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
