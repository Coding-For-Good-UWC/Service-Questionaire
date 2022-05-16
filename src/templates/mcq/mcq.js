import React from "react";
import Question from "../../components/question/question";
import Answer from "../../components/answerChoice/answerChoice";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function MCQ({ content, index, setData, setQuestion }) {
    let answers = content.answers;
    // let first_question = false;
    // if (index == 0) {
    //     first_question = true;
    // }

    // const onClick = (e) => {
    //     e.preventDefault();
    //     setQuestion(index - 1);
    // };
    return (
        <div className="content-container">
            <div id="fixed-size">
                <h1 id="question-num">Q{index + 1}</h1>
                <div className="inner-question-container">
                    <Question content={content.question} />
                    {answers.map((obj, key) => {
                        return (
                            <Answer
                                content={obj}
                                key={key}
                                index={index}
                                setData={setData}
                                setQuestion={setQuestion}
                            />
                        );
                    })}
                </div>
                {/* {first_question ? (
                    <div></div>
                ) : (
                    <div style={{ float: "right" }}>
                        <Button onClick={onClick}>Previous</Button>
                    </div>
                )} */}
            </div>
        </div>
    );
}

MCQ.propTypes = {
    content: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setData: PropTypes.func.isRequired,
    setQuestion: PropTypes.func.isRequired,
};
