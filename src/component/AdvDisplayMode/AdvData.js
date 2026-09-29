import BigScreenFrame from "../../Assets/AdvDisplay/hORIZONTAL dISPLAY.webp";
import KioskFrame from "../../Assets/AdvDisplay/Vertical Display (5).webp";
import MobileFrame from "../../Assets/AdvDisplay/Mobile Frame.webp";

// ---------------- Feature 1: Remote Publishing ----------------
import MobileScreen1 from "../../Assets/AdvDisplay/Mobile Screen 1.webp";
import MobileScreen2 from "../../Assets/AdvDisplay/Mobile Screen 2.webp";
import MobileScreen3 from "../../Assets/AdvDisplay/Mobile Screen 3.webp";
import MobileScreen4 from "../../Assets/AdvDisplay/Mobile Screen 4.webp";
import BigScreen1 from "../../Assets/AdvDisplay/Big Screen 1.webp";
import BigScreen2 from "../../Assets/AdvDisplay/Big Screen 2.webp";
import BigScreen3 from "../../Assets/AdvDisplay/Big Screen 3.webp";
import BigScreen4 from "../../Assets/AdvDisplay/Big Screen 4.webp";
import KisokScreen1 from "../../Assets/AdvDisplay/Vertical Screen 1.webp";
import KisokScreen2 from "../../Assets/AdvDisplay/Vertical Screen 2.webp";
import KisokScreen3 from "../../Assets/AdvDisplay/Vertical Screen 3.webp";
import KisokScreen4 from "../../Assets/AdvDisplay/Vertical Screen 4.webp";

// ---------------- Feature 2: 178° Viewing Angle ----------------
import Tab2ScreenImage from "../../Assets/AdvDisplay/Horizontal Anim 2.webp";
import Tab2KioskImage from "../../Assets/AdvDisplay/Vertical Anim 2.webp";

// ---------------- Feature 3: USB Plug & Play ----------------
import Tab3ScreenImage from "../../Assets/AdvDisplay/Horizontal Anim 3.webp";
import Tab3KioskImage from "../../Assets/AdvDisplay/Vertical Anim 3.webp";

// ---------------- Feature 4: Smart Split Screen ----------------
import Tab4ScreenImage1 from "../../Assets/AdvDisplay/Horizontal Anim 4.1.webp";
import Tab4ScreenImage2 from "../../Assets/AdvDisplay/Horizontal Anim 4.2.webp";
import Tab4ScreenImage3 from "../../Assets/AdvDisplay/Horizontal Anim 4.3.webp";
import Tab4ScreenImage4 from "../../Assets/AdvDisplay/Horizontal Anim 4.4.webp";
import Tab4KioskImage1 from "../../Assets/AdvDisplay/Vertical Anim 4.1.webp";
import Tab4KioskImage2 from "../../Assets/AdvDisplay/Vertical Anim 4.2.webp";
import Tab4KioskImage3 from "../../Assets/AdvDisplay/Vertical Anim 4.3.webp";
import Tab4KioskImage4 from "../../Assets/AdvDisplay/Vertical Anim 4.4.webp";

// ---------------- Feature 5: Timing Switch ----------------
import Tab5ScreenImage1 from "../../Assets/AdvDisplay/Horizontal Anim 5.1.webp";
import Tab5ScreenImage2 from "../../Assets/AdvDisplay/Horizontal Anim 5.2.webp";
import Tab5ScreenImage3 from "../../Assets/AdvDisplay/Horizontal Anim 5.3.webp";
import Tab5ScreenImage4 from "../../Assets/AdvDisplay/Horizontal Anim 5.4.webp";
import Tab5ScreenImage5 from "../../Assets/AdvDisplay/Horizontal Anim 5.5.webp";
import Tab5KioskImage1 from "../../Assets/AdvDisplay/Vertical Anim 5.1.webp";
import Tab5KioskImage2 from "../../Assets/AdvDisplay/Vertical Anim 5.2.webp";
import Tab5KioskImage3 from "../../Assets/AdvDisplay/Vertical Anim 5.3.webp";
import Tab5KioskImage4 from "../../Assets/AdvDisplay/Vertical Anim 5.4.webp";
import Tab5KioskImage5 from "../../Assets/AdvDisplay/Vertical Anim 5.5.webp";

//------------------------------- tab icons -----------------------------
import plugIcon from "../../Assets/AdvDisplay/plugIcon.svg";
import remoteIcon from "../../Assets/AdvDisplay/icons/remote_pub.svg";
import AngleIcon from "../../Assets/AdvDisplay/icons/AngleIcon.svg";

import SplitIcon from "../../Assets/AdvDisplay/icons/splitIcon.svg";

import TimingIcon from "../../Assets/AdvDisplay/icons/timingIcon.svg";
import PlugTabIcon from "../../Assets/AdvDisplay/icons/plugIcon.svg";

import { AnimatedAngleIcon } from "./AnimatedDegreeIcon";
import { AnimatedSplitIcon } from "./AnimatedSplitIcon";

