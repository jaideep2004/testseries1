import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import { Close, LockOutlined } from '@mui/icons-material';

const ContentPreview = ({ content, isPurchased, onPurchase }) => {
  const [open, setOpen] = useState(false);

  const handlePreview = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to prevent content selection/copy
  const preventCopy = (e) => {
    e.preventDefault();
    return false;
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
          {isPurchased ? (
            <Box className="content-container">
              {content.type === 'video' ? (
                <video
                  src={content.fileUrl}
                  controls
                  style={{ width: '100%', maxHeight: '70vh' }}
                  controlsList="nodownload"
                  onContextMenu={preventCopy}
                />
              ) : (
                <iframe
                  src={content.fileUrl}
                  style={{ width: '100%', height: '70vh', border: 'none' }}
                  title={content.title}
                  sandbox="allow-same-origin allow-scripts"
                />
              )}
            </Box>
          ) : (
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentPreview;