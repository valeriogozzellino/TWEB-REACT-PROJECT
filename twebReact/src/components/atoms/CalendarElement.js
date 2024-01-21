import * as React from 'react';
import Calendar from 'react-calendar';
import '../../style/global.css';

export default function CalendarElement({ gameDates, onDateClick }) {
  return (
    <Calendar
      calendarType="US"
      onClickDay={(value) => onDateClick(value)}
      tileContent={({ date, view }) => {
        const hasGames = gameDates.includes(date.toDateString());
        return (
          <div>
            {hasGames ? '•' : null}
          </div>
        );
      }}
    />
  );
}
