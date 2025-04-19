import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNoteSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get a note by ID
  app.get("/api/notes/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const note = await storage.getNoteById(id);
      
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      return res.json(note);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch note" });
    }
  });

  // Create a new note
  app.post("/api/notes", async (req: Request, res: Response) => {
    try {
      // Generate a unique ID for the note
      const noteId = uuidv4();
      const content = req.body.content || "";
      
      // Validate the note
      const noteData = insertNoteSchema.parse({ 
        id: noteId, 
        content 
      });
      
      // Store the note
      const note = await storage.createNote(noteData);
      return res.status(201).json(note);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Failed to create note" });
    }
  });

  // Update an existing note
  app.put("/api/notes/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      
      if (content === undefined) {
        return res.status(400).json({ message: "Content is required" });
      }
      
      const updatedNote = await storage.updateNote(id, content);
      
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      return res.json(updatedNote);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update note" });
    }
  });

  // Delete a note
  app.delete("/api/notes/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteNote(id);
      
      if (!success) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      return res.json({ message: "Note deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete note" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
