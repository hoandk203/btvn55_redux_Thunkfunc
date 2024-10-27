import { createAsyncThunk } from "@reduxjs/toolkit";

const callJobs= createAsyncThunk("callJobs", async ()=>{
    try {
        const response= await fetch(`https://djwp2m-8080.csb.app/jobs`)
        const data= await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
})

export {callJobs}