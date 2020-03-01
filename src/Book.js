import React from 'react';
import './Book.css';


function Book(props) {
    const cardStyles = {
        display: "flex",
        borderBottom: "solid 2px lightgrey",
    }
    return (
        <section style={cardStyles}>
            <div className="bookImage">
                <img
                    style={{ height: "200px" }}
                    src={props.img}
                    alt={`Book with title of ${props.title}`}
                />
            </div>
            <div className="bookInfo">
                <h2>{props.title}</h2>
                <p>Author(s): {props.authors.join()}</p>
                <p style={{ textAlign: "left" }}>
                    {props.description}
                </p>
            </div>
        </section>
    )
}

export default Book