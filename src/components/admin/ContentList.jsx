// src/components/admin/ContentList.jsx
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Delete,
  Edit,
  Visibility,
  Warning
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, contentId: null });
  const navigate = useNavigate();

  const fetchContents = async () => {
    try {
      const response = await api.get('/content', {
        params: {
          page: page + 1,
          limit: rowsPerPage
        }
      });
      setContents(response.data.contents);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [page, rowsPerPage]);

  const handleDelete = async () => {
    try {
      await api.delete(`/content/${deleteDialog.contentId}`);
      setDeleteDialog({ open: false, contentId: null });
      fetchContents();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  return (
    <Paper>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Content Management</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/admin/upload')}
        >
          Add New Content
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Downloads</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content._id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>
                  <Chip label={content.type} size="small" />
                </TableCell>
                <TableCell>{content.subjectId.name}</TableCell>
                <TableCell>{content.classId.name}</TableCell>
                <TableCell align="right">
                  {content.isFree ? (
                    <Chip label="Free" color="success" size="small" />
                  ) : (
                    `₹${content.price}`
                  )}
                </TableCell>
                <TableCell align="right">{content.downloads}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/content/${content._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/admin/content/edit/${content._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setDeleteDialog({ 
                    open: true, 
                    contentId: content._id 
                  })}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, contentId: null })}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning color="warning" />
            Confirm Delete
          </Box>
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this content? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, contentId: null })}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ContentList;