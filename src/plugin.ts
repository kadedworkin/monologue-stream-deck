import streamDeck, { action, KeyDownEvent, KeyUpEvent, SingletonAction } from "@elgato/streamdeck";
import { execFile } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HELPER_PATH = resolve(__dirname, "../bin/key-helper");

function sendKey(direction: "keydown" | "keyup", keycode: number): void {
	execFile(HELPER_PATH, [direction, String(keycode)], (err) => {
		if (err) {
			streamDeck.logger.error(`key-helper error: ${err.message}`);
		}
	});
}

@action({ UUID: "com.kadedworkin.monologue-ptt.ptt" })
export class PushToTalk extends SingletonAction {
	private keycode = 61; // Right Option key

	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		const settings = ev.payload.settings as { keycode?: number };
		this.keycode = settings?.keycode ?? 61;
		sendKey("keydown", this.keycode);
		await ev.action.setTitle("🎙");
	}

	override async onKeyUp(ev: KeyUpEvent): Promise<void> {
		sendKey("keyup", this.keycode);
		await ev.action.setTitle("");
	}
}

streamDeck.actions.registerAction(new PushToTalk());
streamDeck.connect();