const FEATURE_LAYOUTS = {
  "remote-publishing": {
    display: {
      top: "-22.2%",
      right: "-15%",
      width: "100%",
      height: "64.1%",
      clipPath: "inset(20% 20% 0% 0%)",
    },
    kiosk: {
      top: "18.7%",
      right: "3.8%",
      width: "26.3%",
      height: "73.1%",
    },
    mobile: {
      show: true,
      top: "48.4%",
      left: "7.7%",
      width: "19.9%",
      height: "46.9%",
    },
    headline: {
      top: "73.9%",
      left: "31.4%",
    },
  },

  default: {
    display: {
      top: "-1.5%",
      right: "2.6%",
      width: "100%",
      height: "67.1%",
    },
    kiosk: {
      top: "31.3%",
      right: "-5.1%",
      width: "24.4%",
      height: "67.8%",
    },
    mobile: {
      show: false,
      // top: "61.9%",
      // left: "7.7%",
      // width: "19.9%",
      // height: "46.9%",
    },
    headline: {
      top: "67.8%",
      left: "-1.64%",
    },
  },
};
const getLayout = (featureId) =>
  FEATURE_LAYOUTS[featureId] || FEATURE_LAYOUTS.default;

const frameStyle = ({ top, right, bottom, left, width, height }) => {
  const style = {};

  if (top != null) style["--adv-top"] = top;
  if (right != null) style["--adv-right"] = right;
  if (bottom != null) style["--adv-bottom"] = bottom;
  if (left != null) style["--adv-left"] = left;
  if (width != null) style["--adv-width"] = width;
  if (height != null) style["--adv-height"] = height;

  return style;
};

const advFeatures = [
  {
    id: "remote-publishing",
    icon: remoteIcon,
    title: "Remote Publishing",
    desc: "Update and manage display content remotely, enabling quick deployment of advertisements and information across connected screens.",
    subIcon: null,
    headline: "Update Content",
    subheadline: "in Real Time",
    showPulse: true,
    duration: 6400,
    demos: [
      { screen: BigScreen1, kiosk: KisokScreen1, phone: MobileScreen1 },
      { screen: BigScreen2, kiosk: KisokScreen2, phone: MobileScreen2 },
      { screen: BigScreen3, kiosk: KisokScreen3, phone: MobileScreen3 },
      { screen: BigScreen4, kiosk: KisokScreen4, phone: MobileScreen4 },
    ],
  },
  {
    id: "viewing-angle",
    icon: AngleIcon,
    title: "178° Wide Viewing Angle",
    desc: "Delivers clear and consistent visuals from wide viewing positions, ensuring excellent visibility for audiences from different angles.",
    subIcon: "angle",
    headline: "Maximum Visibility",
    subheadline: "across every view",
    showPulse: false,
    duration: 2500,
    demos: [{ screen: Tab2ScreenImage, kiosk: Tab2KioskImage }],
  },
  {
    id: "usb",
    icon: PlugTabIcon,
    title: "USB Plug & Play",
    desc: "Play images, videos, and presentations directly from a USB drive without requiring additional software or complex setup.",
    subIcon: null,
    headline: "Instant Playback",
    subheadline: "in seconds",
    showPulse: false,
    duration: 2500,
    demos: [{ screen: Tab3ScreenImage, phone: Tab3KioskImage }],
  },
  {
    id: "split-screen",
    icon: SplitIcon,
    title: "Smart Split Screen Display",
    desc: "Display multiple types of content simultaneously using customizable screen partitions for advertisements, announcements, videos, or images.",
    subIcon: "",
    headline: "One Screen",
    subheadline: "Multiple Possibilities",
    showPulse: false,
    duration: 6000,
    demos: [
      { screen: Tab4ScreenImage1, kiosk: Tab4KioskImage1 },
      { screen: Tab4ScreenImage2, kiosk: Tab4KioskImage2 },
      { screen: Tab4ScreenImage3, kiosk: Tab4KioskImage3 },
      { screen: Tab4ScreenImage4, kiosk: Tab4KioskImage4 },
    ],
  },
  {
    id: "timing-switch",
    icon: TimingIcon,
    title: "Timing Switch",
    desc: "Schedule automatic power on/off and content playback times to simplify daily operation and improve energy efficiency.",
    subIcon: null,
    headline: "Automate",
    subheadline: "Your Display Schedule",
    showPulse: false,
    duration: 7000,
    demos: [
      { screen: Tab5ScreenImage1, kiosk: Tab5KioskImage1 },
      { screen: Tab5ScreenImage2, kiosk: Tab5KioskImage2 },
      { screen: Tab5ScreenImage3, kiosk: Tab5KioskImage3 },
      { screen: Tab5ScreenImage4, kiosk: Tab5KioskImage4 },
      { screen: Tab5ScreenImage5, kiosk: Tab5KioskImage5 },
    ],
  },
];

export {
  BigScreenFrame,
  KioskFrame,
  MobileFrame,
  getLayout,
  frameStyle,
  AnimatedAngleIcon,
  AnimatedSplitIcon,
  advFeatures,
  plugIcon,
};