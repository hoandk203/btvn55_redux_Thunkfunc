import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';



import { createJobsThunk } from "../../store/reducer/jobsReducer";

export default function () {
    const dispatch = useDispatch();
    const [input, setInput] = useState({ id: uuidv4(), name: "", priority: "Low" });

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const onSave = () => {
        if (!input.name || !input.priority) {
            toast.warning("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if(input.name.length > 30){
            toast.warning("Tên công việc không quá 30 ký tự");
            return;
        }
        dispatch(createJobsThunk(input));
        setInput({ id: uuidv4(), name: "", priority: "Low" });
    };

    return (
        <div style={{marginTop: "10px", width: "300px", display: "flex", flexDirection: "column", gap: "10px"}}>
            <TextField
                value={input.name || ""}
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
                    value={input.priority}
                    label="Priority"
                    onChange={onChange}
                >
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={onSave} variant="contained">Save</Button>
        </div>
    );
}
