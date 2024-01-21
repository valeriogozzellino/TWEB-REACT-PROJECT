import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import 'dayjs/locale/de';

export default function Calendar({ games, onDateClick }) {
  const renderDay = (date, _value, DayComponentProps) => {
    const dateStr = date.toISOString().split('T')[0];
    const matchingGames = games.filter(game => game.gameDate === dateStr);

    return (
      <div
        style={{
          backgroundColor: matchingGames.length > 0 ? 'green' : 'transparent', // Imposta il colore in base ai giochi associati
          cursor: matchingGames.length > 0 ? 'pointer' : 'default', // Cambia il cursore se ci sono giochi associati
        }}
        onClick={() => onDateClick(dateStr, matchingGames)}
      >
        {DayComponentProps.children}
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar renderDay={renderDay} />
    </LocalizationProvider>
  );
}
