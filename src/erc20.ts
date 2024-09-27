import { deserByteArray } from "./ByteArray";
import { MsgPublishPayloads } from "./proto/tx";
import { TransactionInfo } from "./transactions";

export class Erc20Parser {
    contractName = "erc20";

    balancesSettled = {} as Record<string, number>;
    balancesPending = {} as Record<string, number>;
    pendingPerAccount = {} as Record<string, string[]>;
    pendingTxs = {} as Record<string, MsgPublishPayloads>;

    constructor(contractName?: string) {
        if (contractName) this.contractName = contractName;
    }

    consumeTx(tx: TransactionInfo) {
        if (tx.type !== "Blob") return;
        //const msg = getParsedTx<MsgPublishPayloads>(tx);
        //this.consumePayload(msg, tx.tx_hash);
    }

    consumePayload(msg: MsgPublishPayloads, hash: string) {
        msg.payloads.forEach((payload) => {
            if (payload.contractName !== this.contractName) return;
            // TODO: check identity
            // Parse payload data as ascii
            const parsed = new TextDecoder().decode(payload.data);
            const felts = parsed.split(" ").slice(1); // First item is the number of item in the array, skip it.
            const fromSize = parseInt(felts[0]);
            const from = deserByteArray(felts.slice(0, fromSize + 3));
            const toSize = parseInt(felts[3 + fromSize]);
            const to = deserByteArray(felts.slice(3 + fromSize, 3 + fromSize + toSize + 3));
            const amount = parseInt(felts.slice(-1)[0]);
            // Update balances
            this.balancesPending[from] = (this.balancesPending[from] || this.balancesSettled[from] || 0) - amount;
            this.balancesPending[to] = (this.balancesPending[to] || this.balancesSettled[to] || 0) + amount;
            this.pendingPerAccount[from] = this.pendingPerAccount[from] || [];
            this.pendingPerAccount[from].push(hash);
            this.pendingPerAccount[to] = this.pendingPerAccount[to] || [];
            this.pendingPerAccount[to].push(hash);
            this.pendingTxs[hash] = msg;
        });
    }

    settleTx(hash: string, success: boolean) {
        const msg = this.pendingTxs[hash];
        msg.payloads.forEach((payload) => {
            if (payload.contractName !== this.contractName) return;
            // Parse payload data as ascii
            const parsed = new TextDecoder().decode(payload.data);
            const felts = parsed.split(" ").slice(1); // First item is the number of item in the array, skip it.
            // First item is array length, ignore
            const fromSize = parseInt(felts[0]);
            const from = deserByteArray(felts.slice(0, fromSize + 3));
            const toSize = parseInt(felts[3 + fromSize]);
            const to = deserByteArray(felts.slice(3 + fromSize, 3 + fromSize + toSize + 3));
            const amount = parseInt(felts.slice(-1)[0]);
            this.balancesPending[from] = (this.balancesPending[from] || 0) + amount;
            this.balancesPending[to] = (this.balancesPending[to] || 0) - amount;
            if (success) {
                // Update balances
                this.balancesSettled[from] = (this.balancesSettled[from] || 0) - amount;
                this.balancesSettled[to] = (this.balancesSettled[to] || 0) + amount;
            }
            // Pop pending (must exist)
            const pending = this.pendingPerAccount[from];
            pending.splice(pending.indexOf(hash), 1);
            if (pending.length === 0) delete this.pendingPerAccount[from];
            const pendingTo = this.pendingPerAccount[to];
            pendingTo.splice(pendingTo.indexOf(hash), 1);
            if (pendingTo.length === 0) delete this.pendingPerAccount[to];
        });
    }
}
