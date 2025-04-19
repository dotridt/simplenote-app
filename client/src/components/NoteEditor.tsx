import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, Italic, Underline, 
  ListOrdered, List, 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { applyFormatting, countWords } from "@/lib/noteUtils";

interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
  isLoading: boolean;
}

export default function NoteEditor({ content, onChange, isLoading }: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [wordCount, setWordCount] = useState(0);

  // Update word count when content changes
  useEffect(() => {
    setWordCount(countWords(content));
  }, [content]);

  const handleFormattingClick = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const formattedText = applyFormatting(selectedText, format);
    
    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    onChange(newContent);
    
    // Focus back to textarea after formatting
    textarea.focus();
  };

  if (isLoading) {
    return (
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
          <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <div className="border-r border-slate-200 h-6 mx-1"></div>
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="flex-grow w-full" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              className="p-1.5 rounded hover:bg-slate-100 transition-colors" 
              title="Bold" 
              onClick={() => handleFormattingClick('bold')}
            >
              <Bold className="text-slate-600" size={20} />
            </button>
            <button 
              className="p-1.5 rounded hover:bg-slate-100 transition-colors" 
              title="Italic" 
              onClick={() => handleFormattingClick('italic')}
            >
              <Italic className="text-slate-600" size={20} />
            </button>
            <button 
              className="p-1.5 rounded hover:bg-slate-100 transition-colors" 
              title="Underline" 
              onClick={() => handleFormattingClick('underline')}
            >
              <Underline className="text-slate-600" size={20} />
            </button>
            <div className="border-r border-slate-200 h-6 mx-1"></div>
            <button 
              className="p-1.5 rounded hover:bg-slate-100 transition-colors" 
              title="Bullet List" 
              onClick={() => handleFormattingClick('bullet')}
            >
              <List className="text-slate-600" size={20} />
            </button>
            <button 
              className="p-1.5 rounded hover:bg-slate-100 transition-colors" 
              title="Numbered List" 
              onClick={() => handleFormattingClick('number')}
            >
              <ListOrdered className="text-slate-600" size={20} />
            </button>
          </div>
          
          <div className="text-sm text-slate-400 flex items-center">
            <span id="word-count">{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        {/* Text editor area */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow relative">
            <Textarea
              ref={textareaRef}
              id="note-content"
              value={content}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 resize-none border-none focus:outline-none focus:ring-0 bg-white rounded-lg text-slate-700"
              placeholder="Start typing your note here..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
