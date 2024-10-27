import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './reducer/jobsReducer.js'
import searchStrReducer from "./reducer/searchStrReducer.js";

const reducer = configureStore({
    reducer: {
        searchStr: searchStrReducer.reducer,
        jobs: jobsReducer.reducer,
    }
})

export default reducer
export * from './selector.js'

export {jobsReducer, searchStrReducer}