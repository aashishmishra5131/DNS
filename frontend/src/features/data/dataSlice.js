import { createSlice} from "@reduxjs/toolkit";


const initialState={
    datas:[],
}
export const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        Name: (state, action) => {
            console.log("Payload:", action);
            state.datas=action.payload;
        },
        removeData: (state, action) => {
            state.datas = state.datas.filter(data => data._id !== action.payload);
          },
          updateData: (state, action) => {
            const newData = action.payload;
            const index = state.datas.findIndex(data => data._id === newData._id);
            if (index !== -1) {
              state.datas[index] = newData;
            }
          }
    },
});

export const {Name,removeData,updateData} = dataSlice.actions;
export default dataSlice.reducer;