const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const zipFile = path.join(__dirname, 'dist.zip');

if (!fs.existsSync(outDir)) {
  console.error("Error: 'out' directory not found. Please run 'npm run build' first.");
  process.exit(1);
}

// Delete existing dist.zip if it exists to ensure a clean build
if (fs.existsSync(zipFile)) {
  try {
    fs.unlinkSync(zipFile);
    console.log("Removed existing dist.zip");
  } catch (err) {
    console.warn("Could not remove existing dist.zip:", err.message);
  }
}

console.log("Zipping contents of 'out' directory to dist.zip...");

try {
  if (process.platform === 'win32') {
    // PowerShell's Compress-Archive needs backslashes and a clean wildcard path
    const winOutPath = outDir.replace(/\//g, '\\');
    const winZipPath = zipFile.replace(/\//g, '\\');
    
    // Command zips the contents of the out folder directly
    const command = `powershell -Command "Compress-Archive -Path '${winOutPath}\\*' -DestinationPath '${winZipPath}' -Force"`;
    execSync(command, { stdio: 'inherit' });
  } else {
    // Unix-like systems: zip command
    const command = `cd "${outDir}" && zip -r "${zipFile}" .`;
    execSync(command, { stdio: 'inherit' });
  }
  console.log("Successfully created dist.zip!");
} catch (error) {
  console.error("Failed to create zip file:", error.message);
  process.exit(1);
}
