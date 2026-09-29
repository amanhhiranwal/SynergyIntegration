import { motion } from "motion/react";

const SPLIT_LAYOUTS = {
  1: {
    // complete square block
    A: { x: 20, y: 20, width: 120, height: 120 },
    B: { x: 20, y: 20, width: 120, height: 120 },
    C: { x: 20, y: 20, width: 120, height: 120 },
    D: { x: 20, y: 20, width: 120, height: 120 },
  },
  2: {
    // 2 vertical divisions (left half + right half)
    A: { x: 20, y: 20, width: 56, height: 120 },
    C: { x: 20, y: 20, width: 56, height: 120 }, // merges behind A
    B: { x: 84, y: 20, width: 56, height: 120 },
    D: { x: 84, y: 20, width: 56, height: 120 }, // merges behind B
  },
  3: {
    // right part splits horizontally, left stays whole
    A: { x: 20, y: 20, width: 56, height: 120 },
    C: { x: 20, y: 20, width: 56, height: 120 }, // merges behind A
    B: { x: 84, y: 20, width: 56, height: 56 },
    D: { x: 84, y: 84, width: 56, height: 56 },
  },
  4: {
    // left part also splits horizontally -> four quadrants
    A: { x: 20, y: 20, width: 56, height: 56 },
    B: { x: 84, y: 20, width: 56, height: 56 },
    C: { x: 20, y: 84, width: 56, height: 56 },
    D: { x: 84, y: 84, width: 56, height: 56 },
  },
};

export const AnimatedSplitIcon = ({ step = 1 }) => {
  const layout = SPLIT_LAYOUTS[step] || SPLIT_LAYOUTS[1];

  return (
    <svg
      viewBox="0 0 300 220"
      width={140}
      height={100}
      style={{ overflow: "visible" }}
    >
      {["A", "B", "C", "D"].map((key) => (
        <motion.rect
          key={key}
          rx={6}
          fill="#0B1257"
          animate={layout[key]}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
};