import streamDeck, { action, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { execFile } from "child_process";

// Trigger Monologue via its URL scheme — reliable, no CGEvent/keyboard simulation.
// monologue://record-dictation is a toggle: idle → start, recording → stop.
// open -g keeps it backgrounded (no focus steal).
function triggerRecordToggle(): void {
	execFile("open", ["-g", "monologue://record-dictation"], (err) => {
		if (err) {
			streamDeck.logger.error(`monologue URL scheme error: ${err.message}`);
		}
	});
}

// ─── Toggle On/Off ────────────────────────────────────────────────────────────
// Each button press toggles Monologue recording on or off.

@action({ UUID: "com.kadedworkin.monologue-ptt.toggle" })
export class ToggleOnOff extends SingletonAction {
	private isRecording = false;

	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		this.isRecording = false;
		if (ev.action.isKey()) {
			await ev.action.setTitle("");
		}
	}

	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		triggerRecordToggle();
		this.isRecording = !this.isRecording;
		await ev.action.setTitle(this.isRecording ? "● REC" : "");
	}
}

// ─── Push to Talk ─────────────────────────────────────────────────────────────
// Hold to record, release to stop. State-guarded to prevent double-fires
// if the key is held down long enough to generate repeat events.

@action({ UUID: "com.kadedworkin.monologue-ptt.ptt" })
export class PushToTalk extends SingletonAction {
	private isRecording = false;

	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		this.isRecording = false;
		if (ev.action.isKey()) {
			await ev.action.setTitle("");
		}
	}

	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		if (this.isRecording) return; // ignore repeat keyDown events
		triggerRecordToggle(); // start recording
		this.isRecording = true;
		await ev.action.setTitle("🎙");
	}

	override async onKeyUp(ev: KeyUpEvent): Promise<void> {
		if (!this.isRecording) return; // nothing to stop
		triggerRecordToggle(); // stop recording
		this.isRecording = false;
		await ev.action.setTitle("");
	}
}

// ─── Registration ─────────────────────────────────────────────────────────────

streamDeck.actions.registerAction(new ToggleOnOff());
streamDeck.actions.registerAction(new PushToTalk());
streamDeck.connect();
