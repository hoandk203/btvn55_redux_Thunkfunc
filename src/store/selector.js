
const getJobs = (state)=>{
    const searchStr= state.searchStr.searchStr
    const jobs= state.jobs.jobs
    
    if (searchStr) {
        return jobs.filter(job => {
            return job.name.toLowerCase().includes(searchStr.toLowerCase())
        })
    }
    return jobs
}

const getStatusJobs= (state) => state.jobs.status

const getSearchStr= (state) => state.searchStr.searchStr

export { getSearchStr, getJobs, getStatusJobs}