# Monologue PTT — Stream Deck Plugin

Control [Monologue](https://monologue.to) dictation from any Stream Deck button or pedal. No keyboard simulation — uses Monologue's native URL scheme for reliable, modifier-free triggering.

Two action modes are available:

**Toggle On/Off** — Each press toggles Monologue recording on or off. Good for longer dictation sessions where you don't want to hold a button.

**Push to Talk** — Hold to record, release to stop. True push-to-talk behavior. Good for quick voice inputs and pedal use.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Build the plugin

```bash
npm run build
```

This bundles `src/plugin.ts` into `com.kadedworkin.monologue-ptt.sdPlugin/bin/plugin.js`.

### 3. Load into Stream Deck

1. Quit Stream Deck software if open
2. Copy (or symlink) `com.kadedworkin.monologue-ptt.sdPlugin` to:
   ```
   ~/Library/Application Support/com.elgato.StreamDeck/Plugins/
   ```
3. Reopen Stream Deck — the **Monologue** category will appear in the action list
4. Drag **Toggle On/Off** or **Push to Talk** onto any button or pedal slot

---

## Development

```bash
npm run watch   # rebuild on file changes
```
