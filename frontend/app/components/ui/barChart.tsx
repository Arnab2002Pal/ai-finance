import { Bar } from "react-chartjs-2";

function App() {
    return (
        <div className="">
            <div className="max-w-96">
                <Bar
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["1st bar", "2nd bar"],
                        datasets: [
                            {
                                // Label for bars
                                // Data or value of your each variable
                                data: [20, 40],
                                // Color of each bar
                                backgroundColor:
                                    ["red", "yellow"],
                                // Border color of each bar
                                borderColor: ["aqua", "green", "red", "yellow"],
                                borderWidth: 0.5,
                            },
                        ],
                    }}
                    // Height of graph
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default App;
