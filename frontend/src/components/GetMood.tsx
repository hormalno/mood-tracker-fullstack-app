import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Alert } from "@mui/material";
import { getMoodByDate } from '../api/mood';
import MoodIcon from "./MoodIcon";
import { MoodType } from './MoodType';
import { MoodEntry } from '../views/MoodEntry';

const GetMood = () => {
    const { date } = useParams<{ date: string }>();
    const [mood, setMood] = useState<MoodEntry | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (date) {
            getMoodByDate(date)
                .then((entry) => {
                    setMood(entry);
                    setError(null);
                })
                .catch((err) => {
                    setMood(null);
                    setError(err.message || "No mood found for this date.");
                });
        }
    }, [date]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Mood for {date}:
            </Typography>
            {mood && (
                <>
                    <Typography>
                        <MoodIcon mood={mood.mood as MoodType} /> {mood.mood}
                    </Typography>
                    {mood.note && <Typography sx={{ mt: 2 }}>Note: {mood.note}</Typography>}
                </>
            )}
        </Box>
    );
};

export default GetMood;