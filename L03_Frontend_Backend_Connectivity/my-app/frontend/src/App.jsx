import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/jokes/");
                setJokes(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="app-container">
            <header>
                <h1>All Jokes Received From Server</h1>
                <h2>Total Jokes Received: {jokes.length}</h2>
            </header>
            <main>
                <table className="jokes-table" border={"2px"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Joke Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jokes.map((currJoke) => (
                            <tr key={currJoke.id}>
                                <td>{currJoke.id}</td>
                                <td style={{ textAlign: "left" }}>
                                    {currJoke.content.length > 100
                                        ? currJoke.content.slice(0, 100) + "..."
                                        : currJoke.content}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default App;
