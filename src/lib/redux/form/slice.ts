import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  email: string;
  password: string;
};

export const initialState: InitialState = {
  email: '',
  password: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<InitialState>) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
});

export const { setFormState } = formSlice.actions;
export const formReducer = formSlice.reducer;
