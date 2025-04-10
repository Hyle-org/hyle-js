import { ec } from "elliptic";
import { SHA256, enc, lib } from "crypto-js";
import { Blob } from "@/model/hyle";
import { createSecp256k1Blob } from "@/model/seckp256k1";
import { hexToUint8Array, Storage } from "@/utils";

export class AuthService {
    private privateKey: string | null = null;
    private sessionKey: string | null = null;
    private ec: ec;
    private privateKeyStorageKey: string;
    private sessionKeyStorageKey: string;
    private storage: Storage;

    constructor(
        storage: Storage = localStorage,
        sessionKeyStorageKey: string = "hyle_session_private_key",
        publicKeyStorageKey: string = "hyle_session_key",
    ) {
        this.ec = new ec("secp256k1");
        this.storage = storage;
        this.privateKeyStorageKey = sessionKeyStorageKey;
        this.sessionKeyStorageKey = publicKeyStorageKey;

        // Retrieve the sessionKey and publicKey from storage
        this.privateKey = this.storage.getItem(this.privateKeyStorageKey);
        this.sessionKey = this.storage.getItem(this.sessionKeyStorageKey);
    }

    generateSessionKey(): string {
        const keyPair = this.ec.genKeyPair();
        const privateKey = keyPair.getPrivate("hex");
        if (!privateKey) {
            throw new Error("Failed to generate private key");
        }
        this.privateKey = privateKey;

        const publicKey = keyPair.getPublic("hex");
        if (!publicKey) {
            throw new Error("Failed to generate public key");
        }
        this.sessionKey = publicKey;

        // Save to storage
        this.storage.setItem(this.privateKeyStorageKey, this.privateKey);
        this.storage.setItem(this.sessionKeyStorageKey, this.sessionKey);
        return this.sessionKey;
    }

    getSessionKey(): string | null {
        return this.sessionKey;
    }

    signMessage(message: string | lib.WordArray): ec.Signature {
        if (!this.privateKey) {
            throw new Error("No session key available");
        }

        const hash = SHA256(message);
        const keyPair = this.ec.keyFromPrivate(this.privateKey);
        const signature = keyPair.sign(hash.toString());

        const n = this.ec.curve.n;
        const s = signature.s;
        if (s.gt(n.shrn(1))) {
            signature.s = n.sub(s);
        }

        return signature;
    }

    signMessageAsBlob(identity: string, message: string | lib.WordArray): Blob {
        if (!this.privateKey) {
            throw new Error("No session key available");
        }

        const msg = hexToUint8Array(SHA256(message).toString(enc.Hex));
        const keyPair = this.ec.keyFromPrivate(this.privateKey);
        const publicKey = keyPair.getPublic(true, "array");
        const signature = toCompact(this.signMessage(message));

        return createSecp256k1Blob(identity, msg, new Uint8Array(publicKey), new Uint8Array(signature));
    }

    clearSession() {
        this.privateKey = null;
        this.sessionKey = null;
        this.storage.removeItem(this.privateKeyStorageKey);
        this.storage.removeItem(this.sessionKeyStorageKey);
    }
}

export function toCompact(signature: ec.Signature): Uint8Array {
    const n = signature.r.toArray("le", 32);
    const s = signature.s.toArray("le", 32);

    const recoveryParam = signature.recoveryParam;
    const compactSignature = new Uint8Array(64);
    compactSignature.set(n);
    compactSignature.set(s, 32);
    compactSignature[63] = recoveryParam || 0;
    return compactSignature;
}
