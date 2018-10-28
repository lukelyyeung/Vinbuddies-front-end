import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export const Home = () => (
    <div>
        <Jumbotron className="flexBox-row">
            <div className="bg"/>
            <div className="overlay"/>
            <div className="flexBox-column">
                <h4 className="text-center">Embrace the WineTech future</h4>
                <h2>VinBuddies</h2>
                <Link to="/login">
                    <Button className="hero-button">GET STARTED</Button>
                </Link>
            </div>
        </Jumbotron>
    </div>
);
