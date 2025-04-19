import { TableProperties } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNoteUrl } from "@/lib/noteUtils";

interface HeaderProps {
  noteId?: string;
  showNoteUrl: boolean;
  onNewNote?: () => void;
  onShare?: () => void;
  onCopyUrl?: () => void;
}

export default function Header({ 
  noteId, 
  showNoteUrl, 
  onNewNote, 
  onShare, 
  onCopyUrl 
}: HeaderProps) {
  const noteUrl = noteId ? getNoteUrl(noteId) : "";

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TableProperties className="text-sky-500" size={24} />
          <h1 className="text-xl font-semibold">SimpleNote</h1>
        </div>
        
        {showNoteUrl && (
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-3 bg-slate-100 rounded-md px-3 py-1.5">
              <Input
                type="text"
                value={noteUrl}
                readOnly
                className="bg-transparent border-none shadow-none focus:outline-none text-sm flex-grow mr-2 w-56 text-slate-600 h-auto p-0"
              />
              <button 
                onClick={onCopyUrl}
                className="text-sky-500 hover:text-sky-600 transition-colors text-sm font-medium"
              >
                Copy
              </button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm" 
                onClick={onNewNote}
                className="hidden md:flex items-center text-slate-500 hover:text-slate-700"
              >
                <span className="mr-1">+</span>
                New
              </Button>
              
              <Button
                size="sm"
                onClick={onShare}
                className="flex items-center bg-sky-500 hover:bg-sky-600 text-white"
              >
                <span className="mr-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </span>
                <span className="hidden md:inline">Share</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
