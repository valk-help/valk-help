window.DMA_SECTION_DATA = {
  hardware: {
    title: "Hardware Setup",
    count: "0/10",
    description: "Physical installation and BIOS configuration guide.",
    heroImage: "assets/mavis/02-hardware-setup-hardware-setup.png",
    notes: [
      "CRITICAL: Power off Main PC and unplug the power cable before installing.",
      "These BIOS settings must be configured on your Main PC. Failure to disable virtualization will result in initialization errors."
    ],
    groups: [
      {
        title: "Physical Installation",
        steps: [
          {
            number: "01",
            title: "Remove Case Bracket",
            text: ["Locate the PCIe slot you intend to use, either x1 or x16. Unscrew and remove the corresponding metal bracket from your PC case. Keep the screw handy for a later step."],
            images: ["assets/mavis/03-hardware-setup-remove-case-bracket.png"]
          },
          {
            number: "02",
            title: "Insert DMA Card",
            text: ["Align the DMA card with the PCIe slot. Press down firmly until it clicks into place. Ensure the gold contacts are fully seated in the slot."],
            images: ["assets/mavis/04-hardware-setup-insert-dma-card.png"]
          },
          {
            number: "03",
            title: "Secure the Card",
            text: ["Use the screw you removed earlier to fasten the DMA card bracket to the case. This prevents the card from moving when plugging in USB cables."],
            images: ["assets/mavis/05-hardware-setup-secure-the-card.png", "assets/mavis/06-hardware-setup-secure-the-card-view-2.png"]
          },
          {
            number: "04",
            title: "Kill Switch Check",
            text: ["Ensure the kill switch, between the two USB-C ports, is toggled on in the inward position, or the red button is clicked in."],
            images: ["assets/mavis/07-hardware-setup-kill-switch-check.png", "assets/mavis/08-hardware-setup-kill-switch-check-view-2.png"]
          },
          {
            number: "05",
            title: "Connect Data Cable",
            text: ["Plug one end of the USB-C cable into the DMA DATA port, the one farthest from your motherboard on the right. Plug the other end into your Second PC USB port."],
            images: ["assets/mavis/09-hardware-setup-connect-data-cable.png"]
          }
        ]
      },
      {
        title: "BIOS Configuration",
        intro: "Restart your PC. Immediately after the screen turns on, before the Windows logo appears, repeatedly press DEL, F2, or F10 on your keyboard.",
        steps: [
          {
            number: "06",
            title: "Virtualization",
            text: ["Disable virtualization technologies to ensure direct memory access. For Intel users, disable VT-d. For AMD users, disable SVM/IOMMU."],
            images: ["assets/mavis/10-hardware-setup-intel-bios-settings.png", "assets/mavis/11-hardware-setup-amd-bios-settings.png"]
          },
          {
            number: "07",
            title: "Fast Boot",
            text: ["Disable Fast Boot and Fast Memory Boot to ensure the DMA card initializes properly on every restart."],
            images: ["assets/mavis/12-hardware-setup-fast-boot.png"]
          },
          {
            number: "08",
            title: "NX-Bit",
            text: ["Disable NX-Bit, also called Execute Disable Bit, if available. This is usually found in Advanced CPU Configuration."],
            images: ["assets/mavis/13-hardware-setup-nx-bit.png"]
          },
          {
            number: "09",
            title: "CSM Support",
            text: ["Enable CSM, also called Compatibility Support Module, or set boot mode to Legacy/UEFI Hybrid."],
            images: ["assets/mavis/14-hardware-setup-csm-support.png"]
          },
          {
            number: "10",
            title: "Windows: Core Isolation",
            text: ["In Windows settings, find Core Isolation. Turn off Memory Integrity, then reboot."],
            images: ["assets/mavis/15-hardware-setup-windows-core-isolation.png"]
          }
        ]
      }
    ]
  },
  software: {
    title: "Software Setup",
    count: "0/5",
    description: "Driver installation and setup instructions.",
    heroImage: "assets/mavis/16-software-setup-run-the-tool.png",
    notes: ["These steps must be performed on your Second PC only."],
    resources: [
      { label: "CH341PAR Driver Tool", href: "https://wch-ic.com/downloads/CH341PAR_EXE.html", detail: "Core DMA driver for Second PC" }
    ],
    groups: [
      {
        title: "Driver Installation",
        steps: [
          { number: "01", title: "Power On Both Computers", text: ["Ensure both your Main PC and Second PC are fully powered on and booted into Windows."] },
          { number: "02", title: "Download CH341PAR Tool", text: ["On your Second PC, download and extract the CH341PAR driver tool to your desktop."] },
          { number: "03", title: "Run the Tool", text: ["Locate CH341PAR.exe on your desktop and double-click to run it. The Driver Setup window will appear."], images: ["assets/mavis/16-software-setup-run-the-tool.png"] },
          { number: "04", title: "Install Driver", text: ["In the Driver Setup window, select the CH341MOD_INF option from the dropdown, then click INSTALL."] },
          { number: "05", title: "Verify Installation", text: ["You should see a message saying Driver install success. Click OK to close the dialog."], images: ["assets/mavis/17-software-setup-verify-installation.png"] }
        ]
      }
    ]
  },
  testing: {
    title: "Testing & Verification",
    description: "Validation and troubleshooting common issues.",
    heroImage: "assets/mavis/01-welcome-mavisdma-logo.png",
    resources: [
      { label: "Download DMA Speed Tester", href: "https://github.com/ShadowSyntax/lones-DMA-speed-test", detail: "Speed and throughput test utility" }
    ],
    groups: [
      {
        title: "Verification",
        cards: [
          {
            title: "Test Procedure",
            items: ["Connect cable to the Data Port.", "Download and open DMA Tester as admin.", "Press 1 to start the test.", "Wait for results."]
          },
          {
            title: "Speed Results Guide",
            items: ["Below 60 MB/s: bad speed. Try a better USB cable, another USB 3 port, or another PCIe slot.", "100 MB/s or higher: good speed.", "150 MB/s or higher: great speed."]
          },
          {
            title: "Troubleshooting",
            items: ["Error: VMM Failed (All Zeros)", "Error: VMM Failed (Non-Zeros)", "Low Read/Throughput Speed"]
          }
        ]
      }
    ]
  },
  firmware: {
    title: "Firmware Updates",
    count: "0/17",
    description: "Firmware flashing guide.",
    heroImage: "assets/mavis/18-firmware-updates-jtag-port-connection.png",
    notes: ["Flashing firmware incorrectly can brick your DMA card. Follow these steps carefully. Do not disconnect power or cables during the flashing process. Make sure you have the correct firmware file for your MavisDMA card model."],
    resources: [
      { label: "CH347 FPGA Tool", href: "https://github.com/WCHSoftGroup/ch347/releases", detail: "Required for flashing firmware .bin files to your DMA card" }
    ],
    groups: [
      {
        title: "What You'll Need",
        cards: [
          { title: "Firmware Package", items: ["Latest firmware .zip file from your DMA dashboard or purchase email."] },
          { title: "USB-C Cable", items: ["The same USB-C cable you use for your DMA card DATA port."] }
        ]
      },
      {
        title: "Flashing Steps",
        steps: [
          { number: "01", title: "Connect USB-C Cable to JTAG Port", text: ["Connect the USB-C cable to the JTAG port on your DMA card, the left port."], images: ["assets/mavis/18-firmware-updates-jtag-port-connection.png"] },
          { number: "02", title: "Insert USB 3.0 Cable into JTAG Port", text: ["Insert the USB 3.0 cable into the JTAG port of your DMA card."] },
          { number: "03", title: "Connect to Second PC", text: ["Insert the other side of the USB cable into a USB 3.0 port on the Second PC."] },
          { number: "04", title: "Turn on Main and Second PC", text: ["Power on both your Main PC and Second PC."] },
          { number: "05", title: "Run Driver SETUP.exe", text: ["On the Second PC, navigate to the CH341PAR driver folder and run SETUP.exe."] },
          { number: "06", title: "Select INSTALL", text: ["In the driver installation window, select INSTALL to begin installing the CH341PAR driver."], images: ["assets/mavis/19-firmware-updates-driver-install-window.png"] },
          { number: "07", title: "Driver Install Success", text: ["You should see a Driver install success message. Click OK to continue."] },
          { number: "08", title: "Download and Move CH347FPGATool Folder", text: ["Download the CH347 tool and move the CH347FPGATool folder to the desktop or to Drive C. This is mandatory."], images: ["assets/mavis/20-firmware-updates-ch347fpgatool-folder.png"] },
          { number: "09", title: "Move Firmware File to CH347FPGATool", text: ["Move your firmware file, ending in .bin, to the CH347FPGATool folder."], images: ["assets/mavis/21-firmware-updates-ch347fpgatool-contents.png"] },
          { number: "10", title: "Run CH347FpgaDownloadTool.exe", text: ["Open the CH347FPGATool folder and run CH347FpgaDownloadTool.exe."] },
          { number: "11", title: "Select xc7a75t", text: ["In the FPGA column, select xc7a75t from the dropdown menu."], images: ["assets/mavis/22-firmware-updates-select-xc7a75t.png"] },
          { number: "12", title: "Change from BIT to BIN", text: ["In the middle column, change the file type from BIT to BIN."], images: ["assets/mavis/23-firmware-updates-change-to-bin.png"] },
          { number: "13", title: "Select Your Firmware File", text: ["Click Select File and choose your firmware .bin file from the CH347FPGATool folder."], images: ["assets/mavis/24-firmware-updates-select-firmware-file.png"] },
          { number: "14", title: "Start Flashing Process", text: ["Click Download to start the flashing process."], images: ["assets/mavis/25-firmware-updates-start-flashing.png"] },
          { number: "15", title: "Wait for Completion", text: ["Wait until the flashing process is complete. It may take 3-4 minutes. Do not disconnect the cable or power off during this process."], images: ["assets/mavis/26-firmware-updates-flashing-progress.png"] },
          { number: "16", title: "Restart Main PC", text: ["After the process is completed, restart your Main PC."] },
          { number: "17", title: "Run Test", text: ["Go to the Testing & Verification page to verify your DMA card is working correctly with the new firmware."] }
        ]
      }
    ]
  },
  makcu: {
    title: "Makcu Setup",
    count: "0/12",
    description: "Configure the Makcu keyboard and mouse board.",
    heroImage: "assets/mavis/27-makcu-setup-makcu-setup.png",
    notes: ["All steps must be performed on your Second PC."],
    resources: [
      { label: "MAKCU.exe Tool", href: "https://discord.gg/makcu", detail: "Join Discord and request the MAKCU flashing tool" },
      { label: "CH343 Serial Driver", href: "https://www.wch-ic.com/downloads/CH343SER_EXE.html", detail: "Required for COM port communication" }
    ],
    groups: [
      {
        title: "Recommended Hardware",
        cards: [
          { title: "USB Cable", items: ["Any USB 2.0 or 3.0 cable."] },
          { title: "Operating System", items: ["Windows 10 or 11."] },
          { title: "Incompatible Mice", items: ["Avoid ROG Omni receiver, Vaxee NP01S v2 wireless, Razer Viper 8k, HyperX Pulsefire Haste, Mouse Gamer Motospeed V70, Corsair Nightsword."] }
        ]
      },
      {
        title: "Flashing MAKCU",
        steps: [
          { number: "01", title: "Download MAKCU Tool", text: ["The MAKCU.exe tool is available from the community Discord. Request access to download it before proceeding."] },
          { number: "02", title: "Flash Left Port (Enter Mode)", text: ["Run MAKCU.exe on your Second PC. Hold down the LEFT button on MAKCU. While holding, connect USB cable from Second PC to the LEFT port on MAKCU. Release the button when you see connection text in the app.", "After connecting, you should see the connected flash mode screen."], images: ["assets/mavis/28-makcu-setup-flash-left-port-enter-mode.png", "assets/mavis/29-makcu-setup-makcu-connected-in-flash-mode.png"] },
          { number: "03", title: "Flash Left Port (Execute)", text: ["In the MAKCU application, click USB1 Flash and wait for the process to complete."], images: ["assets/mavis/30-makcu-setup-flash-left-port-execute.png"] },
          { number: "04", title: "Unplug USB Cable", text: ["Unplug the USB cable from MAKCU completely."] },
          { number: "05", title: "Flash Right Port (Enter Mode)", text: ["Hold down the RIGHT button on MAKCU. While holding, connect USB cable from Second PC to the RIGHT port on MAKCU. Release the button when connected."], images: ["assets/mavis/31-makcu-setup-flash-right-port-enter-mode.png"] },
          { number: "06", title: "Flash Right Port (Execute)", text: ["In the MAKCU application, click USB3 Flash and wait for the process to complete. Unplug the cable when done."], images: ["assets/mavis/32-makcu-setup-flash-right-port-execute.png"] },
          { number: "07", title: "Install CH343 Driver", text: ["Extract the CH343 driver package and run the installer to complete installation."], images: ["assets/mavis/33-makcu-setup-install-ch343-driver.png"] },
          { number: "08", title: "Connect Middle Port", text: ["Connect USB cable to the MIDDLE port of MAKCU and to your Second PC."], images: ["assets/mavis/34-makcu-setup-connect-middle-port.png"] },
          { number: "09", title: "Find COM Port", text: ["On Second PC, open Device Manager, then Ports. Find USB-Enhanced-SERIAL CH343 and note the COM number, such as COM5."], images: ["assets/mavis/35-makcu-setup-find-com-port.png"] },
          { number: "10", title: "Change COM Port", text: ["Right-click USB-Enhanced-SERIAL CH343, open Properties, Port Settings, then Advanced. Select a COM number below 10, such as COM1 or COM3. Click OK. Close and restart MAKCU by unplugging and replugging USB.", "Select a COM port below 10."], images: ["assets/mavis/36-makcu-setup-change-com-port.png", "assets/mavis/37-makcu-setup-com-port-selection.png"] },
          { number: "11", title: "Final Wiring", text: ["Connect LEFT port to Main PC, MIDDLE port to Second PC, and RIGHT port to your mouse."] },
          { number: "12", title: "Test MAKCU", text: ["Run MAKCU.exe on Second PC. Click Test. If your cursor on Main PC teleports, everything is working properly."] }
        ]
      }
    ]
  },
  hdmi: {
    title: "Dichen HDMI Fuser",
    count: "0/22",
    description: "Advanced HDMI fuser setup and EDID programming guide.",
    heroImage: "assets/mavis/57-dichen-hdmi-fuser-dichen-hdmi-fuser.png",
    resources: [
      { label: "Dichen Programming Files", href: "https://github.com/colinwhitehill/DichenFiles", detail: "Required programming and configuration files for Dichen HDMI Fuser" }
    ],
    notes: ["Ensure both your Main PC and Second PC are set to the same resolution and refresh rate before connecting the fuser."],
    groups: [
      {
        title: "Setup Steps",
        steps: [
          { number: "01", title: "Resolution Check", text: ["Before doing anything with the fuser, ensure the two systems you intend to use with the fuser are set to the same resolution and refresh rate."], images: ["assets/mavis/58-dichen-hdmi-fuser-resolution-check.png", "assets/mavis/59-dichen-hdmi-fuser-resolution-check-view-2.png"] },
          { number: "02", title: "Connect Main Display", text: ["Plug your main display into the fuser HDMI port for your monitor."], images: ["assets/mavis/60-dichen-hdmi-fuser-connect-main-display.png"] },
          { number: "03", title: "Connect Main PC", text: ["From your Main PC, plug an HDMI cable from your GPU or motherboard into the fuser HDMI port designated for Main PC, Input 1."], images: ["assets/mavis/61-dichen-hdmi-fuser-connect-main-pc.png"] },
          { number: "04", title: "Connect Second PC", text: ["From your Second PC, plug an HDMI cable from your GPU or motherboard into the fuser HDMI port designated for Second PC, Input 2."], images: ["assets/mavis/62-dichen-hdmi-fuser-connect-second-pc.png"] },
          { number: "05", title: "Connect Power", text: ["Using the provided power cable, plug the fuser into the DC12V power port."], images: ["assets/mavis/63-dichen-hdmi-fuser-connect-power.png"] },
          { number: "06", title: "Power On Fuser", text: ["Press the power button on the fuser to turn it on. The power LED D1 should turn bright red when powered on."], images: ["assets/mavis/64-dichen-hdmi-fuser-power-on-fuser.png"] },
          { number: "07", title: "Verify Status Lights", text: ["Check the status lights on the front panel. D1 is power. D2 is active fusion. H1 is HDMI port 1 status. H2 is HDMI port 2 status."], images: ["assets/mavis/65-dichen-hdmi-fuser-verify-status-lights.png"] },
          { number: "08", title: "Control Buttons", text: ["Familiarize yourself with the fuser control buttons. K1 changes resolution. K2 adjusts lower layer display overlay strength. K3 resets lower layer overlay strength. K4 toggles between fusion, HDMI 1, and HDMI 2."], images: ["assets/mavis/66-dichen-hdmi-fuser-control-buttons.png"] },
          { number: "09", title: "Test Active Fusion", text: ["Active display fusion is indicated by all four lights on the front panel being active. If all lights are on, your fuser is successfully combining both displays."] },
          { number: "10", title: "EDID Programming (If Needed)", text: ["EDID programming is only needed if you are having compatibility issues after normal setup. Skip this section if everything is working properly."] },
          { number: "11", title: "Connect Programming PC", text: ["Before starting, plug your programming PC into your main monitor using an HDMI cable. The programming PC can be any PC capable of reaching the desired resolution and refresh rate within fuser output limits."] },
          { number: "12", title: "Unplug All HDMI Cables", text: ["Unplug all HDMI cables from the fuser. Connect the Type-C port to your programming PC. Ensure power is connected and turn the fuser on."], images: ["assets/mavis/67-dichen-hdmi-fuser-unplug-all-hdmi-cables.png"] },
          { number: "13", title: "Download Programming Software", text: ["On your programming PC, download and extract the Dichen Programming.zip folder to the desktop."] },
          { number: "14", title: "Install MonitorAssetManager", text: ["Open the MonitorAssetManager installer.exe from the extracted folder and follow the installation steps."], images: ["assets/mavis/68-dichen-hdmi-fuser-install-monitorassetmanager.png"] },
          { number: "15", title: "Save Monitor EDID File", text: ["Within Monitor Asset Manager, open the File menu and click Save as. Save the file to the same location you extracted the zip to."], images: ["assets/mavis/69-dichen-hdmi-fuser-save-monitor-edid-file.png", "assets/mavis/70-dichen-hdmi-fuser-save-monitor-edid-file-view-2.png"] },
          { number: "16", title: "Open EDID Flash Tool", text: ["Open EDID Flash Tool.exe from the Dichen Programming folder."], images: ["assets/mavis/71-dichen-hdmi-fuser-open-edid-flash-tool.png"] },
          { number: "17", title: "Select COM Port", text: ["In the EDID Flash Tool, select the COM port for the Dichen fuser. This can be found in Device Manager under Ports (COM)."] },
          { number: "18", title: "Select Target Resolution", text: ["Select your target resolution from the dropdown menu in the EDID Flash Tool."] },
          { number: "19", title: "Load Monitor File", text: ["Check the radio button on the right side, then click the button that enables. Locate your monitor file saved earlier and open it in DC Injector."] },
          { number: "20", title: "Flash EDID to Fuser", text: ["Click the final button to send the EDID to the fuser. If programming is successful, you will get a success message. Otherwise, contact support."] },
          { number: "21", title: "Troubleshooting: Pink/Purple Hue", text: ["If you have a colored hue after setting up your fuser on one display, ensure both displays are set to 8-bit depth and RGB color format. These settings can be changed in NVIDIA Control Panel or AMD Control Panel."] },
          { number: "22", title: "Reset EDID If Issues", text: ["If you are having issues after EDID programming: connect Type-C to your programming PC, open EDID Flash Tool.exe, select the COM port for the fuser serial, do not select any radio options, click reset, then reach out to support if issues persist."] }
        ]
      }
    ]
  }
};
