import { getNetworkApiUrl, getNetworkRpcUrl } from "./network";
import { MsgPublishPayloadProof, MsgPublishPayloads, MsgRegisterContract } from "./proto/tx";
import { Tx as CosmosTx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { base64ToUint8Array } from "@/utils";

export type BlobReference = {
    blob_index: number;
    blob_tx_hash: string;
    contract_name: string;
};

export type ProofData = {
    blobs_references: BlobReference[];
    proof: number[];
};

export type Blob = {
    contract_name: string;
    data: number[];
};

export type BlobData = {
    blobs: Blob[];
    identity: string;
};

export type RegisterContractData = {
    contract_name: string;
    owner: string;
    program_id: number[];
    state_digest: number[];
    verifier: string;
};

export type TransactionType = "Proof" | "Blob" | "RegisterContract" | "unknown";

export type TransactionInfo = {
    tx_hash: string;
    block_height: number;
    tx_index: number;
    type: TransactionType;
    status: "unknown" | "success" | "failure" | "sequenced";
    data: ProofData | BlobData | RegisterContractData | {};
    contracts: string[];
};

interface ParsableTx {
    type: string;
    rawData: string;
}

export function getParsedTx<T>(data: ParsableTx): T {
    const tx = CosmosTx.decode(base64ToUint8Array(data.rawData));
    if (data.type === "/hyle.zktx.v1.MsgRegisterContract") {
        return MsgRegisterContract.decode(
            tx!.body!.messages.filter((x: any) => x.typeUrl === "/hyle.zktx.v1.MsgRegisterContract")[0].value,
        ) as any as T;
    } else if (data.type === "/hyle.zktx.v1.MsgPublishPayloads") {
        return MsgPublishPayloads.decode(
            tx!.body!.messages.filter((x: any) => x.typeUrl === "/hyle.zktx.v1.MsgPublishPayloads")[0].value,
        ) as any as T;
    } else if (data.type === "/hyle.zktx.v1.MsgPublishPayloadProof") {
        return MsgPublishPayloadProof.decode(
            tx!.body!.messages.filter((x: any) => x.typeUrl === "/hyle.zktx.v1.MsgPublishPayloadProof")[0].value,
        ) as any as T;
    }
    return undefined as any;
}

export class TransactionsStore {
    network: string;
    transactionData: Record<string, TransactionInfo & { loading?: boolean }>;

    constructor(network: string, customData?: Record<string, TransactionInfo>) {
        this.network = network;
        this.transactionData = customData ?? {};
    }

    async loadTransactionData(txHash: string) {
        if (!this.transactionData[txHash]) this.transactionData[txHash] = {} as any;
        if (this.transactionData[txHash]?.type) return; // use type as a proxy for full loading (see below)
        if (this.transactionData[txHash]?.loading) return;
        this.transactionData[txHash].loading = true;

        const response = fetch(`${getNetworkApiUrl(this.network)}/v1/history/transaction/${txHash}`);
        //const settlement = fetch(`${getNetworkApiUrl(this.network)}/hyle/zktx/v1/settlement/${txHash}`);
        const data: TransactionInfo = await (await response).json();
        //const settled = await (await settlement).json();
        this.transactionData[txHash] = {
            ...data,
            ...this.get_type(data),
            contracts: this.get_contracts(data),
        };
        this.transactionData[txHash].loading = false;
        console.log("done", this.get_contracts(data), this.get_type(data), data);
    }

    get_contracts(tx: TransactionInfo): string[] {
        //console.log("tx", tx);
        if ("Blob" in tx.data) {
            const data = tx.data.Blob as BlobData;
            return data.blobs.map((blob) => blob.contract_name);
        } else if ("Proof" in tx.data) {
            const data = tx.data.Proof as ProofData;
            return data.blobs_references.map((ref) => ref.contract_name);
        }
        return [];
    }

    get_type(tx: TransactionInfo): { type: TransactionType; data: BlobData | ProofData | RegisterContractData | {} } {
        if ("Proof" in tx.data) {
            return { type: "Proof", data: tx.data.Proof as ProofData };
        } else if ("Blob" in tx.data) {
            return { type: "Blob", data: tx.data.Blob as BlobData };
        } else if ("RegisterContract" in tx.data) {
            return { type: "RegisterContract", data: tx.data.RegisterContract as RegisterContractData };
        }
        return { type: "unknown", data: {} };
    }

    async loadTxData() {
        console.log("loadTxData");
        const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/history/transactions`);
        const txs: TransactionInfo[] = /*transactions.value = */ await response.json();
        for (const tx of txs) {
            if (this.transactionData?.[tx.tx_hash]?.tx_hash) continue;
            this.transactionData[tx.tx_hash] = {
                ...tx,
                ...this.get_type(tx),
                contracts: this.get_contracts(tx),
            };
        }
    }

    async loadContractTxs(contract_name: string) {
        // TODO: load register TXs as well
        //const response = await fetch(
        //    `${getNetworkRpcUrl(
        //        this.network,
        //    )}/tx_search?query="hyle.zktx.v1.EventPayload.contract_name='\\"${contract_name}\\"'"&page=1&per_page=50&order_by="asc"&match_events=true`,
        //);
        //const txs: TransactionInfo[] = /*transactions.value = */ await response.json();
        //for (const tx of txs) {
        //    if (this.transactionData?.[tx.tx_hash]?.tx_hash) continue;
        //    this.transactionData[tx.tx_hash] = tx;
        //}
    }
}

// Load the latest by default
// loadTxData();
