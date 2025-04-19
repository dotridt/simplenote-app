import { HelpCircle } from "lucide-react";

interface FooterProps {
  onHelp: () => void;
}

export default function Footer({ onHelp }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-400">
            SimpleNote - Distraction-free notes
          </div>
          <div className="text-sm text-slate-400 flex items-center">
            <button 
              className="text-slate-500 hover:text-slate-700 transition-colors flex items-center"
              onClick={onHelp}
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Help</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
