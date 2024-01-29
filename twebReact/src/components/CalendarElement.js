import * as React from 'react';
import Calendar from 'react-calendar';
import '../style/global.css';
import '../style/calendar.css';

export default function CalendarElement({ gameDates, onDateClick }) {
  // Calcola se la data è nel weekend
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Domenica, 6 = Sabato
  };

  return (
    <Calendar
      calendarType="gregory"
      onClickDay={(value) => onDateClick(value)}
      tileContent={({ date, view }) => {
        const hasGames = gameDates.includes(date.toDateString());
        return hasGames ? <div className="game-day-dot">•</div> : null;
      }}
      tileClassName={({ date, view }) => {
        const classes = [];
        const hasGames = gameDates.includes(date.toDateString());
        if (hasGames) classes.push('tile--hasActive');
        if (isWeekend(date)) classes.push('react-calendar__tile--weekend');
        return classes.join(' ');
      }}
    />
  );
}

// import React, { useState, useMemo } from 'react';
// import Fab from '@mui/material/Fab';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import Select from '@mui/material/Select';

// const CalendarElement = ({ gameDates, onDateClick }) => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(
//     new Date().getFullYear().toString()
//   );
//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().getMonth().toString()
//   );
//   const [startIndex, setStartIndex] = useState(0);
//   const [endIndex, setEndIndex] = useState(10);

//   // Funzione helper per convertire il mese da formato testuale a numero
//   const getMonthNumber = (monthName) => {
//     const months = {
//       Jan: '01',
//       Feb: '02',
//       Mar: '03',
//       Apr: '04',
//       May: '05',
//       Jun: '06',
//       Jul: '07',
//       Aug: '08',
//       Sep: '09',
//       Oct: '10',
//       Nov: '11',
//       Dec: '12',
//     };
//     return months[monthName];
//   };
//   const uniqueGameDates = useMemo(() => {
//     return Array.from(new Set(gameDates));
//   }, [gameDates]);

//   // Estrai solo mese e giorno dalle date e crea un array di anni unici
//   const processedDates = useMemo(() => {
//     const dates = uniqueGameDates.map((dateString) => {
//       const parts = dateString.split(' '); // Es. ["Fri", "Feb", "17", "2023"]
//       const year = parts[3];
//       const month = getMonthNumber(parts[1]); // Converte il mese in numero
//       const day = parts[2].padStart(2, '0'); // Assicurati che il giorno abbia sempre due cifre
//       const fullDate = `${year}-${month}-${day}`; // Formato 'YYYY-MM-DD'
//       return { fullDate, day, month, year };
//     });
//     return dates;
//   }, [uniqueGameDates]);
//   console.log(processedDates);

//   const uniqueYears = useMemo(() => {
//     const years = new Set(processedDates.map((date) => date.year));
//     return Array.from(years);
//   }, [processedDates]);

//   const uniqueMonths = useMemo(() => {
//     const months = new Set(processedDates.map((date) => date.month));
//     return Array.from(months);
//   }, [processedDates]);

//   const handleDateClick = (date) => {
//     setSelectedDate(date.fullDate);
//     onDateClick(date.fullDate);
//   };

//   const handleLeftArrowClick = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//       setEndIndex(endIndex - 1);
//       setSelectedDate(processedDates[startIndex - 1].fullDate);
//     }
//   };

//   const handleRightArrowClick = () => {
//     if (endIndex < processedDates.length) {
//       setStartIndex(startIndex + 1);
//       setEndIndex(endIndex + 1);
//       setSelectedDate(processedDates[startIndex + 1].fullDate);
//     }
//   };

//   return (
//     <div className="container-component">
//       <div>
//         <Select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//         >
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </Select>
//         <Select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {uniqueMonths.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </Select>
//       </div>
//       <div className="calendar-container">
//         <div>
//           <Fab
//             color="primary"
//             aria-label="add"
//             onClick={() => handleLeftArrowClick()}
//           >
//             <KeyboardArrowLeftIcon />
//           </Fab>
//         </div>
//         <div className="calendar">
//           {processedDates
//             .filter((date) => date.year === selectedYear)
//             .filter((date) => date.month === selectedMonth)
//             .map((date, index) => (
//               <div
//                 key={index}
//                 className={`calendar-date ${
//                   date.fullDate === selectedDate ? 'selected-date' : ''
//                 }`}
//                 onClick={() => handleDateClick(date)}
//               >
//                 {`${date.day}`}
//               </div>
//             ))}
//         </div>
//         <div>
//           <Fab
//             color="primary"
//             aria-label="add"
//             onClick={() => handleRightArrowClick()}
//           >
//             <KeyboardArrowRightIcon />
//           </Fab>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarElement;
