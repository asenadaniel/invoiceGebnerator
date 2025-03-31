import { Plus, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { toggleForm, addInvoice } from '../store/invoiceSlice'
import { useDispatch } from 'react-redux'
import { addDays, format, } from 'date-fns'

function InvoiceForm() {

  const [formData, setFormData] = useState(() => {
    return {
      id: `INV-${Math.floor(Math.random() * 1000)}`,
      status: 'pending',
      billFrom: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
      },
      billTo: {
        clientEmail: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
      },
      clientName: '',
      items: [],
      paymentDue: 'net 30 days',
      description: '',
      invoiceDate: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      amountPaid: 0,
    }
  })




  const dispatch = useDispatch()

  const addItem = (e) => {
    e.preventDefault();
    setFormData({ ...formData, items: [...formData.items, { name: '', quantity: 0, price: 0, total: 0 }] })
  }

  const updatedItem = (i, field, value) => {
    const newItems = [...formData.items]
    newItems[i][field] = value
    newItems[i].total = newItems[i].quantity * newItems[i].price
    setFormData({ ...formData, items: newItems })

  }

  const removeItem = (i) => {
    setFormData(prevFormData => {
      const newItems = [...prevFormData.items]
      newItems.splice(i, 1);
      return { ...prevFormData, items: newItems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addInvoice(formData))
    console.log(formData)
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto'>
      <div className=' bg-slate-800 p-8 rounded-lg  mt-32 w-full max-w-2xl mb-8 '>
        <div className='flex justify-between items-center mb-8'>
          <h2 className=' text-2xl font-bold'>New Invoice</h2>
          <button type='button' onClick={() => dispatch(toggleForm())}>
            <X size={24} />
          </button>
        </div>

        <form className=' space-y-6' onSubmit={handleSubmit}
        >
          <div className=' space-y-5'>
            <h3>Bill From</h3>

            <input
              type="text"
              placeholder='street address'
              required
              className=' w-full bg-slate-900 p-4'
              value={formData.billFrom.streetAddress}
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, streetAddress: e.target.value } })
              }
            />
          </div>

          <div className=' grid grid-cols-3 gap-4'>
            <input
              type="text"
              placeholder='city'
              required
              value={formData.billFrom.city}
              className=' w-full bg-slate-900 p-4'
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, city: e.target.value } })
              }
            />
            <input
              type="text"
              placeholder='post code'
              required
              value={formData.billFrom.postCode}
              className=' w-full bg-slate-900 p-4'
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, postCode: e.target.value } })
              }

            />
            <input
              type="text"
              placeholder='country'
              required
              value={formData.billFrom.country}
              className=' w-full bg-slate-900 p-4'
              onChange={(e) => setFormData({ ...formData, billFrom: { ...formData.billFrom, country: e.target.value } })
              }
            />

          </div>


          <div className=' space-y-4'>

            <h3>Bill To</h3>
            <input
              type="text"
              placeholder="Client's Name"
              required
              value={formData.clientName}
              className=' w-full bg-slate-900 p-4'
              onChange={e => setFormData({ ...formData, clientName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Client's Email"
              required
              value={formData.billTo.clientEmail}
              className=' w-full bg-slate-900 p-4'
              onChange={e => setFormData({ ...formData, billTo: { ...formData.billTo, clientEmail: e.target.value } })}
            />
            <input
              type="text"
              placeholder="Street Address"
              required
              className=' w-full bg-slate-900 p-4'
              value={formData.billTo.streetAddress}
              onChange={e => setFormData({ ...formData, billTo: { ...formData.billTo, streetAddress: e.target.value } })}
            />

          </div>



          <div className=' grid grid-cols-3 gap-4'>
            <input
              type="text"
              placeholder='city'
              required
              value={formData.billTo.city}
              onChange={e => setFormData({ ...formData, billTo: { ...formData.billTo, city: e.target.value } })}
              className=' w-full bg-slate-900 p-4'

            />
            <input
              type="text"
              placeholder='post code'
              required
              value={formData.billTo.postCode}
              onChange={e => setFormData({ ...formData, billTo: { ...formData.billTo, postCode: e.target.value } })}
              className=' w-full bg-slate-900 p-4'

            />
            <input
              type="text"
              placeholder='country'
              required
              value={formData.billTo.country}
              onChange={e => setFormData({ ...formData, billTo: { ...formData.billTo, country: e.target.value } })}
              className=' w-full bg-slate-900 p-4'

            />

          </div>

          <div className=' space-y-4'>
            <div className=' grid grid-cols-2 gap-4'>
              <input
                type="date"
                className=' bg-slate-900 rounded-lg p-3'
                value={formData.invoiceDate}
                onChange={e => { const newDate = new Date(e.target.value); setFormData({ ...formData, invoiceDate: newDate, dueDate: format(addDays(newDate, 30), 'yyyy-MM-dd') }) }}
              />
              <select
                className=' bg-slate-900 rounded-lg p-3'
                required
                value={formData.paymentDue}
                onChange={e => setFormData({ ...formData, paymentDue: e.target.value })}
              >
                <option>Net 30 Days</option>
                <option>Net 60 Days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder='Project Description'
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className=' w-full bg-slate-900 p-4'
            />
          </div>

          <div className=' space-y-4  '>
            <h3>Item List</h3>
            {formData.items.map((item, i) => (
              <div className=' grid grid-cols-12 gap-4 items-center ' key={i}>
                <input
                  type="text"
                  placeholder='Item Name'
                  value={item.name}
                  className=' bg-slate-900 rounded-lg p-3 col-span-3'
                  onChange={(e) => updatedItem(i, 'name', e.target.value)}
                />

                <input
                  type="number"
                  placeholder='Quantity'
                  value={item.quantity}
                  className=' bg-slate-900 rounded-lg p-3 col-span-2'
                  min={1}
                  required
                  onChange={(e) => updatedItem(i, 'quantity', parseInt(e.target.value))}
                />

                <input
                  type="number"
                  placeholder='Price'
                  value={item.price}
                  className=' bg-slate-900 rounded-lg p-3 col-span-2'
                  min={0}
                  required
                  step={0.01}
                  onChange={(e) => updatedItem(i, 'price', parseFloat(e.target.value))}
                />

                <div className=' col-span-2 text-right'>
                  ${item.total.toFixed(2)}
                </div>
                <button type='button' className=' text-slate-500 hover:text-red-700' onClick={() => removeItem(i)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <button className=' bg-slate-950 w-full hover:bg-slate-600 text-white p-3 rounded-lg flex items-center justify-center space-x-2' onClick={addItem}>
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          <div className=' flex justify-end space-x-4'>
            <button type='button' className=' w-full bg-slate-950 hover:bg-slate-600 rounded-lg px-6 py-3  text-white'>
              Cancel
            </button>

            <button type='submit' className=' w-full bg-slate-950 hover:bg-slate-600 rounded-lg px-6 py-3  text-white'>
              Create Invoice
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default InvoiceForm
