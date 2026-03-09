# Monologue Push-to-Talk — Stream Deck Plugin

Hold a Stream Deck button (or pedal) to activate [Monologue](https://monologue.to) dictation. Release to stop.

Works on any button slot or the Stream Deck pedal.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Compile the Swift key helper

```bash
npm run build-helper
```

This compiles `src/key-helper.swift` into `com.kadedworkin.monologue-ptt.sdPlugin/bin/key-helper`.

> **Requires Xcode Command Line Tools:** `xcode-select --install`

### 3. Build the plugin

```bash
npm run build
```

This bundles `src/plugin.ts` into `com.kadedworkin.monologue-ptt.sdPlugin/bin/plugin.js`.

### 4. Load into Stream Deck

1. Quit Stream Deck software if open
2. Copy (or symlink) `com.kadedworkin.monologue-ptt.sdPlugin` to:
   ```
   ~/Library/Application Support/com.elgato.StreamDeck/Plugins/
   ```
3. Reopen Stream Deck — "Monologue" category will appear in the action list
4. Drag **Push to Talk** onto any button or pedal slot

### 5. Grant Accessibility permission

Stream Deck needs Accessibility access to simulate keystrokes:

1. **System Settings → Privacy & Security → Accessibility**
2. Enable **Stream Deck**

---

## Configuration

Long-press the button in Stream Deck to open settings. You can change the keycode if you've remapped Monologue's shortcut:

| Key | Keycode |
|-----|---------|
| Right Option (default) | 61 |
| Right Command | 54 |
| Right Shift | 60 |
| Right Control | 62 |

---

## Development

```bash
npm run watch   # rebuild on file changes
```

To recompile the Swift helper after editing `src/key-helper.swift`:
```bash
npm run build-helper
```

---

## How it works

- **keyDown event** → runs `bin/key-helper keydown 61` (simulates key press via `CGEventPost`)
- **keyUp event** → runs `bin/key-helper keyup 61` (simulates key release)
- Low-level CGEvent API ensures Monologue sees a real hardware key event
