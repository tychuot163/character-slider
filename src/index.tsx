import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import { useTransition, animated } from "react-spring";

import "./styles.css";

type Step = {
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
};

const steps: Array<Step> = [
  {
    title: "Start",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80",
    isActive: false
  },
  {
    title: "Two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1457364983758-510f8afa9f5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1500&q=80",
    isActive: false
  },
  {
    title: "Three",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    isActive: false
  },
  {
    title: "Four",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80",
    isActive: false
  },
  {
    title: "Five",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1517052269751-4ae3ad86cc59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    isActive: false
  },
  {
    title: "Next",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    isActive: false
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const prev = useCallback(
    () =>
      setIndex(state =>
        state === 0 ? steps.length - 1 : (state - 1) % steps.length
      ),
    []
  );
  const next = useCallback(
    () => setIndex(state => (state + 1) % steps.length),
    []
  );

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 }
  });

  return (
    <div className="container">
      <ul className="step-list">
        <li className="step-overlay">
          <button className="prev-button" onClick={prev}>
            &lsaquo;
          </button>
          <button className="next-button" onClick={next}>
            &rsaquo;
          </button>
        </li>

        {transitions.map(({ item, key }) => {
          let step = steps[item];

          for (let i = 0; i < steps.length; i++) {
            steps[i].isActive = false;
          }

          step.isActive = true;

          return (
            <animated.li className="step-item" key={key}>
              <div className="step-image">
                <img src={step.imageUrl} />
              </div>
              <div className="step-content">
                <h2>
                  <small>Step {item + 1}</small>
                  <br />
                  {step.title}
                </h2>
                <p>{step.description}</p>
              </div>
            </animated.li>
          );
        })}
      </ul>

      <ul className="step-nav">
        {steps.map((step, index) => {
          return (
            <li className={`nav-item ${step.isActive ? "active" : ""}`}>
              <button
                type="button"
                className="nav-button"
                onClick={() => setIndex(index)}
              >
                <img src={step.imageUrl} className="nav-image" />
                <p className="nav-content">{`${index + 1}. ${step.title}`}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
