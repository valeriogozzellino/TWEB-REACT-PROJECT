import * as React from 'react';
import Calendar from 'react-calendar';
import '../style/global.css';
import '../style/calendar.css';

/**
 * CalendarElement Component:
 *
 * Provides a calendar interface for displaying dates with specific events (e.g., game dates).
 *
 * Behavior:
 * - Highlights the dates that have events.
 * - Allows clicking on dates to perform actions (e.g., showing games on that date).
 *
 * @param {Array} gameDates The dates of games.
 * @param {Function} onDateClick Function to handle clicking on a date.
 * @returns {JSX.Element} The JSX for the CalendarElement component.
 */

export default function CalendarElement({ gameDates, onDateClick }) {
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
