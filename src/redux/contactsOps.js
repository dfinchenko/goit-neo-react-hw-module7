import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66de013ff7bcc0bbdcdf9d5d.mockapi.io";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phoneNumber }, thunkAPI) => {
    try {
      const contacts = thunkAPI.getState().contacts.items;
      const dups = contacts.find(
        (contact) => contact.name === name || contact.number === phoneNumber
      );
      if (dups) {
        return thunkAPI.rejectWithValue("Contact already exists!");
      }
      const response = await axios.post("/contacts", {
        name,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
