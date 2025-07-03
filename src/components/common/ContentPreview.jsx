import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button, CircularProgress } from '@mui/material';
import { Close, LockOutlined } from '@mui/icons-material';
import axios from 'axios';

const ContentPreview = ({ content, isPurchased, onPurchase }) => {
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePreview = async () => {
    setOpen(true);
    
    // Only prepare preview data if content is purchased
    if (isPurchased) {
      setLoading(true);
      setError(null);
      
      try {
        // Get the preview URL from the API
        const response = await axios.get(`/api/content/${content._id}/preview`);
        
        // If we got a direct preview URL for Google Drive
        if (response.data && response.data.previewUrl) {
          setPreviewData({ previewUrl: response.data.previewUrl });
        } else {
          // Otherwise use the API endpoint
          setPreviewData({ previewUrl: `/api/content/${content._id}/preview` });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error preparing preview:', err);
        setError('Failed to prepare preview. Please try again later.');
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset state when closing
    setPreviewData(null);
    setError(null);
  };

  // Function to prevent content selection/copy
  const preventCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const renderContent = () => {
    if (!isPurchased) {
      return (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          padding={4}
        >
          <LockOutlined sx={{ fontSize: 48, color: 'grey.500', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Preview Limited
          </Typography>
          <Typography align="center" color="text.secondary" paragraph>
            {content.isFree 
              ? "Sign in to access this free content"
              : "Purchase this content to get full access"}
          </Typography>
          {!content.isFree && (
            <Button
              variant="contained"
              color="primary"
              onClick={onPurchase}
            >
              Purchase for ₹{content.price}
            </Button>
          )}
        </Box>
      );
    }

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="outlined" onClick={handlePreview}>
            Try Again
          </Button>
        </Box>
      );
    }

    if (!previewData) {
      return null;
    }

    // Use the direct preview URL
    return (
      <iframe
        src={previewData.previewUrl}
        style={{ width: '100%', height: '70vh', border: 'none' }}
        title={content.title}
        allowFullScreen
        frameBorder="0"
      />
    );
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={handlePreview}
      >
        Preview
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            userSelect: 'none', // Prevent text selection
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{content.title}</Typography>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent 
          onCopy={preventCopy}
          onCut={preventCopy}
          onPaste={preventCopy}
          onContextMenu={preventCopy}
          className="prevent-save"
        >
          {renderContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentPreview;