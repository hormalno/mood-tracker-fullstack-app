type Props = {
    mood: string;
}

const MoodIcon = ({mood}: Props) => {
    const icons: Record<string, string> = {
        happy: "😊",
        content: "😌",
        neutral: "😐",
        angry: "😠",
        sad: "😢",
    }
    return <span>{icons[mood] || "❓"}</span>
}

export default MoodIcon;