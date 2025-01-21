import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:localStorage.getItem('isAuthenticated') || false,
        username:localStorage.getItem('username') || '',
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.username=action.payload;

        } ,
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.username='';
        }
    }
}
);

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;