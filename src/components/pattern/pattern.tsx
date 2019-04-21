import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import styles from './pattern.module.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { toCircle } = require('flubber');

interface Props {
  transform?: boolean;
}

const Pattern: React.FC<Props> = ({ transform: shouldTransform }) => {
  const curvedPath =
    'M0,0 L400,0 L400,310.455399 C288.245854,370.1518 202.161711,400 141.747573,400 C81.3334345,400 34.0842435,384.280125 0,352.840376 L0,0 Z';

  const { step, transform } = useSpring({
    step: shouldTransform ? 1 : 0,
    transform: shouldTransform
      ? `translateY(calc(100vh - 50vw))`
      : `translateY(calc(-10vh - 0vw))`,
    config: config.gentle,
  });

  // Creates an interpolation from curvedPath to a circle
  const interpolator = toCircle(curvedPath, 200, 200, 200, {
    maxSegmentLength: 1,
  });

  // The SVG used for clip-path
  const mask = (
    <svg className={styles.mask} viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <clipPath
          id="header-mask"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.0025 0.0025)"
        >
          <animated.path d={step.interpolate(interpolator)} />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <>
      {mask}
      <animated.div
        className={styles.pattern}
        aria-hidden="true"
        style={{ transform }}
      />
    </>
  );
};

export default Pattern;
