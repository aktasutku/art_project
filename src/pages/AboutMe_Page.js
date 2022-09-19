import React from "react";
import "./AboutMe_Page.css";

const AboutMe_Page = () => {
  return (
    <div className="AboutMe_Page">
      <header>Meet the Artist</header>

      <div className="AboutMePage_one">
        <img src="https://images.unsplash.com/photo-1621502863666-e47e3bd2547b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
        <div>
          <h1>Soraya Dorce</h1>
          <p>
            I am an illustration based in New York. My specializations include
            digital illustration and visual design.
          </p>
        </div>
      </div>

      <div className="AboutMePage_two">
        <div>
          <h1>As an Artist</h1>
          <p>
            My goal is to help every ...... My goal is to help every ...... My
            goal is to help every ...... My goal is to help every ...... My goal
            is to help every ......
          </p>
        </div>
          <img
            className="AboutMePage_two_imgone"
            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=792&q=80"
          />
          <img
            className="AboutMePage_two_imgtwo"
            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=792&q=80"
          />
      </div>

      <div className="AboutMePage_three">
        <img src="https://images.unsplash.com/photo-1633386008252-f2d3ee603dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" />
        <div>
          <h1>My Art style</h1>
          <p>
            I specialize in fun and bright colors, making products feel
            accessible and chic at the same time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe_Page;
