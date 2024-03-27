import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import UserInputForm from './UserInputForm';


export default function App() {
  const URL = "http://localhost:8080/donation";

  const [donations, setDonations] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [edittingDonation, setEdittingDonation] = useState();

  useEffect(() => {
    axios.get(URL)
      .then(response => {
        setDonations(response.data);
      }).catch(err => {
        console.log(err)
      })
  }, []);

  function handleDeleteDonation(e) {
    e.preventDefault();
    const deleteId = e.currentTarget.value;
    axios.delete(`${URL}/${deleteId}`)
      .then(response => {
        if (response.status === 200) {
          setDonations(donations.filter(v => v.id !== deleteId));
        }
      }).catch(err => {
        console.log(err);
      })
  }

  function handleOpenEditDonation(e) {
    setOpenEdit(true);
    setEdittingDonation(donations.find(v => v.id === e.currentTarget.value));
  };

  function handleUpdateDonation(updatedDonation) {
    const updated = donations.map(v => v.id !== updatedDonation.id ? v : updatedDonation);
    setDonations(updated);
    setOpenEdit(false);
  }

  function handleClose() {
    setOpenEdit(false);
  };

  return (
    <div className="container m-auto">
      <div className="row">
        <div className="col shadow p-3">
          <UserInputForm onSave={v => setDonations([...donations, v])}/>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col shadow">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Donor's Name</TableCell>
                  <TableCell align="right">Type of Donation</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  donations.map(donation => {
                    const { id, donor, amount, type, date } = donation;
                    return (
                      <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {donor}
                        </TableCell>
                        <TableCell align="right">{type}</TableCell>
                        <TableCell align="right">{type === "Money" ? `$${amount}` : `${amount} lb.`}</TableCell>
                        <TableCell align="right">{dayjs(date).format("MMM. DD YYYY")}</TableCell>
                        <TableCell align="right">
                          <IconButton value={id} onClick={handleOpenEditDonation} sx={{marginRight: "20px"}}><EditIcon /></IconButton>
                          <IconButton value={id} onClick={handleDeleteDonation}><DeleteIcon sx={{ color: "red"}} /></IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Dialog
        open={openEdit}
        onClose={handleClose}
      >
        <DialogTitle>Edit Donation</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <UserInputForm dialog values={edittingDonation} onSave={handleUpdateDonation}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}
