import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import { getJobs, getStatusJobs } from "../../store";
import { deleteJobsThunk } from "../../store/reducer/jobsReducer.js";
import JobsDialog from "./components/JobsDialog.jsx";
import { callJobs } from "../../store/middlewares/jobsMiddleware.js";

export default function () {
    
    const dispatch = useDispatch();
    const jobs = useSelector(getJobs);
    const statusJobs= useSelector(getStatusJobs)
    
    const [showDialog, setShowDialog] = useState(false);
    const [currJob, setCurrJob] = useState({});

    useEffect(() => {
        dispatch(callJobs());
    }, []);

    const handleCloseDialog = useCallback(() => {
        setShowDialog(false);
    }, []);

    const onUpdate = (job) => {
        setCurrJob(job);
        setShowDialog(true);
    };
    const onDelete = (id) => {
        dispatch(deleteJobsThunk(id));
    };

    return (
        <div style={{minWidth: "540px", marginTop: "50px"}}>
            <ToastContainer position="top-right" autoClose={2000}/>
            {statusJobs === "error" && <h3>Không tìm thấy dữ liệu</h3>}
            {statusJobs === "loading"
            ? <h3>Loading...</h3> 
            :<TableContainer component={Paper} sx={{ maxWidth: 650, boxShadow: "0px 0px 5px 5px #ccc"}}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#777" }}>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {jobs.map((row, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.priority}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => {onUpdate(row)}} style={{ marginLeft: "10px", width: "30px" }} variant="contained" color="success">
                                    <EditIcon fontSize="small" />
                                </Button>
                                <Button onClick={() => {onDelete(row.id)}} style={{ marginLeft: "10px", width: "30px" }} variant="contained" color="error">
                                    <DeleteIcon fontSize="small" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <JobsDialog open={showDialog} handleClose={handleCloseDialog} currJob={currJob} setCurrJob={setCurrJob}/>
            
        </div>
    );
}
