import "./App.css";
import MCQ from "./templates/mcq/mcq";
import Result from "./templates/result/result";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useData } from "./useData";
import React, { useState } from "react";

export default function App() {
    let questions = require("./data/questions.json");
    let services = require("./data/services.json");
    // let services = [
    //     {
    //         name: "Global Child Development Centre",
    //         sgds: [4, 10],
    //         tags: ["working_with_children", "education", "dancing"],
    //         grade: [6, 7],
    //         action_type: ["direct"],
    //         service_type: "local_service",
    //     },
    //     {
    //         name: "Hougang Care Centre",
    //         sgds: [3, 10],
    //         tags: ["mental_health", "arts_and_crafts"],
    //         grade: [8],
    //         action_type: ["direct"],
    //         service_type: "local_service",
    //     },
    // ];
    const [question, setQuestion] = useState(0);
    const [start, setStart] = useState(false);

    const { data, setData } = useData();

    const onClick = (e) => {
        e.preventDefault();
        setStart(true);
    };

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

    const filter_grade = (grade, services) => {
        let filtered_services = [];

        for (let element in services) {
            for (let i in services[element].grade) {
                if (services[element].grade[i] == grade) {
                    filtered_services.push(services[element]);
                }
            }
        }

        return filtered_services;
    };

    const score_generator = (data, services) => {
        // SDG score for each service
        let score = { sdgs: [], tags: [] };

        let sdgs = Object.keys(data.sdg);
        let tags = Object.keys(data.tags);

        for (let i = 0; i < services.length; i++) {
            let service = services[i];

            let sdg_score = 0;
            // SDG Loop
            for (let a = 0; a < service.sdgs.length; a++) {
                for (let b = 0; b < sdgs.length; b++) {
                    if (service.sdgs[a] == parseInt(sdgs[b])) {
                        sdg_score += data.sdg[sdgs[b]];
                    }
                }
            }
            score.sdgs.push(sdg_score);

            let tags_score = 0;
            // Tags Loop
            for (let a = 0; a < service.tags.length; a++) {
                for (let b = 0; b < tags.length; b++) {
                    if (service.tags[a] == tags[b]) {
                        tags_score += data.tags[tags[b]];
                    }
                }
            }
            score.tags.push(tags_score);
        }

        let aggregate_score = [];

        for (let i = 0; i < score.sdgs.length; i++) {
            let value = score.sdgs[i] + score.tags[i];
            aggregate_score.push({ score: value, project: services[i] });
        }

        aggregate_score.sort(function (a, b) {
            return b.score - a.score;
        });

        return aggregate_score;
    };

    if (start == false) {
        return (
            <div className="content-container">
                <Container>
                    <h1>Middle School Service Questionaire</h1>
                    <p>
                        Answer a couple questions to find out what service is
                        right for you!
                    </p>
                    <Button
                        className="w-100"
                        style={{ borderRadius: "2rem" }}
                        onClick={onClick}
                    >
                        Get Started
                    </Button>
                </Container>
            </div>
        );
    } else {
        if (question == questions.length) {
            // Sort SDGs
            let sorted_sdg = sort_data(data.sdg);
            let sorted_tags = sort_data(data.tags);

            let recommended_services = services;
            // Filter Grade
            recommended_services = filter_grade(data.grade, services);
            // Find SDGs & tags score for each service
            let recommendations = score_generator(data, recommended_services);
            let output = recommendations.slice(0, 5);
            return (
                <Container>
                    <div className="result-container">
                        <h1>Recommended Services</h1>
                        <h4>Grade: {data.grade}</h4>
                        <div
                            className="shadow p-2 m-3 bg-dark"
                            style={{
                                borderRadius: "1rem",
                            }}
                        >
                            <h4 className="bg-dark">Results</h4>
                        </div>
                        {/* <ol>
                            {output.map((obj) => {
                                return (
                                    <li key={obj.project.name}>
                                        {obj.project.name}
                                    </li>
                                );
                            })}
                        </ol> */}
                        {output.map((obj, key) => {
                            let i = key + 1;
                            return (
                                <Result
                                    key={key}
                                    title={obj.project.name}
                                    description={obj.project.description}
                                    imageURL={
                                        "https://www.webfx.com/wp-content/uploads/2021/10/generic-image-placeholder.png"
                                    }
                                    iteration={i}
                                />
                            );
                        })}
                    </div>
                </Container>
            );
        } else {
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
    }
}
