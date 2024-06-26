import React from 'react'
import Barchart from './Barchart'
import Donut from './Donut'

const Main = () => {
  return (
    <div>
<div className="grid grid-cols-8 gap-4">
  <div className="col-span-5 ">
    <Barchart/>
  </div>
  <div className="col-span-3"><Donut/></div>
</div>
    </div>
  )
}

export default Main