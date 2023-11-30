const fs = require('fs');
const path = require('path');
const pug = require('pug');

// Directory paths
const templatesDir = path.join(__dirname, 'templates');
const buildDir = path.join(__dirname, 'html');

// Function to delete a directory recursively
function deleteDirectoryRecursively(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            const currentPath = path.join(directoryPath, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                // Recurse
                deleteDirectoryRecursively(currentPath);
            } else {
                // Delete file
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

// Wipe the build directory before starting
deleteDirectoryRecursively(buildDir);

// Ensure the build directory exists
fs.mkdirSync(buildDir, { recursive: true });

// Ensure the build directory exists
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir, { recursive: true });
}

// Function to ensure the directory exists before writing the file
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// Function to compile Pug files recursively
function compilePugFiles(directory, relativePath = '') {
    fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        entries.forEach(entry => {
            const entryPath = path.join(directory, entry.name);
            const outputDir = path.join(buildDir, relativePath);
            const outputFile = path.join(outputDir, entry.name.replace('.pug', '.html'));

            if (entry.isDirectory()) {
                // Recursively compile files in subdirectory
                compilePugFiles(entryPath, path.join(relativePath, entry.name));
            } else if (path.extname(entry.name) === '.pug') {
                // Ensure output directory exists
                ensureDirectoryExistence(outputFile);

                // Compile the Pug template to HTML
                const html = pug.renderFile(entryPath);

                // Write the HTML to the build directory
                fs.writeFile(outputFile, html, (err) => {
                    if (err) {
                        console.error(`Error writing ${outputFile}:`, err);
                    } else {
                        console.log(`${outputFile} has been compiled.`);
                    }
                });
            }
        });
    });
}

// Start the compilation process
compilePugFiles(templatesDir);
