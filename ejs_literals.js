const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'ejs_literals');
let exportsObject = {};

try {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileExtension = path.extname(file).slice(1); // Remove the leading dot

        if (!exportsObject[fileExtension]) {
            exportsObject[fileExtension] = {};
        }

        const fileName = path.basename(file, path.extname(file));
        exportsObject[fileExtension][fileName] = fileContent;
    });
} catch (err) {
    console.error('Error reading directory:', err);
    throw err; // or handle error as needed
}

module.exports = exportsObject;
