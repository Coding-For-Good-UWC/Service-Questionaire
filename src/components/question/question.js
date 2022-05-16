import React from "react";
import PropTypes from "prop-types";

export default function Question({ content }) {
    return (
        <div className="mb-5">
            <h2 className="question-text">{content}</h2>
        </div>
    );
}

Question.propTypes = {
    content: PropTypes.string.isRequired,
};
