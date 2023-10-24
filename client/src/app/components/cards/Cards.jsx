import React from 'react';

function Cards({ title, value }) {
    return (
        <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{value}</p>
            </div>
        </div>
    );
}

export default Cards;
