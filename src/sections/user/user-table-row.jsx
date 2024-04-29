import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ title, author, tags, body, created, id, key }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow>
        <TableCell>{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          {title}
        </TableCell>

        <TableCell>{author}</TableCell>

        <TableCell>{tags}</TableCell>

        <TableCell align="center">{body}</TableCell>

        <TableCell>{created}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu} sx={{ color: 'blue' }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  title: PropTypes.any,
  author: PropTypes.any,
  tags: PropTypes.any,
  body: PropTypes.any,
  created: PropTypes.any,
  key: PropTypes.any,
  id: PropTypes.any,
};
