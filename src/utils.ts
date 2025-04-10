export interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

// Drop-in replacement for localStorage
export class InMemoryStorage implements Storage {
    private store: Record<string, string> = {};

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }
}

export function hexToUint8Array(hex: string): Uint8Array {
    // Ensure the hex string length is even
    if (hex.length % 2 !== 0) {
        throw new Error("Hex string must have an even length");
    }

    const uint8Array = new Uint8Array(hex.length / 2);

    // Loop through the hex string and convert each pair of hex characters to a byte
    for (let i = 0; i < hex.length; i += 2) {
        uint8Array[i / 2] = parseInt(hex.substr(i, 2), 16);
    }

    return uint8Array;
}
