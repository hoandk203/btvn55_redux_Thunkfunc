import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

import { updateJobsThunk } from '../../../store/reducer/jobsReducer.js';

const JobsDialog = memo(function JobsDialog({open, handleClose, currJob, setCurrJob}) {
    const dispatch= useDispatch();
    const onChange = (e) => {
        setCurrJob({...currJob, [e.target.name]: e.target.value});
    }

    const onUpdate=()=>{
        if(!currJob.name || !currJob.priority){
            toast.warning("Vui điền đầy đủ thông tin");
            return;
        }
        if(currJob.name.length > 30){
          toast.warning("Tên công việc không quá 30 ký tự");
          return;
      }
        dispatch(updateJobsThunk(currJob));
        handleClose();
    }

  return (
    <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"Update Job"}
        </DialogTitle>
        <DialogContent style={{paddingTop: "20px"}}>
            <TextField
                value={currJob.name || ""}
                onChange={onChange}
                name={"name"}
                label="Task name..."
                type="text"
            />
            <FormControl >
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={"priority"}
                    value={currJob.priority}
                    label="Priority"
                    onChange={onChange}
                >
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
})

export default JobsDialog