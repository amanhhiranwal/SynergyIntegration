import dualLensImg from "../../Assets/Camera/DualLens.webp";
import autoFramingImg from "../../Assets/Camera/auto-framing.webp";
import audioSystemImg from "../../Assets/Camera/soundImage.webp";
import connectivityImg from "../../Assets/Camera/Component 93.webp";
import autoFramingIcon from "../../Assets/Camera/Icons/Icon-1.svg";
import connectivityIcon from "../../Assets/Camera/Icons/Icon-2.svg";
import audioSystemIcon from "../../Assets/Camera/Icons/sound.svg";
import dualLensIcon from "../../Assets/Camera/Icons/Icon.svg";
import cameraDevice from "../../Assets/Camera/CameraImage.webp";
import hdmiIcon from "../../Assets/Camera/Icons/hdmi.svg";
import ethernetIcon from "../../Assets/Camera/Icons/ethernet-icon.svg";
import usbcIcon from "../../Assets/Camera/Icons/usb-icon.svg";
import wifiIcon from "../../Assets/Camera/Icons/wifi-icon.svg";

export const conferenceTabs = [
  {
    id: 1,
    title: "Dual-Lens 4K Imaging",
    icon: dualLensIcon,
    description:
      "Dual 4K lenses combine panoramic room coverage with detailed close-up imaging, ensuring every  participant and presenter is captured with exceptional clarity.",
    image: dualLensImg,
    animation: "dual-lens",
    label: "4K Display",
    duration: 5000, 
  },
  {
    id: 2,
    title: "Auto Framing & Tracking",
    icon: autoFramingIcon,
    description:
      "Auto framing, speaker tracking, and hybrid mechanical + electronic PTZ work together to keep participants centered with smooth pan, tilt, and zoom for seamless meeting coverage.",
    image: autoFramingImg,
    animation: "auto-framing",
    faces: [
      { top: "47%", left: "10%" },
      { top: "43%", left: "24%" },
      { top: "44%", left: "76%" },
      { top: "46%", left: "90.5%" },
    ],
    duration: 4500,
  },
  {
    id: 3,
    title: "Crystal-Clear Audio System",
    icon: audioSystemIcon,
    description:
      "Dual full-range stereo speakers and a six-microphone beamforming array provide clear audio pickup and immersive sound for every meeting.",
    image: audioSystemImg,
    animation: "audio-system",
    speakers: [
      { top: "38%", left: "41.8%" },
      { top: "38%", left: "57%" },
    ],
    rings: 4,
    duration: 7000, 
  },
  {
    id: 4,
    title: "Professional Connectivity",
    icon: connectivityIcon,
    description:
      "USB-C, HDMI, Gigabit Ethernet, Wi-Fi, and BYOM support enable effortless integration with modern conferencing and collaboration environments.",
    image: connectivityImg,
    animation: "connectivity",
    device: cameraDevice, 
    ports: [
      { icon: hdmiIcon, label: "HDMI" },
      { icon: ethernetIcon, label: "Gigabit Ethernet" },
      { icon: usbcIcon, label: "USB C-Type" },
      { icon: wifiIcon, label: "Wi-Fi" },
    ],
    duration: 5500, 
  },
];