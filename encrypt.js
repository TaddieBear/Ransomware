var encryptor = require('file-encryptor');
var fs = require('fs');
var path = require('path');

var key = 'sheessh';
var inputFolder = './folder/';
var outputFolder = './folder/';

// Function to encrypt a file and remove the original file afterward.
function encryptAndRemoveFile(inputFile, encryptedFile, key) {
  encryptor.encryptFile(inputFile, encryptedFile, key, function(err) {
    if (err) {
      console.error('Encryption error:', err);
    } else {
      // Encryption complete, now remove the original file.
      fs.unlink(inputFile, function(err) {
        if (err) {
          console.error('Error removing file:', err);
        } else {
          console.log('File removed successfully.');
        }
      });
    }
  });
}

// Read all files in the input folder
fs.readdir(inputFolder, function(err, files) {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Encrypt each text file in the folder
  files.forEach(function(file) {
    if (path.extname(file) === '.txt') {
      var inputFile = path.join(inputFolder, file);
      var encryptedFile = path.join(outputFolder, file + '.encrypted');

      encryptAndRemoveFile(inputFile, encryptedFile, key);
    }
  });
});
