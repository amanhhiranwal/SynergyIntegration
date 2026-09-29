import multiTouchIcon from "../../Assets/KioskDisplay/Icons/multi-touch.svg";
import colorIcon from "../../Assets/KioskDisplay/Icons/color.svg";
import responseTimeIcon from "../../Assets/KioskDisplay/Icons/response-time.svg";
import soundIcon from "../../Assets/KioskDisplay/Icons/sound.svg";
import Frame1 from "../../Assets/KioskDisplay/Kiosk.webp";
import AnimationImage1 from "../../Assets/KioskDisplay/Anim1.webp";
import AnimationImage2 from "../../Assets/KioskDisplay/Anim2.webp";
import AnimationImage3 from "../../Assets/KioskDisplay/Anim3.webp";
import Animation3PopUp from "../../Assets/KioskDisplay/Anim2PopOut.webp";
import Animation1A from "../../Assets/KioskDisplay/Anim 3 (screen) Display 3.1.webp";
import Animation1B from "../../Assets/KioskDisplay/Anim 3 (screen) Display 3.2.webp";
import Animation1C from "../../Assets/KioskDisplay/Anim 3 (screen) Display 3.3.webp";
import Animation1D from "../../Assets/KioskDisplay/Anim 3 (screen) Display 3.4.webp";
import arc1 from "../../Assets/KioskDisplay/Icons/arc1.svg";
import arc2 from "../../Assets/KioskDisplay/Icons/arc2.svg";
import arc3 from "../../Assets/KioskDisplay/Icons/arc3.svg";

export const FEATURE_INTERVAL = 7000;
export const IMAGE_INTERVAL = 2500;
export const KIOSK_FEATURES = [
  {
    id: "muti-touch",
    title: "Multiple Touch Gestures",
    icon: multiTouchIcon,
    heading: "Smooth Interaction\nat Every Touch",
    desc: "Enjoy smooth and responsive touch interactions with support for multiple simultaneous touch points, making collaboration and navigation effortless.",
    images: [AnimationImage1],
    frame: Frame1,
    animation: "zoom-out",
    textPosition: "top-left",
    hasSignal: false,
    hasMultiTouch: true,
    duration: 6000,
  },
  {
    id: "vibrant-color",
    title: "Sound Speaker 10W × 2",
    icon: soundIcon,
    heading: "Clear Audio that\nCompletes the\nExperience",
    desc: "Experience clear and powerful audio with dual 10W built-in speakers, delivering rich sound for presentations, advertisements, and multimedia content.",
    images: [AnimationImage2],
    frame: Frame1,
    animation: "zoom",
    textPosition: "top-left",
    hasSignal: true,
    signalArcs: [arc1, arc2, arc3],
    duration: 8000,
  },
  {
    id: "fast-response",
    title: "Color Gamut NTSC",
    icon: colorIcon,
    heading: "Colors that leave\na lasting impression",
    desc: "Deliver rich, vibrant, and true-to-life colors with a wide NTSC color gamut, ensuring every image, video, and advertisement appears more vivid and visually engaging.",
    images: [AnimationImage3],
    frame: Frame1,
    animation: "zoom-shift",
    hasPopup: true,
    popUp: Animation3PopUp,
    textPosition: "bottom-left",
    hasSignal: false,
    duration: 4000,
  },
  {
    id: "sound-support",
    title: "Response Time Below 5ms",
    icon: responseTimeIcon,
    heading: "Speed that keeps\nup with you",
    desc: "Benefit from ultra-fast response times below 5ms, ensuring smooth visuals, precise touch performance, and minimal motion blur during operation.",
    images: [Animation1A, Animation1B, Animation1C, Animation1D],
    frame: Frame1,
    animation: "widen-right",
    textPosition: "top-left",
    hasSignal: false,
    duration: 2000,
  },
];

export const TEXT_LAYOUT = [
  { top: "-55%", left: "2%" }, // Tab 1
  { top: "-58%", left: "0%" }, // Tab 2
  { top: "-6%", left: "2%" }, // Tab 3
  { top: "-49%", left: "2%" }, // Tab 4
];

export { arc1, arc2, arc3 };

export const ANIM_FINAL_TRANSFORM = {
  "zoom-out": "scale(0.98) translateY(25%)",
  zoom: "scale(1.4) translateY(25%)",
  "zoom-shift": "scale(1.6) translate(1%, 36%)",
  "widen-right": "scale(1.9) translate(4%, 44%)",
};
