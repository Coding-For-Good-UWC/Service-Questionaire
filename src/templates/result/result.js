import React from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Result({ title, description, imageURL, iteration }) {
    return (
            <div
                className="shadow p-5 m-3 bg-dark"
                style={{
                    borderRadius: "1rem",
                }}
            >
                <Row className="bg-dark">
                    <Col xs={4} className="bg-dark">
                        <img src={imageURL} />
                    </Col>
                    <Col xs={8} className="bg-dark">
                        <h4
                            className="bg-dark"
                            style={{ color: "white", textAlign: "left" }}
                        >
                            {iteration}. {title}
                        </h4>
                        <h6
                            className="bg-dark"
                            style={{ color: "white", textAlign: "left" }}
                        >
                            {description}
                        </h6>
                    </Col>
                </Row>
            </div>
    );
}

Result.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    iteration: PropTypes.number.isRequired,
};
