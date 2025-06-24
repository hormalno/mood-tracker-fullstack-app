import { MoodType, moodIcons } from "./MoodType";

type Props = {
    mood: MoodType;
}

const MoodIcon = ({mood}: Props) => {
    return <span>{moodIcons[mood] || "❓"}</span>
}

export default MoodIcon;