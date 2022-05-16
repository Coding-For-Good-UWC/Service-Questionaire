import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export default function Answer({ content, index, setData, setQuestion }) {
    // let interest_tags = content.tags;
    const onClick = (e) => {
        e.preventDefault();
        setQuestion(index + 1);
        setData(content);
    };
    return (
        <div className="m-2">
            <Button
                className="w-100"
                style={{ borderRadius: "2rem" }}
                onClick={onClick}
            >
                {content.text}
            </Button>
        </div>
    );
}

Answer.propTypes = {
    content: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setData: PropTypes.func.isRequired,
    setQuestion: PropTypes.func.isRequired,
};
