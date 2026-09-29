import dualLensImg from "../../Assets/Camera/PTZ-Image1.webp";
import autoFramingImg from "../../Assets/Camera/PTZ-Image2.webp";
import connectivityImg from "../../Assets/Camera/PTZ-Image4.webp";
import zoomIcon from "../../Assets/Camera/Icons/zoom.svg";
import wideAngle from "../../Assets/Camera/Icons/wide-angle.svg";
import fullHd from "../../Assets/Camera/Icons/hd.svg";
import framingIcon from "../../Assets/Camera/Icons/auto-framing.svg";
import HdTopLeft from "../../Assets/Camera/HD LeftTop.webp";
import HdBottomLeft from "../../Assets/Camera/HD LeftBottom.webp";
import ZoomedFrame from "../../Assets/Camera/zoomed-frame.webp"
import HdRight from "../../Assets/Camera/hdRight.webp";

export const ptzTabs = [
  {
    id: 1,
    title: "12× Optical Zoom",
    icon: zoomIcon,
    description:
      "Powerful 12× optical zoom with 16× digital zoom brings distant participants into clear focus without compromising image quality.",
    image: dualLensImg,
    animation: "zoom",
  },
  {
    id: 2,
    title: "72.5° Wide-Angle Lens",
    icon: wideAngle,
    description:
      "The 72.5° wide-angle lens captures more of the meeting room, ensuring every participant stays comfortably within the frame.",
    image: autoFramingImg,
    animation: "wide",
  },
  {
    id: 3,
    title: "1080P Full HD",
    icon: fullHd,
    description:
      "Capture every meeting with sharp 1080P resolution at up to 60fps, delivering smooth, detailed, and lifelike video for professional conferencing.",
    image: [HdTopLeft, HdBottomLeft, HdRight],
    animation: "hd",
  },
  {
    id: 4,
    title: "Auto Framing",
    icon: framingIcon,
    description:
      "Intelligent auto framing detects participants and automatically adjusts the camera view for a balanced and professional meeting experience.",
    animation: "framing",
    image: [connectivityImg, ZoomedFrame],
  },
];
