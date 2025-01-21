import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:localStorage.getItem('isAuthenticated') || false,
        username:localStorage.getItem('username') || '',
        user:localStorage.getItem('user') || '',
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.username=action.payload;
            state.user=action.payload

        } ,
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.username='';
            state.user=''
        }
    }
}
);

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;