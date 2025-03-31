import { createSlice } from "@reduxjs/toolkit";
import { format, addDays } from "date-fns";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {
        invoices: [],
        filter: 'all',
        selectedInvoice: null,
        isFormOpen: false,
      };
    }
    return JSON.parse(serializedState);
  } catch {
    return {
      invoices: [],
      filter: 'all',
      selectedInvoice: null,
      isFormOpen: false,
    };
  }
};

const initialState = loadState();

const calcAmount = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

const storedState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    console.error("An error occurred while storing the state.");
  }
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      const newInvoice = {
        ...action.payload,
        amount: calcAmount(action.payload.items),
        status: action.payload.status || 'pending',
        dueDate: action.payload.dueDate || format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      };
      state.invoices.push(newInvoice);
      storedState(state);
      state.isFormOpen = false;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      state.isFormOpen = false;
    },

    markAsPaid: (state, action) => {
      const invoice = state.invoices.find((invoice) => invoice.id === action.payload);
      if (invoice) {
        invoice.status = 'paid';
        state.selectedInvoice = null;
        state.isFormOpen = false;
        storedState(state);
      }
    },

    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      state.selectedInvoice = null;
      storedState(state);
    },
  },
});

export const { toggleForm, addInvoice, setFilter, setSelectedInvoice, markAsPaid, deleteInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
