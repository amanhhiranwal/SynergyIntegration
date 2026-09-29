import heightIcon from "../../Assets/SmartDisplay/Icons/height.svg";
import rotationIcon from "../../Assets/SmartDisplay/Icons/rotation.svg";
import speakerIcon from "../../Assets/SmartDisplay/Icons/speaker.svg";
import brightnessIcon from "../../Assets/SmartDisplay/Icons/brightness.svg";
import UpperFrame from "../../Assets/SmartDisplay/upper part smart display.webp";
import LowerFrame from "../../Assets/SmartDisplay/lower part.webp";
import Anim1 from "../../Assets/SmartDisplay/2.1/Anim 2.1.webp";
import Anim2 from "../../Assets/SmartDisplay/2.2/Anim 2 Display.webp";
import Anim3 from "../../Assets/SmartDisplay/2.3/Anim 3 Display.webp";
import Anim4 from "../../Assets/SmartDisplay/2.4/Anim 4 Display.webp";
import Arc1 from "../../Assets/SmartDisplay/Icons/Arc1.svg";
import Arc2 from "../../Assets/SmartDisplay/Icons/Arc2.svg";
import Arc3 from "../../Assets/SmartDisplay/Icons/Arc3.svg";

export const FEATURE_INTERVAL = 7000;
export const IMAGE_INTERVAL = 2500;

export const SMART_FEATURES = [
  {
    id: "height",
    title: "Height Adjustment",
    icon: heightIcon,
    heading: "Comfort Adjusted\nTo You",
    desc: "Easily raise or lower the display by up to 180 mm for an ergonomic viewing position that enhances comfort throughout the day.",
    images: [Anim1],
    textPosition: "top-left",
    frame: UpperFrame,
    bottomFrame: LowerFrame,
    deviceAnim: "smd-anim-height",
    duration: 6000,
  },
  {
    id: "rotation",
    title: "360° Rotation",
    icon: rotationIcon,
    heading: "Freedom To View \n Comfort From Every Angle",
    desc: "Effortlessly rotate the display to portrait or landscape orientation with a full 360° rotating stand, adapting to every workspace and application.",
    images: [Anim2],
    textPosition: "top-left",
    frame: UpperFrame,
    bottomFrame: LowerFrame,
    deviceAnim: "smd-anim-rotation",
    duration: 3500,
  },
  {
    id: "speaker",
    title: "Stereo Bass Speaker",
    icon: speakerIcon,
    heading: "Powerful Audio \n Built Into the Base",
    desc: "Integrated stereo speakers deliver clear, balanced sound without the need for external audio devices, keeping your workspace clean and efficient.",
    images: [Anim3],
    textPosition: "bottom-left",
    frame: UpperFrame,
    bottomFrame: LowerFrame,
    signalArcs: [Arc1, Arc2, Arc3],
    // deviceAnim: "smd-anim-zoom",
    // deviceShift: "smd-anim-shift",
    // deviceOverall: "smd-zoom-device-overall",
    duration: 5000,
  },
  {
    id: "brightness",
    title: "Brightness",
    icon: brightnessIcon,
    heading: "Bright Views \n Lasting Impact",
    desc: "High-brightness display technology ensures sharp, vibrant visuals with excellent visibility in both brightly lit and indoor environments.",
    images: [Anim4],
    textPosition: "top-left",
    frame: UpperFrame,
    bottomFrame: LowerFrame,
    deviceAnim: "smd-anim-zoomin",
    duration: 5000,
  },
];

export const TEXT_LAYOUT = [
  { top: "3%", left: "1%", deviceTop: "10%" }, // Tab 1
  { top: "15%", left: "2%", deviceTop: "-19%" }, // Tab 2
  { top: "12%", left: "4%", deviceTop: "-19%" }, // Tab 3
  { top: "12%", left: "4%", deviceTop: "-10%" }, // Tab 4
];