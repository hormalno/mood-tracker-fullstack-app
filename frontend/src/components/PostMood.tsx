import { useState } from "react"
import { postMood } from "../api/mood"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Alert, Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { moodList } from "./MoodType";
import MoodIcon from "./MoodIcon";

const PostMood = ()  => {
    const [mood, setMood] = useState("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    

    const handleSubmit = async () => {
        if (!date || !mood) {
            setError("Please select a date and a mood.");
            return;
        }
        setError("");
        setSuccess(false);

        try {
            await postMood({
                date: date.format("YYYY-MM-DD"),
                mood: mood                
            })
            setMood("")
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong!")
        }

    }
    
    return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Log Your Mood
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </LocalizationProvider>

      <TextField
        select
        fullWidth
        label="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        margin="normal"
      >
        {moodList.map((option) => (
          <MenuItem key={option} value={option}>
            <MoodIcon mood={option} />&nbsp;{option}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit Mood
      </Button>

      {success && <Alert sx={{ mt: 2 }} severity="success">Mood saved!</Alert>}
      {error && <Alert sx={{ mt: 2 }} severity="error">{error}</Alert>}
    </Box>
  );
}

export default PostMood;