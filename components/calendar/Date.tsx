import React from 'react'

const Date = ({day,index}:{day:any,index:number}) => {
  return (
    <div className='grow'> <p key={index} className='flex flex-col border-l-[1px] items-center justify-center  border-[#2222221c] '><span>{day[0]}</span> <span>{day[1]}</span></p></div>
  )
}

export default Date