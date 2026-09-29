// ---- imports unchanged, just add whatever extra sub-images you need ----
import Tab3Image1 from "../../Assets/BrilliantVisuals/Tab3Image1.webp";
import Tab1PopupImage from "../../Assets/BrilliantVisuals/Tab3Image2.webp";

import AnimationA1 from "../../Assets/BrilliantVisuals/Animation 1/Anim 1.1.webp";
import AnimationA2 from "../../Assets/BrilliantVisuals/Animation 1/Anim 1.2.webp";
import AnimationA3 from "../../Assets/BrilliantVisuals/Animation 1/Anim 1.3.webp";

import AnimationB1 from "../../Assets/BrilliantVisuals/Animation 2/Anim 2.1.webp";
import AnimationB2 from "../../Assets/BrilliantVisuals/Animation 2/Anim 2.2.webp";
import AnimationD1 from "../../Assets/BrilliantVisuals/Animation 4/Anim 4.1.webp";
import AnimationD2 from "../../Assets/BrilliantVisuals/Animation 4/Anim 4.2.webp";

import Icon1 from "../../Assets/BrilliantVisuals/Icons/lcd_icon.svg";
import Icon2 from "../../Assets/BrilliantVisuals/Icons/Frame 48751-2.svg";
import Icon3 from "../../Assets/BrilliantVisuals/Icons/hd_icon.svg";
import Icon4 from "../../Assets/BrilliantVisuals/Icons/rain_protection.svg";

import kioskFrame from "../../Assets/BrilliantVisuals/signage frame.webp";

export const FEATURE_INTERVAL = 7000;
export const IMAGE_INTERVAL = 2500;

export const DEVICE_FRAME = kioskFrame;

export const FEATURE_LAYOUTS = [
  {
    device: { x: -15, y: -10, scale: 1 },
    heading: { x: 0, y: 0 },
  },
  {
    device: { x: -45, y: 5, scale: 1 },
    heading: { x: 2, y: 32 },
  },
  {
    device: { x: 10, y: 18, scale: 1 },
    heading: { x: -4, y: 10 },
  },
  {
    device: { x: 42, y: -10, scale: 1 },
    heading: { x: -2, y: -10 },
  },
];

export const SIGNAGE_FEATURES = [
  {
    id: "liquid-crystal-panel",
    title: "Liquid Crystal Panel",
    description:
      "Delivers vibrant colors, sharp visuals, and consistent image quality for professional digital signage.",
    heading: ["Brilliant Visuals", "That Captivate"],
    images: [AnimationA1, AnimationA2, AnimationA3], // 3 images, smooth crossfade
    shine: true,
    icon: Icon1,
    iconClass: "",
  },
  {
    id: "anti-riot-anti-theft",
    title: "Anti Riot/Anti Theft Design",
    description:
      "Built with a reinforced enclosure to provide enhanced protection against vandalism, tampering, and unauthorized access.",
    heading: ["Engineered for", "Maximum Protection"],
    images: [AnimationB1, AnimationB2], // 2 images, smooth crossfade
    icon: Icon2,
    iconClass: "",
  },
  {
    id: "commercial-grade-battery",
    title: "2K & 4K Ultra HD Display",
    description:
      "Deliver stunning clarity, vibrant colors, and exceptional detail with 2K and 4K Ultra HD resolution, ensuring every image, video, and message stands out with remarkable visual impact.",
    heading: ["Power That", "Keeps You Going"],
    images: [Tab3Image1], // single image, unchanged behavior
    popup: { image: Tab1PopupImage },
    icon: Icon3,
    iconClass: "",
  },
  {
    id: "rain-sun-protection",
    title: "Rain & Sun Protection",
    description:
      "Engineered to withstand harsh outdoor conditions with reliable protection against rain, dust, and direct sunlight.",
    heading: ["Ready for", "Every Weather"],
    images: [AnimationD1, AnimationD2], // 2 images, bottom-up reveal + zoom settle
    imageAnimation: "reveal",
    icon: Icon4,
    iconClass: "bv-icons-signage",
  },
];