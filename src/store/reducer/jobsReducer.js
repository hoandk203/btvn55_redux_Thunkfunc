import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { callJobs } from "../middlewares/jobsMiddleware";

const SERVER_API= import.meta.env.VITE_SERVER_API;

const initialState = {
    jobs: [],
    status: "idle",
};

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        call: (state, action) => {
            state.jobs = action.payload;
        },
        create: (state, action) => {
            state.jobs.push(action.payload);
        },
        update: (state, action) => {
            state.jobs = state.jobs.map((job) => {
                if (job.id === action.payload.id) {
                    return action.payload;
                }
                return job;
            });
        },
        delete: (state, action) => {
            state.jobs = state.jobs.filter((job) => job.id !== action.payload);
        },
        status: (state, action) => {
            state.status = action.payload;
        },
        error: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers: (builder)=>{
        builder
        .addCase(callJobs.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(callJobs.fulfilled, (state, action)=>{
            state.status = "idle"
            state.jobs = action.payload
        })
        .addCase(callJobs.rejected, (state, action)=>{
            state.status = "error"
        })
    }
});

const callJobsThunk = () => {
    return async function fetchJobsByIdThunk(dispatch, getState) {
        try{
            dispatch(jobsSlice.actions.status("loading"));
            const response = await fetch(`${SERVER_API}`);
            const data = await response.json();
            if(data){
                dispatch(jobsSlice.actions.call(data));
                dispatch(jobsSlice.actions.status("idle"));
                toast.success("Xin chào");
            }
        }catch(error){
            dispatch(jobsSlice.actions.status("error"));
            toast.error("Không tìm thấy dữ liệu");
            console.log(error)
        }
    };
};

const createJobsThunk = (input) => {
    return async function fetchJobsByIdThunk(dispatch, getState) {
        try {
            const response = await fetch(`${SERVER_API}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const data = await response.json();
            if(data){
                dispatch(jobsSlice.actions.create(data));
                dispatch(jobsSlice.actions.status("idle"))
                toast.success("Tạo công việc thành công");
            }
        } catch (error) {
            dispatch(jobsSlice.actions.status("error"));
            toast.error("Tạo công việc thất bại");
            console.log(error);
        }
    };
};

const updateJobsThunk = (currJob) => {
    return async function fetchJobsByIdThunk(dispatch, getState) {
        try {
            const response = await fetch(`${SERVER_API}/${currJob.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currJob),
            });
            const data = await response.json();
            if(data){
                dispatch(jobsSlice.actions.update(data));
                dispatch(jobsSlice.actions.status("idle"))
                toast.success("Cập nhật công việc thành công");
            }
        } catch (error) {
            dispatch(jobsSlice.actions.status("error"));
            toast.error("Cập nhật công việc thất bại");
            console.log(error);
        }
    };
};

const deleteJobsThunk = (id) => {
    return async function fetchJobsByIdThunk(dispatch, getState) {
        try {
            const response = await fetch(`${SERVER_API}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if(response.ok){
                dispatch(jobsSlice.actions.delete(id));
                dispatch(jobsSlice.actions.status("idle"))
                toast.success("Xóa công việc thành công");
            }
            
        } catch (error) {
            dispatch(jobsSlice.actions.status("error"));
            toast.error("Xóa công việc thất bại");
            console.log(error);
        }
    };
};

export default jobsSlice;
export { callJobsThunk, createJobsThunk, deleteJobsThunk, updateJobsThunk };
