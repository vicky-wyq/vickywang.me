const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const ejsLiterals = require('./ejs_literals');

const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'html');
const partialsDir = 'shared'; // Directory name for partials

console.log(ejsLiterals)
// Data to be passed to templates
const templateData = {
  // Example: 'path/to/template.ejs': { variableName: 'value' }
  templatePath: path.join(__dirname, 'templates'),
  websitePath: '',
  ejsLiterals,
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
// Existing line
    const ejsData = templateData[relativePath] || {}; 

    // Merge general templateData with specific template data
    const finalData = { ...templateData, ...ejsData };

    // Now use finalData instead of ejsData for rendering
    const data = await ejs.renderFile(filePath, finalData); 
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




