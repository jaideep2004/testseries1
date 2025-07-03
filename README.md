# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Google Drive PDF Storage Integration

This guide explains how to set up Google Drive integration for storing and serving PDF files in your application.

## Why Google Drive?

- **Reliability**: Files remain available even if your server restarts
- **Scalability**: No need to worry about server storage limits
- **Cost-effective**: Free tier provides 15GB of storage
- **Security**: Built-in security and permissions management

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

### 2. Create Service Account Credentials

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details:
   - Name: "PDF Storage Service"
   - Description: "Service account for storing PDFs"
4. Grant this service account "Editor" role
5. Click "Done"
6. Find your new service account in the list, click on it
7. Go to the "Keys" tab
8. Click "Add Key" > "Create new key"
9. Select JSON format and click "Create"
10. The JSON key file will download automatically - keep this secure!

### 3. Set Up Google Drive Folder

1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder for your PDFs (e.g., "TestseriesPDFs")
3. Right-click on the folder and select "Share"
4. Add the email address of your service account (found in the JSON file)
5. Give it "Editor" access
6. Copy the folder ID from the URL (the long string after "folders/" in the URL)

### 4. Configure Your Application

1. Create a `config` directory in your project if it doesn't exist
2. Copy the downloaded JSON key file to `config/google-credentials.json`
3. Create or update your `.env` file with the following variables:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./config/google-credentials.json
   GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id
   ```

### 5. Install Required Packages

```bash
npm install googleapis
```

## Usage

Once set up, the application will automatically:

1. Upload PDF files to Google Drive when they're submitted
2. Store the Google Drive file information in MongoDB
3. Serve the files directly from Google Drive when requested

## Troubleshooting

- **Permission Issues**: Make sure the service account has Editor access to the folder
- **File Not Found**: Check if the file exists in the Google Drive folder
- **API Quota Exceeded**: Consider upgrading your Google Cloud project if you hit API limits

## Security Considerations

- Keep your credentials JSON file secure and never commit it to version control
- Use environment variables for sensitive information
- Consider implementing additional authorization checks in your application

## Additional Resources

- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
