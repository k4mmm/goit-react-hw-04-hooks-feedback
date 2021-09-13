import { useState } from "react";
import { FeedbackSection } from "./App.styled";
import { FeedbackOptions } from "./components/FeedbackOptions/FeedbackOptions";
import { Notification } from "./components/Notification/Notification";
import { Statistics } from "./components/Statistics/Statistics";
import { Section } from "./components/Section/Section";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const btns = { bad, neutral, good };

  const increment = (name) => {
    switch (name) {
      case "good":
        setGood((ps) => ps + 1);
        break;
      case "bad":
        setBad((ps) => ps + 1);
        break;
      case "neutral":
        setNeutral((ps) => ps + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + bad + neutral;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good * 100) / total);
  };

  return (
    <FeedbackSection>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(btns)}
          onLeaveFeedback={increment}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message="No feedback given"></Notification>
        )}
      </Section>
    </FeedbackSection>
  );
}
