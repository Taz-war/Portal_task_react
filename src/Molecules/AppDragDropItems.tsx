import { Checkbox } from '../components/ui/checkbox'
import React from 'react'

const AppDragDropItems = () => {
    const sampleData=[
        {id:1, name:'General'},
        { id: 2, name: 'Custom Modules(Leads)'}
    ]
  return (
      <div className="flex items-center space-x-2 my-4">
          <Checkbox id="terms" className=""/>
          <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
              Accept terms and conditions
          </label>
      </div>
  )
}

export default AppDragDropItems
