import React from 'react'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/invoiceSlice'

function Header({ toggle }) {


  const { invoices, filter } = useSelector((state) => state.invoices)
  const dispatch = useDispatch()
  const status = ['draft', 'pending', 'paid', 'all']

  return (
    <div className=' md:flex md:justify-between justify-center items-center mb-8 lg:mb-0'>
      <div>
        <h1 className=' text-3xl  font-bold text-white mb-2'>Invoices</h1>
        <p>{invoices.length === 0 ? 'There are no Invoices available' : `There are ${invoices.length} Total Invoices`}</p>
      </div>
      <div className=' flex items-center justify-between  space-x-4'>
        <Menu as='div' className='relative'>
          <MenuButton className=' flex items-center  space-x-2 text-white'>
            <Filter size={20} />
            <span>Filter by status</span>
          </MenuButton>

          <MenuItems className=' absolute lg:right-0 w-48 mt-2 p-2 bg-slate-800 rounded-lg shadow-lg z-10'>
            {status.map((item, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-slate-900' : ''} w-full text-left px-4 py-2 rounded-lg capitalize ${filter === item ? ' text-red-500' : 'text-white'} `}
                    onClick={() => dispatch(setFilter(item))}
                  >{item}</button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <button className=' bg-slate-700  hover:bg-violet-600 text-white px-4 py-2  flex items-center space-x-2'>
          <div className=' flex items-center space-x-2' onClick={toggle}>
            <Plus size={16} />
            <span>New Invoice</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Header
