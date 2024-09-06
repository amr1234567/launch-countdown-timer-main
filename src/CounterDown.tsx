import { useEffect, useState } from "react";
import styles from "./CounterDown.module.css";
import { TimeType } from "./models/enums/TimeTypes";
import classNames from "classnames";
import { animated, config, useSpring } from "react-spring";
type CounterDownParametersType = {
  type: TimeType;
  count: number;
};

function CounterDown({ count, type }: Readonly<CounterDownParametersType>) {
  const [turnOn, setTurnOn] = useState(false);
  const [previousCount, setPreviosCount] = useState(count - 1);

  const springUpContainer = useSpring({
    from: {
      transform: "rotateX(0deg) skewX(0deg)",
    },
    to: {
      transform: turnOn
        ? "rotateX(-90deg) skewX(-50deg)"
        : "rotateX(0deg) skewX(0deg)",
    },
    config: {
      duration: 400,
    },
  });
  const springDownContainer = useSpring({
    from: {
      transform: " rotateX(90deg) skewX(50deg)",
    },
    to: {
      transform: !turnOn
        ? "rotateX(0deg) skewX(0deg)"
        : "rotateX(90deg) skewX(50deg)",
    },
    config: {
      ...config.molasses,
      // delay: 500,
      duration: 400,
    },
  });
  useEffect(() => {
    setPreviosCount(count + 1);
    const timeOut = setTimeout(() => {
      setTurnOn((pre) => !pre);
      setTimeout(() => {
        setTurnOn((pre) => !pre);
      }, 400);
    }, 0);
    return () => clearTimeout(timeOut);
  }, [type, count]);
  return (
    <div className={styles.container}>
      <div className={styles["box-up"]}>
        <div className={classNames(styles["animate-back"])}>
          <span>{count}</span>
        </div>
        <animated.div
          style={turnOn ? { ...springUpContainer } : {}}
          className={classNames(styles["animate"])}
        >
          <span>{turnOn ? previousCount : count}</span>
        </animated.div>
      </div>
      <div className={styles["box-down"]}>
        <div className={classNames(styles["animate-2-back"])}>
          <span>{turnOn ? previousCount : previousCount - 1}</span>
        </div>
        <animated.div
          style={!turnOn ? { ...springDownContainer } : {}}
          className={classNames(styles["animate-2"])}
        >
          <span>{turnOn ? previousCount : previousCount - 1}</span>
        </animated.div>
      </div>
    </div>
  );
}

export default CounterDown;
