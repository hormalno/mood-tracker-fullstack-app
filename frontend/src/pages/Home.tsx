import MoodCalendar from "../components/MoodCalendar";
import MoodNavbar from "../components/MoodNavbar";

const Home = () => {
    return (
        <div>
            <MoodNavbar />
            <h1>Welcome to the Mood Tracker</h1>
            <p>Track your mood and see your progress over time.</p>
            <MoodCalendar />
        </div>
    );
}

export default Home;