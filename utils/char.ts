import {within} from "./int.ts";

export function charCode(char: string): number {
	return char.charCodeAt(0);
}

export function alphabetCode(char: string): number {
	if (charCode(char) > 0x60) {
		return charCode(char) - 0x60;
	} else {
		return charCode(char) - 0x40;
	}
}

export function charFromCode(code: number): string {
	return String.fromCharCode(code);
}

export function isDigit(char: string): boolean {
	return char.length === 1 && within(charCode(char), 0x30, 0x39);
}
