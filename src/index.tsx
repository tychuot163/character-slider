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
    title: "Sinh đồ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://i.imgur.com/EaCy4Fi.png",
    isActive: false
  },
  {
    title: "Học sĩ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://i.imgur.com/P4TZcrz.png",
    isActive: false
  },
  {
    title: "Tú tài",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://i.imgur.com/0hPtBHR.png",
    isActive: false
  },
  {
    title: "Phó bảng",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80",
    isActive: false
  },
  {
    title: "Trạng nguyên",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat sodales tempor.",
    imageUrl:
      "https://images.unsplash.com/photo-1517052269751-4ae3ad86cc59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    isActive: false
  },
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
                <p>{`${step.title}`}</p>
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
