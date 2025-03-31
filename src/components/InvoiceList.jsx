import { format, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedInvoice } from '../store/invoiceSlice';

function InvoiceList() {
  const { invoices, filter } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'all') return true
    else {
      return invoice.status === filter;
    }
  });

  if (filteredInvoices.length === 0) {

    return (
      <div className='space-y-5 mt-8 text-center'>
        <p className='text-slate-400'>No invoices available.</p>
      </div>
    );
  }

  const invoiceClick = (invoice) => {
    dispatch(setSelectedInvoice(invoice));

  }


  const formDate = (date) => {
    try {
      return format(parseISO(date), 'dd-MMM-yyyy');
    } catch (error) {
      console.error(error);
      return 'Invalid Date';
    }
  };

  return (
    <div className='space-y-5 mt-8'>
      {invoices.length === 0 ? (
        <p className='text-slate-400'>No invoices available.</p>
      ) : (
        filteredInvoices.map((invoice) => (
          <div
            className=' bg-slate-800 hover:bg-slate-700 p-6 rounded-lg shadow-lg flex items-center justify-between transition-colors duration-200 cursor-pointer'
            key={invoice.id} onClick={() => invoiceClick(invoice)}
          >
            <div className=' flex items-center space-x-4'>
              <span className='text-slate-400 '>{invoice.id}</span>
              <span className='text-slate-400'>Due {invoice.dueDate ? formDate(invoice.dueDate) : 'Invalid Date'}</span>
              <span className='text-slate-300'>{invoice.clientName}</span>
            </div>
            <div className=' flex items-center space-x-4'>
              <span className='text-2xl font-bold '>${invoice.amount?.toFixed(2)}</span>
              <div
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${invoice.status === 'paid'
                  ? 'bg-green-900 text-green-200'
                  : invoice.status === 'pending'
                    ? 'bg-yellow-700 text-white'
                    : 'bg-slate-700 text-slate-400'}`
                }>
                <span className='text-2xl capitalize '>{invoice.status}</span>
              </div>
              <ChevronRight className=' text-violet-500' />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default InvoiceList;