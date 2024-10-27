import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { TextField } from '@mui/material';

import { getSearchStr } from '../../store';
import { searchStrReducer } from '../../store';

export default function () {
    const dispatch= useDispatch();
    const searchStr= useSelector(getSearchStr)
    
    const onInput= (e)=>{
        dispatch(searchStrReducer.actions.input(e.target.value));
    }
  return (
    <div style={{width: "300px"}}>
        <TextField
          value={searchStr || ""}
          onChange={onInput}
          name={"searchStr"}
          label="Search..."
          type="text"
          fullWidth
        />
    </div>
  )
}
