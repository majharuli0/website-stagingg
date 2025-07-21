"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const helpTopics = [
  {
    title: "First Time Use",
    description: "Welcome to Senryor Application",
    icon: "/images/help1.svg",
    link: "#",
  },
  {
    title: "Product Features and Overview",
    description: "Creating Personalized Care and Monitoring",
    icon: "/images/help2.svg",
    link: "#",
  },
  // {
  //   title: "Device Issues",
  //   description: "Monitor Device Performance and Updates",
  //   icon: "/images/help3.svg",
  //   link: "#",
  // },
  {
    title: "Device Troubleshooting",
    description: "Solutions for a Smooth Experience",
    icon: "/images/help4.svg",
    link: "#",
  },
  {
    title: "Device Logins and Account Management",
    description: "A Guide to Using Key App Features",
    icon: "/images/help5.svg",
    link: "#",
  },
  {
    title: "Account Login",
    description: "Managing Senryor Account",
    icon: "/images/help8.svg",
    link: "#",
  },
  // {
  //   title: "Videos",
  //   description: "Interactive Video Materials",
  //   icon: "/images/help9.svg",
  //   link: "#",
  // },
  {
    title: "Installation FAQs",
    description: "Welcome to Senryor Download Zone",
    icon: "/images/help10.svg",
    link: "#",
  },
];

