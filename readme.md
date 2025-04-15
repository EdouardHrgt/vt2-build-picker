# Vermintide 2 Builds Picker

A simple, curated build picker for **Warhammer: Vermintide 2**.

Unlike full randomizers that often generate unfun or inefficient builds, this app selects from a collection of *off-meta but viable* builds that actually work well in regular gameplay. Builds are randomly picked from a predefined list and aim to provide both variety and usefulness.

## 🔧 Features

- Handcrafted builds that are effective and fun
- Lightweight and easy to update
- Build format stored in a simple JSON structure
- Community contributions welcome!

## 🚀 Getting Involved
The build list is constantly evolving. If you have a build you'd like to share, feel free to submit it or contact me. All contributions that fit the app’s philosophy (off-meta but effective) are appreciated!

## 📜 License & Copyright
This application and its code are my personal property.
Partial or full reproduction, reuse, or distribution of this app or its code is not allowed without my explicit consent.

Made with 🐀 by a fellow Ubersreik five fan.

## 📁 Build Format

Builds are stored in the `builds.json` file as a 3D array.  
Each build object follows this structure:

```json
{
  "career": "pyromancer",
  "melee": "ensorcelled reaper",
  "meleeProps": [
    "block cost reduction",
    "attack speed",
    "swift slaying"
  ],
  "range": "conflagration staff",
  "rangeProps": [
    "chaos",
    "infantry",
    "hunter"
  ],
  "talents": "1-3-1-3-3-2",
  "image": "pyromancer.webp",
  "charm": ["atk speed", "chaos"]
}