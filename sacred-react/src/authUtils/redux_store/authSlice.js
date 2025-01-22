import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:localStorage.getItem('isAuthenticated') || false,
        user:localStorage.getItem('user') || '',
        user_type:localStorage.getItem('user_type') || '',
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