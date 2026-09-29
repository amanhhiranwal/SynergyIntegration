import { motion } from "motion/react";
import "./AdvDisplayMode.css";

export const AnimatedAngleIcon = () => (
   <motion.svg
    viewBox="70 0 360 120"
    className="animated-angle-icon"
    style={{ overflow: "visible" }}
    initial="hidden"
    animate="visible"
  >
    <motion.g
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: [0, 0.4, 1],
          transition: { duration: 1, times: [0, 0.5, 1], ease: "easeInOut" },
        },
      }}
    >
      <path
        d="M133 100 A100 100 0 0 1 333 100"
        fill="#D3D3E5"
        stroke="#0B1257"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M133 100 A100 100 0 0 1 333 100 L333 100 L133 100 Z"
        fill="#D3D3E5"
        stroke="none"
      />
      <motion.line
        x1={90}
        y1={100}
        x2={90}
        initial={{ x2: 90 }}
        animate={{ x2: 377 }}
        y2={100}
        stroke="#0B1257"
        strokeWidth="8"
        strokeLinecap="round"
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
      <text
        x={398}
        y={95}
        fontSize={40}
        fontWeight={600}
        fill="#0B1257"
        fontFamily="Inter, sans-serif"
      >
        178°
      </text>
    </motion.g>
  </motion.svg>
);