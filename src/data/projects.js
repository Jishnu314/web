export const PROJECTS = [
  {
    title: "Smart Calling Bell",
    desc: "ESP32-based smart doorbell that recognizes known visitors, unlocks automatically, and alerts you with photos of unknown visitors.",
    details:
      "An IoT calling-bell system built on the ESP32 that uses onboard face recognition to identify known " +
      "visitors and trigger an automatic unlock. When an unrecognized face is detected, it captures a photo " +
      "and sends an alert notification, giving remote visibility into who's at the door without manual " +
      "monitoring.",
    stack: ["ESP32", "C++", "IoT", "Face Recognition"],
    github: "https://github.com/Jishnu314/Smart-Calling--Bell-IoT-project",
  },
  {
    title: "Smart Specs For Blind",
    desc: "AI-powered assistive spectacles enabling visually impaired users to detect surroundings, receive audio guidance, and navigate independently.",
    details:
      "Developed smart wearable glasses using Raspberry Pi and Python, integrating MediaPipe, MobileFaceNet, and YOLO for real-time scene understanding. " +
      "Features include face recognition for known contacts, emergency call triggering, fall detection, AI-powered shopping assistant, scene description, " +
      "and navigation assistance. Designed to enhance independence and safety for visually impaired users.",
    stack: ["Raspberry Pi", "Python", "MediaPipe", "MobileFaceNet", "YOLO"],
    github: "https://github.com/Jishnu314/Smart-Specs-For-Blind",
  },
];