const faq = [
  {
    category: "First Time Use",
    showFor: "First Time Use",
    questions: [
      {
        question: "What is the Seenyor AI Care Guardian, and who is it for?",
        answer:
          "The Seenyor AI Care Guardian is a smart sensor designed to monitor the safety and well-being of elderly individuals. It can detect falls, monitor vital signs, and provide alerts to caregivers. This device is ideal for families who want to ensure the safety of their loved ones at home.",
      },
      {
        question:
          "How do I set up the Seenyor AI Care Guardian for the first time?",
        answer:
          "Begin by choosing an optimal installation location, such as above a bed for accurate monitoring. Install the device using the provided wall or ceiling mounts, plug it in, and connect it to Wi-Fi. Follow the on-screen prompts in the Seenyor app to pair and activate your device.",
      },
      {
        question:
          "What items are included in the Seenyor AI Care Guardian package?",
        answer:
          "Inside the box, you’ll find: The Seenyor AI Care Guardian Sensor, Mounting brackets for wall or ceiling installation, Power adapter and USB cable, Screws and anchors for secure mounting, Adhesive wire clips for cable management.",
      },
      {
        question: "Where should I install the Seenyor AI Care Guardian?",
        answer:
          "For best results, install the device on the ceiling directly above the bed or at 1.6 meters height on the wall, ensuring a clear line of sight. Avoid placing it near obstacles, moving objects like fans or curtains, and heat sources like lamps or heaters.",
      },
      {
        question: "How do I connect the device to the Seenyor app?",
        answer:
          "After installation, power on the device. The device light will start flashing red, indicating it’s ready for pairing. Open the Seenyor app and follow the pairing instructions on-screen to connect the device to Wi-Fi and complete setup.",
      },
      {
        question: "What should I do if the device doesn’t enter pairing mode?",
        answer:
          "Ensure that the device is plugged in securely. If the light doesn’t flash red, try unplugging and replugging the device. If the issue persists, contact Seenyor support for assistance.",
      },
      {
        question: "Can the device operate without Wi-Fi?",
        answer:
          "Wi-Fi is required to enable full monitoring capabilities and real-time alerts through the Seenyor app. If Wi-Fi isn’t available, the device may still capture data locally, but alerts and remote monitoring will be disabled.",
      },
      {
        question:
          "How do I test that the device is working properly after installation?",
        answer:
          "You can perform a test using the app’s calibration and testing features. The app will guide you through checking fall detection, radar coverage, and monitoring functions to ensure the device is ready for use.",
      },
    ],
  },
  {
    category: "Product Features and Overview",
    showFor: "Product Features and Overview",
    questions: [
      {
        question: "What is the Seenyor device, and who is it for?",
        answer:
          "Seenyor is a non-wearable monitoring device designed to enhance the safety and well-being of elderly individuals. It monitors for falls, tracks vital signs, and provides alerts to caregivers, making it ideal for families and assisted living facilities.",
      },
      {
        question: "What features does the Seenyor system offer?",
        answer:
          "Seenyor includes fall detection, real-time monitoring, two-way voice communication, heart and breathing rate monitoring, sleep analysis, and customizable alerts.",
      },
      {
        question: "How does Seenyor’s fall detection work?",
        answer:
          "Seenyor uses radar technology to instantly detect falls, alerting caregivers or monitoring centers to ensure prompt assistance while maintaining resident privacy.",
      },
      {
        question: "Can I customize the alerts I receive?",
        answer:
          "Yes, alerts can be tailored to specific needs, allowing caregivers to receive notifications about key health metrics and activities.",
      },
      {
        question: "Does the system provide wellness monitoring?",
        answer:
          "Yes, Seenyor monitors vital signs like heart rate and breathing patterns, helping caregivers track wellness over time and detect unusual trends.",
      },
      {
        question: "How does the two-way voice feature work?",
        answer:
          "Seenyor’s two-way voice communication allows caregivers to speak directly with residents through the device, providing immediate interaction during emergencies.",
      },
      {
        question: "How does Seenyor help with sleep tracking?",
        answer:
          "Seenyor monitors sleep patterns and quality, providing caregivers with insights into residents' rest, which helps in customizing care plans.",
      },
      {
        question: "What technology powers Seenyor’s monitoring system?",
        answer:
          "Seenyor operates on advanced radar and millimeter-wave technology, enabling non-intrusive, accurate monitoring of movements and vital signs.",
      },
      {
        question:
          "How does Seenyor improve safety for residents in assisted living?",
        answer:
          "Seenyor’s real-time monitoring and alerts enable quick responses to falls or health changes, helping prevent severe outcomes and enhancing resident safety.",
      },
      {
        question: "Is the system privacy-focused?",
        answer:
          "Yes, Seenyor uses radar-based monitoring rather than cameras, ensuring privacy while providing necessary safety monitoring.",
      },
      {
        question: "How does Seenyor ensure data privacy and security?",
        answer:
          "Seenyor prioritizes privacy with radar-based monitoring and encrypts all data, ensuring that resident information remains secure.",
      },
      {
        question: "Is Seenyor a wearable device?",
        answer:
          "No, Seenyor is a non-wearable, passive monitoring device, providing safety without intruding on daily routines.",
      },
      {
        question:
          "What makes Seenyor different from other fall detection systems?",
        answer:
          "Unlike traditional systems, Seenyor doesn’t rely on cameras or wearables, providing highly accurate monitoring while ensuring privacy.",
      },
      {
        question: "Does Seenyor offer real-time monitoring?",
        answer:
          "Yes, Seenyor provides real-time monitoring and sends immediate alerts for falls or unusual health changes.",
      },
      {
        question:
          "Can Seenyor track health metrics like heart rate and breathing?",
        answer:
          "Yes, Seenyor monitors health indicators such as heart rate and breathing, helping caregivers track wellness trends.",
      },
      {
        question: "Is the Seenyor device easy to install?",
        answer:
          "Yes, Seenyor is designed for simple installation with step-by-step guidance, typically mounted at a height of 1.6 meters.",
      },
      {
        question:
          "Does Seenyor work with an app, and what features does the app include?",
        answer:
          "Yes, the Seenyor app allows caregivers to view real-time data, receive alerts, and monitor wellness remotely.",
      },
      {
        question: "How far away can the device detect movements?",
        answer:
          "Seenyor’s detection range generally covers a standard room size, making it ideal for spaces up to 3x3 meters on each side.",
      },
      {
        question: "Is there a monthly subscription fee for Seenyor?",
        answer:
          "Yes, Seenyor requires a monthly subscription that covers real-time alerts, app access, and device updates.",
      },
      {
        question:
          "What support is available for setting up and using the Seenyor device?",
        answer:
          "Seenyor provides setup support, documentation, and customer service to ensure a smooth installation experience.",
      },
      {
        question: "Does the device provide alerts for unusual health changes?",
        answer:
          "Yes, Seenyor sends alerts for unusual changes in health indicators, allowing for proactive care.",
      },
      {
        question: "What types of alerts can caregivers receive from Seenyor?",
        answer:
          "Caregivers can receive alerts for falls, irregular heart rates, unusual breathing patterns, and other wellness changes.",
      },
      {
        question:
          "Is there a limit on the number of caregivers who can receive alerts?",
        answer:
          "Multiple caregivers can receive alerts through the app, ensuring someone is always notified in emergencies.",
      },
      {
        question: "How durable is the Seenyor device?",
        answer:
          "Seenyor is designed for long-term use with high-quality materials to withstand regular use in assisted living environments.",
      },
      {
        question:
          "Can Seenyor be used in private homes as well as assisted living facilities?",
        answer:
          "Yes, Seenyor is versatile and can be installed in private homes to support independent living.",
      },
      {
        question: "What happens if a resident falls and cannot respond?",
        answer:
          "Seenyor sends an alert to caregivers or a monitoring center, enabling immediate response even if the resident is unable to respond.",
      },
      {
        question:
          "How often does the Seenyor device need maintenance or updates?",
        answer:
          "Seenyor requires minimal maintenance, with software updates typically managed remotely.",
      },
      {
        question: "Does the Seenyor system require Wi-Fi or a data connection?",
        answer: "Yes, Wi-Fi is necessary for real-time monitoring and alerts.",
      },
      {
        question:
          "Can the Seenyor device detect activity in dark or low-light conditions?",
        answer:
          "Yes, Seenyor’s radar technology is effective in all lighting conditions.",
      },
      {
        question: "Is the Seenyor device covered by any warranty?",
        answer:
          "Yes, Seenyor includes a warranty covering functionality. Contact customer support for specific details.",
      },
      {
        question: "Can residents or family members access the monitoring data?",
        answer:
          "With permission, family members or caregivers can access real-time data through the Seenyor app.",
      },
      {
        question: "How does Seenyor handle emergencies or urgent situations?",
        answer:
          "Seenyor provides real-time alerts and can connect caregivers via the app to offer immediate assistance in emergencies.",
      },
      {
        question: "What are the installation requirements for Seenyor?",
        answer:
          "Seenyor should be mounted at 1.6 meters with access to power and Wi-Fi. Detailed instructions are provided.",
      },
      {
        question: "Is Seenyor FDA-approved or regulated as a medical device?  ",
        answer:
          "Seenyor is designed as a wellness device and does not require FDA approval.",
      },
      {
        question: "Can Seenyor track sleep patterns and provide reports?  ",
        answer:
          "    Yes, Seenyor monitors sleep and provides detailed reports to caregivers.",
      },
      {
        question:
          "Does Seenyor support voice interactions for emergency situations?  ",
        answer:
          "Yes, Seenyor includes a two-way voice feature, allowing caregivers to communicate with residents during emergencies.",
      },
      {
        question:
          "How does Seenyor help facilities improve their level of care?  ",
        answer:
          "    Seenyor’s data and alerts help caregivers provide personalized, proactive care, improving safety and resident satisfaction.",
      },
    ],
  },
  {
    category: "Device Troubleshooting",
    showFor: "Device Troubleshooting",
    questions: [
      {
        question: "Why isn’t my Seenyor device connecting to Wi-Fi?",
        answer:
          "Ensure your Wi-Fi network is set to 2.4GHz, as Seenyor does not support 5GHz networks. Confirm the Wi-Fi password is correct and that your router is working properly.",
      },
      {
        question:
          "How close does the Seenyor device need to be to the Wi-Fi router?",
        answer:
          "For a stable connection, place the device within 12-15 feet of your Wi-Fi router. Thick walls, metal objects, or other electronic devices may interfere with the signal if they’re in between.",
      },
      {
        question:
          "What should I do if the Wi-Fi signal is weak or intermittent?",
        answer:
          "Use a Wi-Fi extender to boost the signal, especially if the device is far from the router. Make sure the extender is placed midway between the device and router for the best results.",
      },
      {
        question: "Why does my device keep disconnecting from Wi-Fi?",
        answer:
          "Frequent disconnections can happen if there’s interference or if the Wi-Fi signal is weak. Try switching to a less congested Wi-Fi channel in your router settings or reducing the number of devices connected to the network.",
      },
      {
        question:
          "Why am I experiencing a delay in alerts from the Seenyor device?",
        answer:
          "Delays may result from slow or weak Wi-Fi connectivity. Make sure your internet speed is sufficient for real-time alerts, and consider rebooting the router to improve network performance.",
      },
      {
        question: "What if my Wi-Fi drops unexpectedly?",
        answer:
          "Restart your router and the Seenyor device to re-establish the connection. Ensure the device is within a reasonable distance of the router or use a Wi-Fi extender if needed.",
      },
      {
        question: "Can I connect Seenyor to a guest or public Wi-Fi network?",
        answer:
          "Seenyor works best on a secure, private Wi-Fi network. Public or guest networks may have security restrictions that can cause connection issues.",
      },
      {
        question:
          "How do I know if my Wi-Fi signal is strong enough for the Seenyor device?",
        answer:
          "Open the Seenyor app to view connection status. A strong, stable signal ensures timely alerts and data updates. If signal strength is below 70%, consider relocating the device or adding a Wi-Fi extender.",
      },
      {
        question: "What should I do if the Seenyor device isn’t turning on?",
        answer:
          "Confirm the device is connected to a power source and that the outlet is functioning. If the device still doesn’t power on, contact Seenyor support for assistance.",
      },
      {
        question:
          "Why am I not receiving alerts even though the device is connected?",
        answer:
          "Ensure that notifications are enabled in the Seenyor app and that your Wi-Fi connection is stable. If issues persist, restart both the device and the app.",
      },
      {
        question:
          "What should I do if the device isn’t detecting falls accurately?",
        answer:
          "Confirm the device is mounted at the recommended height of 1.6 meters and is positioned correctly. Check that fall detection is enabled in the app and that the line of sight is clear.",
      },
      {
        question: "How do I reset the Seenyor device?",
        answer:
          "Hold the reset button on the device (if available) or follow reset instructions in the Seenyor app. For further help, contact Seenyor support.",
      },
      {
        question:
          "What should I do if the device is not tracking health metrics?",
        answer:
          "Make sure the device is placed in an optimal position, free from obstructions, and connected to Wi-Fi. Check that health monitoring features are enabled in the app.",
      },
      {
        question:
          "How do I troubleshoot if the Seenyor app isn’t displaying data?",
        answer:
          "Verify that the device is connected to Wi-Fi and that the app has the necessary permissions. Restart the app or reinstall it if needed.",
      },
      {
        question: "Why is the device sending false alerts?",
        answer:
          "False alerts can occur if the device is incorrectly positioned or if the settings need adjustment. Make sure the device is securely mounted and positioned as per the instructions.",
      },
      {
        question:
          "How can I improve the device’s connection if my Wi-Fi signal is weak?",
        answer:
          "Consider moving the router closer to the device, using a Wi-Fi extender, or upgrading your internet speed if multiple devices are connected to the same network.",
      },
      {
        question: "What should I do if the device isn’t turning off?",
        answer:
          "If the device doesn’t respond to power-off commands, unplug it from the power source. Contact Seenyor support if the issue persists.",
      },
    ],
  },
  // {
  //   category: "Device Issues",
  //   showFor: "Device Issues",
  //   questions: [
  //     {
  //       question: "Why isn’t my Seenyor device connecting to Wi-Fi?",
  //       answer:
  //         "Ensure your Wi-Fi network is set to 2.4GHz, as Seenyor does not support 5GHz networks. Confirm the Wi-Fi password is correct and that your router is working properly.",
  //     },
  //     {
  //       question:
  //         "How close does the Seenyor device need to be to the Wi-Fi router?",
  //       answer:
  //         "For a stable connection, place the device within 12-15 feet of your Wi-Fi router. Thick walls, metal objects, or other electronic devices may interfere with the signal if they’re in between.",
  //     },
  //     {
  //       question:
  //         "What should I do if the Wi-Fi signal is weak or intermittent?",
  //       answer:
  //         "Use a Wi-Fi extender to boost the signal, especially if the device is far from the router. Make sure the extender is placed midway between the device and router for the best results.",
  //     },
  //     {
  //       question: "Why does my device keep disconnecting from Wi-Fi?",
  //       answer:
  //         "Frequent disconnections can happen if there’s interference or if the Wi-Fi signal is weak. Try switching to a less congested Wi-Fi channel in your router settings or reducing the number of devices connected to the network.",
  //     },
  //     {
  //       question:
  //         "Why am I experiencing a delay in alerts from the Seenyor device?",
  //       answer:
  //         "Delays may result from slow or weak Wi-Fi connectivity. Make sure your internet speed is sufficient for real-time alerts, and consider rebooting the router to improve network performance.",
  //     },
  //     {
  //       question: "What if my Wi-Fi drops unexpectedly?",
  //       answer:
  //         "Restart your router and the Seenyor device to re-establish the connection. Ensure the device is within a reasonable distance of the router or use a Wi-Fi extender if needed.",
  //     },
  //     {
  //       question: "Can I connect Seenyor to a guest or public Wi-Fi network?",
  //       answer:
  //         "Seenyor works best on a secure, private Wi-Fi network. Public or guest networks may have security restrictions that can cause connection issues.",
  //     },
  //     {
  //       question:
  //         "How do I know if my Wi-Fi signal is strong enough for the Seenyor device?",
  //       answer:
  //         "Open the Seenyor app to view connection status. A strong, stable signal ensures timely alerts and data updates. If signal strength is below 70%, consider relocating the device or adding a Wi-Fi extender.",
  //     },
  //     {
  //       question: "What should I do if the Seenyor device isn’t turning on?",
  //       answer:
  //         "Confirm the device is connected to a power source and that the outlet is functioning. If the device still doesn’t power on, contact Seenyor support for assistance.",
  //     },
  //     {
  //       question:
  //         "Why am I not receiving alerts even though the device is connected?",
  //       answer:
  //         "Ensure that notifications are enabled in the Seenyor app and that your Wi-Fi connection is stable. If issues persist, restart both the device and the app.",
  //     },
  //     {
  //       question:
  //         "What should I do if the device isn’t detecting falls accurately?",
  //       answer:
  //         "Confirm the device is mounted at the recommended height of 1.6 meters and is positioned correctly. Check that fall detection is enabled in the app and that the line of sight is clear.",
  //     },
  //     {
  //       question: "How do I reset the Seenyor device?",
  //       answer:
  //         "Hold the reset button on the device (if available) or follow reset instructions in the Seenyor app. For further help, contact Seenyor support.",
  //     },
  //     {
  //       question:
  //         "What should I do if the device is not tracking health metrics?",
  //       answer:
  //         "Make sure the device is placed in an optimal position, free from obstructions, and connected to Wi-Fi. Check that health monitoring features are enabled in the app.",
  //     },
  //     {
  //       question:
  //         "How do I troubleshoot if the Seenyor app isn’t displaying data?",
  //       answer:
  //         "Verify that the device is connected to Wi-Fi and that the app has the necessary permissions. Restart the app or reinstall it if needed.",
  //     },
  //     {
  //       question: "Why is the device sending false alerts?",
  //       answer:
  //         "False alerts can occur if the device is incorrectly positioned or if the settings need adjustment. Make sure the device is securely mounted and positioned as per the instructions.",
  //     },
  //     {
  //       question:
  //         "How can I improve the device’s connection if my Wi-Fi signal is weak?",
  //       answer:
  //         "Consider moving the router closer to the device, using a Wi-Fi extender, or upgrading your internet speed if multiple devices are connected to the same network.",
  //     },
  //     {
  //       question: "What should I do if the device isn’t turning off?",
  //       answer:
  //         "If the device doesn’t respond to power-off commands, unplug it from the power source. Contact Seenyor support if the issue persists.",
  //     },
  //   ],
  // },
  {
    category: "My Account",
    showFor: "Account Login",
    questions: [
      {
        question: "How do I log into my Seenyor account?",
        answer:
          "Visit the Seenyor website, click on the 'Sign In' button, and enter your login credentials created during account sign-up.",
      },
      {
        question: "Can I update my payment information in the Seenyor app?",
        answer:
          "No, payment updates are managed through the Seenyor website. Log into your account on the website to update your payment card details.",
      },
      {
        question: "What should I do if I forget my website login password?",
        answer:
          "On the Seenyor website, click 'Forgot Password' on the sign-in page. Follow the instructions to reset your password via email.",
      },
      {
        question: "Can multiple people access the same Seenyor account?",
        answer:
          "Yes, you can share login credentials with authorized individuals to access the website for payment updates, account changes, and login management.",
      },
      {
        question: "Where can I change my password for my Seenyor account?",
        answer:
          "Log into your account on the Seenyor website, go to account settings, and select 'Change Password' to update it.",
      },
      {
        question:
          "Is it possible to use the Seenyor app to log into my account for updates?",
        answer:
          "No, all account management, including payment updates and password changes, is handled on the Seenyor website. The app is used primarily for monitoring and alerts.",
      },
      {
        question: "How do I update my payment card information?",
        answer:
          "Log into your Seenyor account on the website, go to billing settings, and follow the prompts to update your payment information.",
      },
      {
        question:
          "What should I do if my account is locked after too many failed login attempts?",
        answer:
          "Wait a few minutes and try again, or use the 'Forgot Password' option on the website. For further help, contact Seenyor support.",
      },
      {
        question: "How do I log out of my Seenyor website account?",
        answer:
          "Select the 'Log Out' button on the Seenyor website to end your session. Remember to log out on shared devices for security.",
      },
      {
        question: "How can I ensure the security of my Seenyor account?",
        answer:
          "Use a strong password and avoid sharing your login details. Log out from public or shared computers to protect your account.",
      },
    ],
  },
  {
    category: "My Account",
    showFor: "Device Logins and Account Management",
    questions: [
      {
        question: "How do I log into my Seenyor account?",
        answer:
          "Visit the Seenyor website, click on the 'Sign In' button, and enter your login credentials created during account sign-up.",
      },
      {
        question: "Can I update my payment information in the Seenyor app?",
        answer:
          "No, payment updates are managed through the Seenyor website. Log into your account on the website to update your payment card details.",
      },
      {
        question: "What should I do if I forget my website login password?",
        answer:
          "On the Seenyor website, click 'Forgot Password' on the sign-in page. Follow the instructions to reset your password via email.",
      },
      {
        question: "Can multiple people access the same Seenyor account?",
        answer:
          "Yes, you can share login credentials with authorized individuals to access the website for payment updates, account changes, and login management.",
      },
      {
        question: "Where can I change my password for my Seenyor account?",
        answer:
          "Log into your account on the Seenyor website, go to account settings, and select 'Change Password' to update it.",
      },
      {
        question:
          "Is it possible to use the Seenyor app to log into my account for updates?",
        answer:
          "No, all account management, including payment updates and password changes, is handled on the Seenyor website. The app is used primarily for monitoring and alerts.",
      },
      {
        question: "How do I update my payment card information?",
        answer:
          "Log into your Seenyor account on the website, go to billing settings, and follow the prompts to update your payment information.",
      },
      {
        question:
          "What should I do if my account is locked after too many failed login attempts?",
        answer:
          "Wait a few minutes and try again, or use the 'Forgot Password' option on the website. For further help, contact Seenyor support.",
      },
      {
        question: "How do I log out of my Seenyor website account?",
        answer:
          "Select the 'Log Out' button on the Seenyor website to end your session. Remember to log out on shared devices for security.",
      },
      {
        question: "How can I ensure the security of my Seenyor account?",
        answer:
          "Use a strong password and avoid sharing your login details. Log out from public or shared computers to protect your account.",
      },
    ],
  },
  {
    category: "Download Zone",
    showFor: "Installation FAQs",
    questions: [
      {
        question: "How do I install the Seenyor device?",
        answer:
          "Follow the instructions in the Seenyor installation guide. Mount the device ideally on the ceiling for best accuracy. If ceiling installation is not possible, it can be mounted on the side wall, but this may increase the chance of false alarms.",
      },
      {
        question: "What tools are required for installing the Seenyor device?",
        answer:
          "Basic tools such as a screwdriver and a mounting bracket (included with the device) are usually sufficient. Refer to the installation guide for specifics.",
      },
      {
        question: "Where is the best place to install the Seenyor device?",
        answer:
          "The ceiling is the optimal position to maximize monitoring accuracy. If ceiling mounting is not feasible, the device can be installed on the side wall at the recommended height of 1.6 meters, though this may increase the chance of false alerts.",
      },
      {
        question: "Where should I avoid installing the Seenyor device?",
        answer:
          "Avoid installing the device near metal objects, in areas exposed to excessive heat or moisture, and away from locations with potential obstructions like tall furniture or electronic interference (e.g., near routers or large metal appliances).",
      },
      {
        question:
          "Can I install the Seenyor device myself, or do I need professional help?",
        answer:
          "The Seenyor device is designed for easy self-installation, though professional installation is available if preferred.",
      },
      {
        question:
          "Does the device need to be connected to Wi-Fi for installation?",
        answer:
          "Yes, a stable 2.4GHz Wi-Fi connection is required for setup and operation.",
      },
      {
        question: "How do I connect the device to Wi-Fi during installation?",
        answer:
          "Follow the steps in the installation guide to connect the device to your Wi-Fi network. Make sure the network is 2.4GHz.",
      },
      {
        question:
          "What should I do if the device won’t connect to Wi-Fi during installation?",
        answer:
          "Ensure the Wi-Fi is set to 2.4GHz and double-check your password. If issues persist, try restarting your router or moving the device closer to it.",
      },
      {
        question: "Can the Seenyor device be installed outdoors?",
        answer: "No, the device is designed for indoor use only.",
      },
      {
        question: "What power source is required for the Seenyor device?",
        answer:
          "The device needs a standard power outlet. Make sure an outlet is accessible from the installation location.",
      },
      {
        question: "Does the device need line of sight to monitor effectively?",
        answer:
          "Yes, a clear line of sight enhances accuracy. Ensure the device has an unobstructed view of the area it’s intended to monitor.",
      },
      {
        question: "Is there a specific height for mounting the device?",
        answer:
          "The recommended mounting height is 1.6 meters on a side wall if the ceiling mount is not an option.",
      },
      {
        question: "Can I install multiple devices in different rooms?",
        answer:
          "Yes, you can add multiple Seenyor devices for broader coverage and manage them through the Seenyor app but you must rename them (e.g., bedroom device 1, bedroom device 2).",
      },
      {
        question: "What should I do if the device falls or gets displaced?",
        answer:
          "Reinstall it securely in the recommended position and run a self-test via the app.",
      },
      {
        question:
          "What should I do if the installation instructions aren’t clear?",
        answer:
          "Refer to the detailed installation guide provided or contact Seenyor support.",
      },
      {
        question:
          "Are there any environmental requirements for installing the device?",
        answer:
          "Install in a dry indoor area with stable room temperature, avoiding direct sunlight, excessive heat, or moisture.",
      },
      {
        question: "Does Seenyor offer installation support?",
        answer:
          "Yes, customer support is available for installation questions, and professional installation services can be requested.",
      },
    ],
  },
];

