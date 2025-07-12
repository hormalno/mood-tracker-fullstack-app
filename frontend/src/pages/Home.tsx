import MoodCalendar from "../components/MoodCalendar";
import MoodNavbar from "../components/MoodNavbar";

const Home = () => {
    return (
        <div>
            <MoodNavbar />
            <h1>Welcome to the Mood Tracker v4</h1>
            <MoodCalendar />
        </div>
    );
}

export default Home;