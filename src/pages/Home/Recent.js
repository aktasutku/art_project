import React from "react";
import { Link } from "react-router-dom";
import "./Recent.css";
import Recent1 from "../../assets/Recent1.png";
import Recent2 from "../../assets/Recent2.png";
import Recent3 from "../../assets/Recent3.png";

const recentImg = [Recent1, Recent2, Recent3];

const Recent = () => {
  return (
    <div className="recent">
      <div className="recent__comment">
        <p>
          Recent <br />
          Art Projects
        </p>
        <Link to="portfolio">
          <button>View all Projects</button>
        </Link>
      </div>
      <div className="recent__img">
        {recentImg.map((img) => (
          <img src={img} />
        ))}
      </div>
    </div>
  );
};

export default Recent;
