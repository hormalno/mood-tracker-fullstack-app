import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Alert, Box } from '@mui/material';
import MoodIcon from './MoodIcon';
import { getMoods } from '../api/mood';
import useAuth from '../hooks/useAuth';
import { MoodEntry } from '../views/MoodEntry';
import { MoodType } from './MoodType';

// Helper to get moods for the month and map them by day
async function fetchMonthMoods(date: Dayjs) {
  const moods = await getMoods();
  const moodsForMonth = moods.filter((mood: MoodEntry) => dayjs(mood.date).isSame(date, 'month'));
  const moodMap: Record<number, string> = {};
  moodsForMonth.forEach((mood: MoodEntry) => {
    moodMap[dayjs(mood.date).date()] = mood.mood;
  });
  const daysToHighlight = Object.keys(moodMap).map(Number);
  return { daysToHighlight, moodMap };
};

// Custom day component to show mood icons
function ServerDay(props: PickersDayProps & { highlightedDays?: number[], moodMap?: Record<number, string> }) {
  const { highlightedDays = [], moodMap = {}, day, outsideCurrentMonth, ...other } = props;
  const dayNum = day.date();
  const isSelected = !outsideCurrentMonth && highlightedDays.includes(dayNum);
  const mood = moodMap[dayNum];

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected && mood ? <MoodIcon mood={mood as MoodType} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

const MoodCalendar = () => {
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [moodMap, setMoodMap] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchHighlightedDays = useCallback((date: Dayjs) => {
    setIsLoading(true);
    setError(null);
    const controller = new AbortController();
    fetchMonthMoods(date)
      .then(({ daysToHighlight, moodMap }) => {
        setHighlightedDays(daysToHighlight);
        setMoodMap(moodMap);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message || "Failed to load moods.");
          setIsLoading(false);
        }
      });
    requestAbortController.current = controller;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchHighlightedDays(dayjs());
    return () => requestAbortController.current?.abort();
  }, [isAuthenticated, fetchHighlightedDays]);

  const handleMonthChange = useCallback((date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  }, [fetchHighlightedDays]);

  const handleDateSelect = (date: Dayjs | null) => {
    if (date && highlightedDays.includes(date.date())) {
      navigate(`/mood/${date.format("YYYY-MM-DD")}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Alert severity="warning">You must be logged in to see your mood calendar.</Alert>
      </Box>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{ transform: "scale(2)", transformOrigin: "top center" }}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            onChange={handleDateSelect}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{ day: ServerDay }}
            slotProps={{
              day: {
                highlightedDays,
                moodMap,
              } as any,
            }}
          />
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default MoodCalendar;