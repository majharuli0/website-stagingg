"use client";
import { Button, Input } from "@/components";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
    category: "Account Login",
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
    category: "Device Logins and Account Management",
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
    category: "Installation FAQs",
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
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Map questions with their categories in the search results
    const result = faq
      .flatMap((category) =>
        category.questions.map((item) => ({
          ...item,
          category: category.category, // Add category to each question item
        }))
      )
      .filter((item) =>
        item.question.toLowerCase().includes(query.toLowerCase())
      );

    setFilteredQuestions(result);
  };

  return (
    <div className="bg-[#7F87FC] py-12">
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-8">
        <h1 className="text-2xl font-semibold text-white">How can we Help?</h1>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-6 w-6 text-gray-500" />
          </div>
          <Input
            type="search"
            placeholder="Search the knowledge base..."
            className="w-full rounded-full bg-white pl-10 pr-4 py-0 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {searchQuery && filteredQuestions.length > 0 ? (
            <div className=" z-[999]  h-[300px] overflow-y-scroll bg-white w-full absolute p-6 mt-2 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold">Matching Questions:</h2>
              <ul className="mt-4 space-y-4">
                {filteredQuestions.map((question, index) => (
                  <li key={index} className="text-gray-700">
                    <Link
                      href={`/faw/${
                        question?.category
                      }?question=${encodeURIComponent(question?.question)}`}
                      className="p-3 border border-slate-300 bg-slate-100 my-[2px]"
                    >
                      <strong className="w-full ">{question.question}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery?.length > 0 ? (
            <h1 className=" z-[999] bg-white w-full py-5 text-3xl font-semibold text-center absolute p-6 mt-2 max-w-2xl mx-auto">
              No question found
            </h1>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
