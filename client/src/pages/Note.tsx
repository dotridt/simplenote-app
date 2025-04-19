import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import NoteEditor from "@/components/NoteEditor";
import Footer from "@/components/Footer";
import ShareModal from "@/components/ShareModal";
import HelpModal from "@/components/HelpModal";
import { getNoteUrl } from "@/lib/noteUtils";

export default function Note() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [noteContent, setNoteContent] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: "default" | "saving" | "saved" | "error" }>({
    message: "Ready to edit",
    type: "default",
  });
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch note data
  const { data: note, isLoading, isError } = useQuery({
    queryKey: [`/api/notes/${id}`],
    enabled: !!id,
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("PUT", `/api/notes/${id}`, { content });
      return response.json();
    },
    onSuccess: () => {
      setStatus({ message: "All changes saved", type: "saved" });
      queryClient.invalidateQueries({ queryKey: [`/api/notes/${id}`] });

      // Hide status after a delay
      setTimeout(() => {
        setStatus({ message: "", type: "default" });
      }, 3000);
    },
    onError: () => {
      setStatus({ message: "Error saving changes", type: "error" });
    },
  });

  // Initialize note content when data is loaded
  useEffect(() => {
    if (note && !isLoading) {
      setNoteContent(note.content);
    }
  }, [note, isLoading]);

  // Auto-save functionality
  const handleContentChange = (newContent: string) => {
    setNoteContent(newContent);
    
    // Show saving status
    setStatus({ message: "Saving...", type: "saving" });
    
    // Clear previous timeout if exists
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    // Set new timeout for saving (debounce)
    const timeout = setTimeout(() => {
      updateNoteMutation.mutate(newContent);
    }, 1000);
    
    setSaveTimeout(timeout);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [saveTimeout]);

  // Handle share button click
  const handleShare = () => {
    setShowShareModal(true);
  };

  // Handle help button click
  const handleHelp = () => {
    setShowHelpModal(true);
  };

  // Handle copy URL
  const handleCopyUrl = () => {
    const url = getNoteUrl(id || "");
    navigator.clipboard.writeText(url);
    
    toast({
      title: "URL copied to clipboard",
      duration: 2000,
    });
  };

  // Create a new note
  const createNoteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/notes", { content: "" });
      return response.json();
    },
    onSuccess: (data) => {
      window.location.href = `/n/${data.id}`;
    },
  });

  if (isError) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header showNoteUrl={false} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Note not found</h2>
            <p className="text-slate-500 mb-4">The note you're looking for doesn't exist or has been deleted.</p>
            <button 
              onClick={() => createNoteMutation.mutate()}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
            >
              Create New Note
            </button>
          </div>
        </div>
        <Footer onHelp={handleHelp} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header 
        noteId={id}
        showNoteUrl={true}
        onNewNote={() => createNoteMutation.mutate()}
        onShare={handleShare}
        onCopyUrl={handleCopyUrl}
      />
      
      {/* Status indicator */}
      {status.type !== "default" && (
        <div 
          className={`text-sm py-1 px-4 text-center transition-opacity duration-300 ${
            status.type === "saving" ? "bg-yellow-100 text-yellow-800" : 
            status.type === "saved" ? "bg-green-100 text-green-800" : 
            "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}
      
      <NoteEditor 
        content={noteContent}
        onChange={handleContentChange}
        isLoading={isLoading}
      />
      
      <Footer onHelp={handleHelp} />
      
      {showShareModal && (
        <ShareModal 
          noteId={id || ""} 
          onClose={() => setShowShareModal(false)}
          onCopy={handleCopyUrl}
        />
      )}
      
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
