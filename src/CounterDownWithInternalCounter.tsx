import { useEffect, useState } from "react";
import styles from "./CounterDown.module.css";
import { TimeType } from "./models/enums/TimeTypes";
import classNames from "classnames";
import { animated, config, useSpring } from "react-spring";
type CounterDownParametersType = {
  type: TimeType;
  startCount: number;
  width: number;
  fontSize: number;
  stop: boolean;
  containerClass: string;
  innerContainersClasses: {
    containerUpClass: string;
    containerDownClass: string;
  };
};

function CounterDownWithInternalCounter({
  startCount,
  type,
  width,
  fontSize,
  containerClass,
  innerContainersClasses,
  stop,
}: Readonly<CounterDownParametersType>) {
  const [turnOn, setTurnOn] = useState(false);
  const [count, setCount] = useState(startCount);
  const [behindCount, setBehindCount] = useState(count);
  useEffect(() => {
    const interval = setInterval(() => {
      if (stop) clearInterval(interval);
      if (count >= 0) {
        setCount((prev) => prev - 1);
      } else {
        if (type !== TimeType.Day) {
          setCount(startCount);
        } else clearInterval(interval);
      }
    }, type);
    return () => clearInterval(interval);
  }, [stop]);
  const CommonStyles = {
    width: `${width}rem`,
    height: `${width / 2}rem`,
    fontSize: `${fontSize}rem`,
  };
  // const springUpContainerRef = useSpringRef();
  // const springDownContainerRef = useSpringRef();
  // const springSpanContainerRef = useSpringRef();
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
      duration: 500,
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
      duration: 500,
    },
  });
  const springSpanContainer = useSpring({
    // ref: springSpanContainerRef,
    from: {
      transform: " rotateX(90deg) skewX(50deg)",
    },
    to: {
      transform: !turnOn
        ? "rotateX(0deg) skewX(0deg)"
        : "rotateX(90deg) skewX(50deg)",
    },
    config: {
      // delay: 500,
      duration: 500,
    },
  });
  // useChain(
  //   [springUpContainerRef, springDownContainerRef, springSpanContainerRef],
  //   [0, 0],
  //   0
  // );

  // const animation1 = {
  //   animation: turnOn ? "move 1s linear  infinite" : "",
  // };
  // const animation2 = {
  //   animation: turnOn ? "moveBackward 1s linear infinite" : "",
  // };
  // const animationSpan = {
  //   animation: turnOn ? "spanAnimate 1s linear  infinite" : "",
  // };
  useEffect(() => {
    setTurnOn((pre) => !pre);
    const timeOut = setTimeout(() => {
      setTurnOn((pre) => !pre);
      if (turnOn) setBehindCount(count - 1);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [type, count]);
  return (
    <div className={containerClass}>
      <div>
        <div
          style={CommonStyles}
          className={classNames(
            styles["animate-back"],
            innerContainersClasses.containerUpClass
          )}
        >
          <span>{behindCount}</span>
        </div>
        <animated.div
          style={
            turnOn ? { ...springUpContainer, ...CommonStyles } : CommonStyles
          }
          className={classNames(
            styles["animate"],
            innerContainersClasses.containerUpClass
          )}
        >
          <animated.span style={!turnOn ? springSpanContainer : {}}>
            {count}
          </animated.span>
        </animated.div>
      </div>
      <div>
        <div
          style={CommonStyles}
          className={classNames(
            styles["animate-2-back"],
            innerContainersClasses.containerDownClass
          )}
        >
          <span>{count}</span>
        </div>
        <animated.div
          style={
            !turnOn ? { ...springDownContainer, ...CommonStyles } : CommonStyles
          }
          className={classNames(
            styles["animate-2"],
            innerContainersClasses.containerDownClass
          )}
        >
          <span>{count}</span>
        </animated.div>
      </div>
    </div>
  );
}

export default CounterDownWithInternalCounter;
