import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { getMoods } from '../api/mood';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Alert, Box } from '@mui/material';

async function fetchData(date: Dayjs, { signal }: { signal: AbortSignal }) {
  
  const moods = await getMoods();

  const daysToHighlight = moods
    .filter((mood: any) => dayjs(mood.date).isSame(date, 'month'))
    .map((mood: any) => dayjs(mood.date).date());
    console.log("days for highligh", daysToHighlight)
  return { daysToHighlight };  
}

function ServerDay(props: PickersDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

const MoodCalendar = () => {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const isAuthenticated = useAuth().isAuthenticated;

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetchData(date, {signal: controller.signal})
    .then(({ daysToHighlight }) => {
      setHighlightedDays(daysToHighlight);
      setIsLoading(false);
    })
    .catch((error) => {
      if (error.name !== 'AbortError') {
          throw error;
      }
    });

    requestAbortController.current = controller;
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    
    fetchHighlightedDays(dayjs());
    return () => requestAbortController.current?.abort();
  }, [isAuthenticated]);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  if (!isAuthenticated) {
      return (
          <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
              <Alert severity="warning">You must be logged in to see your mood calendar.</Alert>
          </Box>
      );
  }

  return (
    <div style={{display: "flex", justifyContent: "center", }}>
      {isAuthenticated && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            sx={{transform: "scale(2)", transformOrigin: "top center"}}
            defaultValue={dayjs()}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{day: ServerDay}}
            slotProps={{
            day: {
                highlightedDays,
            } as any,
            }}
        />
        </LocalizationProvider>)}
    </div>
  );
}

export default MoodCalendar;