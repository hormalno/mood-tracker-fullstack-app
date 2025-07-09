import MoodCalendar from "../components/MoodCalendar";
import MoodNavbar from "../components/MoodNavbar";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Mood Tracker</h1>
            <p>Track your mood and see your progress over time.</p>
            <MoodNavbar />
            <MoodCalendar />
        </div>
    );
}

export default Home;