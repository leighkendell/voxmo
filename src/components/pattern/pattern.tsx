import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { toCircle } from 'flubber';
import styles from './pattern.module.scss';

interface Props {
  transform?: boolean;
}

const Pattern: React.FC<Props> = ({ transform }) => {
  const curvedPath =
    'M0,0 L400,0 L400,310.455399 C288.245854,370.1518 202.161711,400 141.747573,400 C81.3334345,400 34.0842435,384.280125 0,352.840376 L0,0 Z';

  const { step } = useSpring({
    from: {
      step: 0,
    },
    step: transform ? 1 : 0,
    config: config.wobbly,
  });

  // Creates an interpolation from curvedPath to a circle
  const interpolator = toCircle(curvedPath, 200, 200, 200, {
    maxSegmentLength: 1,
  });

  // The SVG used for clip-path
  const mask = (
    <svg width="0" height="0" viewBox="0 0 400 400" aria-hidden="true">
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
      <div className={styles.pattern} aria-hidden="true" />
    </>
  );
};

export default Pattern;
