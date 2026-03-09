import Foundation
import CoreGraphics

guard CommandLine.arguments.count == 3,
      let keycode = CGKeyCode(exactly: Int(CommandLine.arguments[2]) ?? -1) else {
    fputs("Usage: key-helper <keydown|keyup> <keycode>\n", stderr)
    exit(1)
}

let direction = CommandLine.arguments[1]
let keyDown: Bool

switch direction {
case "keydown": keyDown = true
case "keyup":   keyDown = false
default:
    fputs("Unknown direction: \(direction)\n", stderr)
    exit(1)
}

guard let event = CGEvent(keyboardEventSource: nil, virtualKey: keycode, keyDown: keyDown) else {
    fputs("Failed to create CGEvent\n", stderr)
    exit(1)
}

event.post(tap: .cghidEventTap)
exit(0)
