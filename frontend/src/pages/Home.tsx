
import MoodCalender from "../components/MoodCalendar";
import MoodForm from "../components/MoodForm";
import MoodNavbar from "../components/MoodNavbar";

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Mood Tracker</h1>
            <MoodNavbar />
            {/* <MoodForm />
            <MoodCalender /> */}
        </div>
    );
}

export default Home;