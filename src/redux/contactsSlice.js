import { toast } from "react-toastify";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./contactsOps.js";
import { nameFilter } from "./filtersSlice.js";

const rejected = (state, action) => {
	state.error = action.payload;
	state.loading = false;
	toast.error(`${action.payload}`, {
		position: "top-right",
		theme: "colored",
	});
};

const pending = (state) => {
	state.loading = true;
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, pending)
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, rejected)
			.addCase(addContact.pending, pending)
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, rejected)
			.addCase(deleteContact.pending, pending)
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const index = state.items.findIndex(
					(contact) => contact.id === action.payload.id
				);
				state.items.splice(index, 1);
			})
			.addCase(deleteContact.rejected, rejected);
	},
});

export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
	[selectContacts, nameFilter],
	(contacts, filter) => {
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		);
	}
);

export const contactsReducer = contactsSlice.reducer;
export const contactsLoading = (state) => state.contacts.loading;
