import React from "react";
//import "bootstrap/dist/css/bootstrap.css";

function Header() {
  return <h1>About</h1>;
}

function Body() {
  return (
    <div>
      <h3>What is PolyGold?</h3>
      <p>
        PolyGold is a CSC 307 (Intro to Software Engineering) project that is
        aims to reduce waste on campus at Cal Poly by making the sharing of
        goods more possible and accessible to students. PolyGold is a webapp for
        Cal Poly students that allows users to list and claim free items and
        pick them up around campus. This allows students who are moving out or
        are no longer in need of certain items to get connected to students who
        do need those items and would be willing to pick them up, saving the
        lister from a trip to the dump and creating a more sustainable Cal Poly
        community by promoting the reusing of certain goods.
      </p>
      <h3>The Creators</h3>
      <p>
        This project was developed by Evan Witulski, Charlie Ward, Nathan
        McCutchen, Dylan Jessen, and Jack de la Motte. The source can be found{" "}
        <a>here</a>
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="usr-page">
      <Header />
      <Body />
    </div>
  );
}

export default About;
