import { MoodEntry } from "../views/MoodEntry";
import api from "../services/Axios";

// Get all moods
export const getMoods = async (): Promise<MoodEntry[]> => {
  try {
    const res = await api.get<MoodEntry[]>("/api/mood/");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching moods:", error);
    throw new Error("Failed to load moods");
  }
};

// Post a new mood
export const postMood = async (moodData: { date: string; mood: string }): Promise<void> => {
  try {
    await api.post("/moods", moodData);
  } catch (error: any) {
    console.error("Error posting mood:", error);
    throw new Error("Failed to create mood");
  }
};