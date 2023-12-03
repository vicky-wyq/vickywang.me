const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'html');
const partialsDir = 'shared'; // Directory name for partials

// Data to be passed to templates
const templateData = {
  // Example: 'path/to/template.ejs': { variableName: 'value' }
};

// Function to clear the html directory
async function clearOutputDir() {
  await fs.emptyDir(outputDir);
}

// Function to process each file/directory
async function processFile(filePath, relativePath = '') {
  const stats = await fs.stat(filePath);

  if (stats.isDirectory()) {
    const files = await fs.readdir(filePath);
    for (const file of files) {
      await processFile(path.join(filePath, file), path.join(relativePath, file));
    }
  } else if (path.extname(filePath) === '.ejs') {
    // Skip files in the partials directory
    if (relativePath.includes(`${partialsDir}/`)) {
      return;
    }

    const ejsData = templateData[relativePath] || {}; // Use data for this template or default to an empty object
    const data = await ejs.renderFile(filePath, ejsData); // Pass the data to the template
    const outputPath = path.join(outputDir, relativePath.replace('.ejs', '.html'));
    await fs.outputFile(outputPath, data);
  } else {
    const outputPath = path.join(outputDir, relativePath);
    await fs.copy(filePath, outputPath);
  }
}

// Main function to run the build process
async function buildTemplates() {
  await clearOutputDir();
  await processFile(templatesDir);
}

// Run the build process
buildTemplates().catch(err => console.error(err));
