import React,{useState,useEffect} from 'react';
import { NextPage } from 'next';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { eachYearOfInterval,eachMonthOfInterval, eachDayOfInterval,getDaysInMonth } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
// const returnDays = (month:any) =>{
  //   return eachDayOfInterval({
//     start: new Date(everyear[currentYearIndx].getFullYear(),month,1)
//     end: new Date(everyear[currentYearIndx].getFullYear(),month,1)
//   })
// }
const TopCalendar:NextPage = ():JSX.Element => {
  const [currentYearIndx,setcurrentYearIndx] = useState(everyear.length-1);
  const [currentMonthIndx,setCurrentMonthIndx] = useState(now.getMonth());
  
  console.log(getDaysInMonth(everymonth[currentMonthIndx]))
  //handlers
  const setNextYearHandler = ():void => {
      if(currentYearIndx < everyear.length - 1){
        setcurrentYearIndx(() => currentYearIndx + 1);
      }else{
        return
      }
  }
  const setPreviousYearHandler = () => {
    if(currentYearIndx > 0){
      setcurrentYearIndx(() => currentYearIndx - 1);
    }else{
      return
    }
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
      <select defaultValue={'DEFAULT'}>
          {everymonth.map((month,index) => <option  value={index === currentMonthIndx ? 'DEFAULT' : month.toDateString().split(' ')[1]}  key={index}>{monthNames[index]}</option>)}
      </select>
    
    </div>
  )
}

export default TopCalendar  