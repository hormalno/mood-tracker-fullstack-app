import { MoodEntry } from "../views/MoodEntry";
import api from "../services/Axios";

export const getMoods = async (): Promise<MoodEntry[]> => {
    const res = await api.get("/moods")
    return res.data
}

export const postMood = async (moodData: MoodEntry): Promise<string> => {
  await api.post("/moods", moodData);
  return "Mood created!";
};