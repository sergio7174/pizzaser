import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  pizzas: [],
  pizza:{},
  filters: {
    /*price: [4000],*/
    search: "",
    /*image: "",*/
  },
  loading: false,
  createPizzaEntry: {
    loading: false,
    error: false,
    success: false,
    message: null,
    
  },
};
// createPizzaEntryAction
export const createPizzaEntry = createAsyncThunk("pizza/createPizzaEntry",



  async (values, { rejectWithValue, fulfillWithValue}) => {
    
    try {
      alert("Estoy en pizzaSlice - line 24 :");
      const { data } = await axios.post("/pizza/createPizza", values);
       
      //return data;
      alert ("data: "+ data)
     
      return fulfillWithValue(data);
      
    } catch (err) {
      alert("err.response.data: "+err.response.data)
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPizzas = createAsyncThunk(
  "pizza/getPizzas",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/pizza/getAll");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters.price = action.payload.price;
      state.filters.search = action.payload.search;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state) => {
        state.loading = true;
        state.pizzas = [];
      })
      .addCase(getPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.pizzas = action.payload;
      })
      .addCase(getPizzas.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createPizzaEntry.pending, (state) => {
        alert("estoy en createPizzaEntry.pending - line 77")
        state.createPizzaEntry.loading = true;
        state.createPizzaEntry.error = false;
        state.createPizzaEntry.success = false;
        state.createPizzaEntry.message = "Creando ...";
      })

      // If our data fetch is successful, the posts/getPosts/fulfilled action type gets dispatched.
      //.addCase(createPizzaEntry.fulfilled, (state, action) => {
        .addCase(createPizzaEntry.fulfilled, (state, {payload}) => {
        alert("estoy en fulfilled - line 86")
        state.createPizzaEntry.loading = false;
        state.createPizzaEntry.error = false;
        state.createPizzaEntry.success = true;
       
        //state.createPizzaEntry.createPizzaEntry = action.payload.createPizzaEntry;
        //state.createPizzaEntry.message = action.payload;
        alert("estoy en fulfilled - line 89,payload.message: "+payload.message)
        state.createPizzaEntry.message = payload.message;
        
      })
      //In the event of an error, posts/getPosts/rejected is dispatched and createAsyncThunk should either return a rejected promise containing an Error instance

      .addCase(createPizzaEntry.rejected, (state, action) => {
        alert("estoy en createPizzaEntry - rejected - line 101")
        state.createPizzaEntry.loading = false;
        state.createPizzaEntry.error = true;
        state.createPizzaEntry.success = false;
        state.createPizzaEntry.message = action.payload.message;
      })
  },
});

export const { setFilters, clearFilters } = pizzaSlice.actions;

export default pizzaSlice.reducer;
