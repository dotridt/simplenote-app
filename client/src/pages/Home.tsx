import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TableProperties } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isCreating, setIsCreating] = useState(false);

  // Create a new note and navigate to it
  const createNoteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/notes", { content: "" });
      return response.json();
    },
    onSuccess: (data) => {
      setLocation(`/n/${data.id}`);
    },
  });

  const handleCreateNote = () => {
    setIsCreating(true);
    createNoteMutation.mutate();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header showNoteUrl={false} />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-sm">
          <CardHeader className="flex justify-center pb-2">
            <div className="flex flex-col items-center">
              <TableProperties size={48} className="text-sky-500 mb-2" />
              <h1 className="text-2xl font-bold text-slate-700">SimpleNote</h1>
              <p className="text-slate-500 mt-1 text-center">
                Simple, distraction-free note taking
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-slate-600 mb-6 text-center">
              Create a new note and share it with a unique URL. 
              No login required.
            </p>
            <Button 
              size="lg" 
              className="bg-sky-500 hover:bg-sky-600 text-white w-full"
              onClick={handleCreateNote}
              disabled={isCreating}
            >
              {isCreating ? "Creating Note..." : "Create New Note"}
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
