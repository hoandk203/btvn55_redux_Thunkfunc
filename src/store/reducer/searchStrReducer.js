import { createSlice } from "@reduxjs/toolkit"

const initialState= {
    searchStr: "",
}

const searchStrSlice= createSlice({
    name:'searchStr',
    initialState,
    reducers: {
        input: (state, action) => {
            state.searchStr= action.payload
        }
    }
})

export default searchStrSlice