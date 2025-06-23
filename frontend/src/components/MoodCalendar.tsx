import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import { getMoods } from "../api/mood"
import { MoodEntry } from "../views/MoodEntry"
import MoodIcon from "./MoodIcon"

const MoodCalender = ()  => {
    // const [moods, setMoods] = useState<MoodEntry[]>([])
    // const [date, setDate] = useState<Date>(new Date())

    // useEffect(() => {
    //     getMoods().then(setMoods)
    // }, [])

    // const tileContent = ({ date }: { date: Date; view: string }) => {
    //     const mood = moods.find((m) => new Date(m.date).toDateString() === date.toDateString());
    //     return mood ? <MoodIcon mood={mood.mood} /> : null;
    // }

    return (
        <div className="m-4">
            {/* <Calendar 
                onChange={(value) => setDate(value as Date)} 
                value={date} 
                tileContent={tileContent} 
            /> */}
        </div>
    );
}

export default MoodCalender;