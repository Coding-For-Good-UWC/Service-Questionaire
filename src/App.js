import "./App.css";
import MCQ from "./templates/mcq/mcq";
import { Container } from "react-bootstrap";
import { useData } from "./useData";
import React, { useState } from "react";

export default function App() {
    let questions = require("./data/questions.json");
    const [question, setQuestion] = useState(0);

    const { data, setData } = useData();

    const sort_data = (input) => {
        // Removes the options that were never picked.
        let sdg = {};

        for (const [key, value] of Object.entries(input)) {
            if (value > 0) {
                sdg[key] = value;
            }
        }

        // Blatantly Stolen from: https://www.educative.io/edpresso/how-can-we-sort-a-dictionary-by-value-in-javascript
        let items = Object.keys(sdg).map((key) => {
            return [key, sdg[key]];
        });

        items.sort((first, second) => {
            return first[1] - second[1];
        });

        let keys = items.map((e) => {
            return e[0];
        });

        return keys.reverse();
    };

    if (question == questions.length) {
        console.log(data);
        // Sort SDGs
        let sorted_sdg = sort_data(data.sdg);
        console.log(sorted_sdg);

        return (
            <Container>
                <div className="content-container">
                    <h1>Results</h1>
                    <h4>Grade: {data.grade}</h4>
                    <h4>SDGs in order of interest:</h4>
                    <ul>
                        {sorted_sdg.map((obj, key) => {
                            return <li key={key}>{obj}</li>;
                        })}
                    </ul>
                </div>
            </Container>
        );
    }

    return (
        <div className="App">
            <Container>
                <MCQ
                    content={questions[question]}
                    index={question}
                    setData={setData}
                    setQuestion={setQuestion}
                />
            </Container>
        </div>
    );
}
