import streamDeck, { action, KeyDownEvent, KeyUpEvent, SingletonAction } from "@elgato/streamdeck";
import { execFile } from "child_process";

// Trigger Monologue via its URL scheme — reliable, no CGEvent/keyboard simulation.
// monologue://record-dictation is a toggle: idle → start, recording → stop.
// open -g keeps it backgrounded (no focus steal).
function triggerMonologue(): void {
	execFile("open", ["-g", "monologue://record-dictation"], (err) => {
		if (err) {
			streamDeck.logger.error(`monologue URL scheme error: ${err.message}`);
		}
	});
}

@action({ UUID: "com.kadedworkin.monologue-ptt.ptt" })
export class PushToTalk extends SingletonAction {
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		triggerMonologue(); // start recording
		await ev.action.setTitle("🎙");
	}

	override async onKeyUp(ev: KeyUpEvent): Promise<void> {
		triggerMonologue(); // stop recording
		await ev.action.setTitle("");
	}
}

streamDeck.actions.registerAction(new PushToTalk());
streamDeck.connect();