const KnowledgeDetails = ({ params }) => {
  const [currentTab, setCurrentTab] = useState(
    decodeURIComponent(params?.details)
  );
  const router = useRouter();
  const query = useSearchParams();
  const questionFromQuery = query.get("question");

  const selectedTopic = faq.find(
    (topic) =>
      topic?.showFor?.toLocaleLowerCase() === currentTab?.toLocaleLowerCase()
  );
  //  drag for pc
  const scrollRef = useRef(null);

  const onMouseDown = (e) => {
    const el = scrollRef.current;
    el.isDragging = true;
    el.startX = e.pageX - el.offsetLeft;
    el.scrollLeftStart = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const onMouseLeaveOrUp = () => {
    const el = scrollRef.current;
    el.isDragging = false;
    el.style.cursor = "grab";
  };

  const onMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el.isDragging) return;
    const x = e.pageX - el.offsetLeft;
    const distance = (x - el.startX) * 2; // স্ক্রল স্পীড কাস্টমাইজ করতে চান তো এখানে পরিবর্তন করুন
    el.scrollLeft = el.scrollLeftStart - distance;
  };
  return (
    <div>
      <div className="bg-[#7F87FC] py-5">
        <div className="mx-auto flex items-start gap-5 max-w-[1320px] w-full p-6">
          <button
            onClick={() => router.back()}
            className="text-white min-h-[100px] bg-[#A5ABFD] rounded-lg px-2"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div
            ref={scrollRef}
            className="flex select-none w-full gap-6 overflow-x-scroll scrollbar-thin scrollbar-thumb-[#C6C9FE] scrollbar-track-[#8C93FC] pb-3 cursor-grab"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseLeaveOrUp}
            onMouseLeave={onMouseLeaveOrUp}
            onMouseMove={onMouseMove}
          >
            {/* [...helpTopics]
              .sort((a, b) =>
                a.title === currentTab ? -1 : b.title === currentTab ? 1 : 0
              ) */}
            {helpTopics
              .filter(
                (topic) => topic.title === decodeURIComponent(params?.details)
              )
              .concat(
                helpTopics.filter(
                  (topic) => topic.title !== decodeURIComponent(params?.details)
                )
              )
              .map((topic, index) => (
                <div
                  onClick={() => setCurrentTab(topic?.title)}
                  key={index}
                  className={`pt-1 bg-white min-h-[120px] cursor-pointer rounded-xl ${
                    currentTab === topic?.title ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="flex flex-row items-start gap-4 p-4 w-full min-w-[280px]">
                    <Image
                      src={topic?.icon}
                      height={10}
                      width={10}
                      alt=""
                      className="h-7 w-7 pt-2"
                    />
                    <div>
                      <h3 className="font-semibold">{topic.title}</h3>
                      <p className="text-sm text-gray-500">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* accordions */}
      {/* <div className="w-full bg-[#F5F5FB]">
        <section className="w-full mx-auto max-w-6xl py-8">
          {helpTopics?.map((data) => (
            <details
              key={data?.title}
              className="group p-6 my-4 mx-4 bg-white rounded-md"
            >
              <summary className=" relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <Image
                  src="/images/pencil.svg"
                  height={30}
                  width={30}
                  alt=""
                  className="h-6 w-6"
                />
                <span className="text-lg font-semibold text-[#000]">
                  What browsers are supported?
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-1 h-5 w-5 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-ac06 desc-ac06"
                >
                  <title id="title-ac06">Open icon</title>
                  <desc id="desc-ac06">
                    icon that represents the state of the summary
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <p className="mt-4 ps-10 text-slate-500 text-sm">
                The components in Wind UI are designed to work in the latest,
                stable releases of all major browsers, including Chrome,
                Firefox, Safari, and Edge.
              </p>
            </details>
          ))}
        </section>
      </div> */}

      <div className="w-full bg-[#F5F5FB]">
        <section className="w-full mx-auto max-w-6xl py-8">
          {selectedTopic ? (
            selectedTopic?.questions.map((question, index) => (
              <details
                key={index}
                open={question.question === questionFromQuery}
                className="group p-6 my-4 mx-4 bg-white rounded-md"
              >
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900 [&::-webkit-details-marker]:hidden">
                  <Image
                    src="/images/pencil.svg"
                    height={30}
                    width={30}
                    alt=""
                    className="h-6 w-6"
                  />
                  <span className="text-lg font-semibold text-[#000]">
                    {question.question}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-1 h-5 w-5 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac06 desc-ac06"
                  >
                    <title id="title-ac06">Open icon</title>
                    <desc id="desc-ac06">
                      icon that represents the state of the summary
                    </desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <p className="mt-4 ps-10 text-base ">{question.answer}</p>
              </details>
            ))
          ) : (
            <p className="h-[50vh] flex justify-center items-center text-3xl font-semibold text-slate-500">
              No data found
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default KnowledgeDetails;
