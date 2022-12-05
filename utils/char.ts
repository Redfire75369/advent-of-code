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
