// Test script for Google Drive integration
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

console.log('Starting Google Drive integration test...');

// Path to credentials file
const CREDENTIALS_PATH = path.join(process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                                  path.join(__dirname, './config/google-credentials.json'));

// Folder ID
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1FfFhEOImZMkLm2qWiSgfmFmR1U9G_3Od';

console.log('Using credentials path:', CREDENTIALS_PATH);
console.log('Using folder ID:', FOLDER_ID);

// Check if credentials file exists
if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error('Error: Credentials file not found at', CREDENTIALS_PATH);
  process.exit(1);
}

// Initialize Drive client
try {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive']
  });

  const drive = google.drive({ version: 'v3', auth });
  
  console.log('Successfully initialized Drive client');
  
  // Create a test file
  const testFilePath = path.join(__dirname, 'test-file.txt');
  fs.writeFileSync(testFilePath, 'This is a test file for Google Drive integration');
  
  console.log('Created test file at:', testFilePath);
  
  // Upload test file to Drive
  async function uploadTestFile() {
    try {
      // File metadata
      const fileMetadata = {
        name: 'test-file.txt',
        parents: [FOLDER_ID]
      };
      
      // Media
      const media = {
        mimeType: 'text/plain',
        body: fs.createReadStream(testFilePath)
      };
      
      console.log('Uploading file to Google Drive...');
      
      // Upload file
      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,webViewLink'
      });
      
      console.log('File uploaded successfully!');
      console.log('File ID:', response.data.id);
      console.log('File name:', response.data.name);
      console.log('View URL:', response.data.webViewLink);
      
      // Make file publicly accessible
      console.log('Making file publicly accessible...');
      
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
      
      console.log('File is now publicly accessible');
      
      // Get download link
      const fileInfo = await drive.files.get({
        fileId: response.data.id,
        fields: 'webContentLink,webViewLink'
      });
      
      console.log('Download URL:', fileInfo.data.webContentLink);
      
      // Clean up test file
      fs.unlinkSync(testFilePath);
      console.log('Test file deleted from local storage');
      
      console.log('Test completed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
  uploadTestFile();
  
} catch (error) {
  console.error('Error initializing Drive client:', error);
} 