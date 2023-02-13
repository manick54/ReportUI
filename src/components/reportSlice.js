import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {getDrawerList, getFilterList}from './reportApi'; 

const initialState = {
    loading : false,
    drawerList: [],
    filterList:[]
    }
  
export const getDrawerListAsync =  createAsyncThunk(
    'header/getDrawerList',
    async(__ , {dispatch, getState}) => {
        console.log("====>>");
         dispatch(SetLoading());
         
       // const promise = await getDrawerList(param);
        //const data = _.get(promise, 'data');
        return getDrawerList();
})

export const getFilterListAsync =  createAsyncThunk(
    'header/getFilterList',
    async(__ , {dispatch, getState}) => {
        console.log("====>>");
         dispatch(SetLoading());
         
       // const promise = await getDrawerList(param);
        //const data = _.get(promise, 'data');
        return getFilterList();
})



export const ReportComponentSlice = createSlice({
    name : 'report',
    initialState,
    reducers : {
        SetLoading: (state, { }) => {
            state.loading = true;
        }
       
       },
    extraReducers : (builder) => {
      builder
        .addCase(getDrawerListAsync.fulfilled, (state, { payload}) => {
            state.drawerList = payload;
            state.loading = false;
        })
        .addCase(getFilterListAsync.fulfilled, (state, { payload}) => {
            state.filterList = payload;
            state.loading = false;
        })
    } 
})

const { actions, reducer } = ReportComponentSlice;

export const { SetLoading } = actions;

export const drawerListJson = (state) => state.reportReducer.drawerList;
export const filterListJson = (state) => state.reportReducer.filterList;

export default reducer;
