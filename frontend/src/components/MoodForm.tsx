import { useState } from "react"
import { postMood } from "../api/mood";

const MoodForm = () => {
    const [mood, setMood] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault()
        // if (!mood) return;

        // await postMood({mood, date: new Date().toISOString()})
        // alert("Mood saved!")
        // setMood("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Select your mood for today:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="">--Select--</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😌 Content</option>
            <option value="neutral">😐 Neutral</option>
            <option value="angry">😠 Angry</option>
            <option value="sad">😢 Sad</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
        </button>
        </form>
    );
};

export default MoodForm;