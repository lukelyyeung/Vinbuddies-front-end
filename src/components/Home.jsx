import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

import bem from "../utils/bem";

const block = bem("home");
const hero = block("hero");
export const Home = () => (
  <section className={block()}>
    <Jumbotron className={hero.mix("flexBox-row")()}>
      <div className={hero("background")()} />
      <div className={hero("overlay")()} />
      <div className="flexBox-column">
        <h4 className="text-center">Embrace the WineTech future</h4>
        <h2>VinBuddies</h2>
        <Link to="/login">
          <Button className={hero("button")()}>GET STARTED</Button>
        </Link>
      </div>
    </Jumbotron>
  </section>
);
