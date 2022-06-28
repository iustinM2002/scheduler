import React,{useState,useEffect} from 'react';
import { NextPage } from 'next';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { eachYearOfInterval,eachMonthOfInterval, eachDayOfInterval,getDaysInMonth } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './Table';

// times getters :)
const now = new Date();
const everyear = eachYearOfInterval({
  start: new Date(1995,1,6),
  end: now
});
const everymonth = eachMonthOfInterval({
  start: new Date(now.getFullYear() - 1,12,12),
  end: new Date(now.getFullYear(),12,12)
});
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const TopCalendar:NextPage = ():JSX.Element => {
  const [currentYearIndx,setcurrentYearIndx] = useState(everyear.length-1);
  const [currentMonthIndx,setCurrentMonthIndx] = useState(now.getMonth());
  const [days,setDays] = useState<Date[]>([])
  // function for returning days of a specific month 
  const returnDays = () =>{
      const daysOfMonth = eachDayOfInterval({
      start: new Date(everyear[currentYearIndx].getFullYear(),currentMonthIndx,1),
      end: new Date(everyear[currentYearIndx].getFullYear(),currentMonthIndx,getDaysInMonth(everymonth[currentMonthIndx]))
    });
    setDays(daysOfMonth)
  }
  useEffect(() =>{
    returnDays();
  } ,[currentMonthIndx])
 
  
  //handlers
  // function made for increase number of year
  const setNextYearHandler = ():void => {
      if(currentYearIndx < everyear.length - 1){
        setcurrentYearIndx(() => currentYearIndx + 1);
      }else{
        return
      }
  }
  // function made for decreasing number of year
  const setPreviousYearHandler = () => {
    if(currentYearIndx > 0){
      setcurrentYearIndx(() => currentYearIndx - 1);
    }else{
      return
    }
  }
  // function made for updating days of the month on state update 
  const revealDaysHandler = (index:number) => {
    setCurrentMonthIndx(index);
  }
  return (
    <div className='font-poppins'>
     
      <div className="py-[1rem] flex">
        <div className="cursor-pointer w-[13px]" onClick={setPreviousYearHandler}>
            <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
        <p className='px-[1rem] '>{everyear[currentYearIndx].getFullYear()}</p>
        <div className="cursor-pointer w-[13px]" onClick={() =>setNextYearHandler()}>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
      </div>
      <select defaultValue={'DEFAULT'} >
          {everymonth.map((month,index) => <option onClick={() => revealDaysHandler(index) } value={index === currentMonthIndx ? 'DEFAULT' : month.toDateString().split(' ')[1]}  key={index}>{monthNames[index]}</option>)}
      </select>
      <div className="flex">
        {days.map((day,index)=> <p key={index} className='flex flex-col'><span>{day.toDateString().split(' ')[0]}</span> <span>{day.toDateString().split(' ')[2]}</span> </p>)}
      </div>
      <Table/>
    </div>
  )
}

export default TopCalendar  