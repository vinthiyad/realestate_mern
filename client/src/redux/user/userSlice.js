import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentuser : "null",
    loading:false,
    error : null,
};  

const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        signinstart: (state) =>{
            state.loading = true;
        },
        signinsuccess: ( state,action) =>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinfailure: ( state ,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const {
    signinstart,
    signinsuccess,
    signinfailure}  = userSlice.actions;
export default userSlice.reducer;