import { getTrackBackground, Range } from 'react-range';
import { motion } from 'framer-motion';

export default function Slider({
  values,
  onChange,
  min,
  max,
  step,
}: {
  values: number[];
  onChange: (values: number[]) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <Range
      onChange={onChange}
      values={values}
      min={min}
      max={max}
      step={step}
      renderTrack={({ props, children }) => (
        <motion.div
          whileHover={{
            scaleY: 1.75,
            transition: { duration: 0.1, ease: 'easeOut' },
          }}
          className="flex w-full h-2 bg-slate-300/20 rounded-full shadow-md overflow-hidden touch-none"
          {...props}
        >
          <div
            ref={props.ref}
            className="w-full rounded-full"
            style={{
              background: getTrackBackground({
                values,
                colors: ['white', 'transparent'],
                min,
                max,
              }),
            }}
          />
          {children}
        </motion.div>
      )}
      renderThumb={({ props }) => (
        <div
          className="w-0 h-0 bg-red-400"
          aria-label="Player seek bar"
          {...props}
        />
      )}
      // thumbClassName="rounded-full w-4 h-4 bg-slate-300"
      // trackClassName="rounded-full bg-red-400"
    />
  );
}
