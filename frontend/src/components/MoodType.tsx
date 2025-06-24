export const moodList = ["happy", "content", "neutral", "angry", "sad"] as const;

export type MoodType = typeof moodList[number];

export const moodIcons: Record<MoodType, string> = {
  happy: "😊",
  content: "😌",
  neutral: "😐",
  angry: "😠",
  sad: "😢",
};