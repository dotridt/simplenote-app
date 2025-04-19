// build.js - Vite build script for Vercel
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Log function to track the build process
function log(message) {
  console.log(`[build] ${message}`);
}

try {
  log("Starting build process for Vercel deployment");
  
  // Create dist directory if not exists
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }
  
  // Build client
  log("Building client...");
  execSync("npm run build:client", { stdio: "inherit" });
  
  // Copy server files
  log("Processing server files...");
  execSync("npm run build:server", { stdio: "inherit" });
  
  log("Build completed successfully!");
} catch (error) {
  log(`Build failed: ${error.message}`);
  process.exit(1);
}