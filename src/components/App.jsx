import { useState } from 'react';
import { Statistics } from './Statistics/statistics';
import { Sections } from './Section/section';
import { Notification } from './Notification/notification';
import { Buttons } from './FeedbackOptions/feedbackOptions';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = state => {
    // const { good, neutral, bad } = event.target;

    switch (state) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const total = countTotalFeedback();

  const counterPositiveFeedbackPercentage = () => {
    return Math.round((good / total) * 100) || 0;
  };

  const namesKeys = Object.keys({ good, neutral, bad });
  const totalPercentage = counterPositiveFeedbackPercentage();
  const totalFeedback = countTotalFeedback();

  return (
    <div>
      <Sections title="Please leave feedback">
        <Buttons onLeaveFeedback={onLeaveFeedback} options={namesKeys} />
      </Sections>
      <Sections title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={totalFeedback}
            positivePercentage={totalPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Sections>
    </div>
  );
};
