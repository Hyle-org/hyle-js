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
export declare function getParsedTx<T>(data: ParsableTx): T;
export declare class TransactionsStore {
    network: string;
    transactionData: Record<string, TransactionInfo & {
        loading?: boolean;
    }>;
    constructor(network: string, customData?: Record<string, TransactionInfo>);
    loadTransactionData(txHash: string): Promise<void>;
    get_contracts(tx: TransactionInfo): string[];
    get_type(tx: TransactionInfo): {
        type: TransactionType;
        data: BlobData | ProofData | RegisterContractData | {};
    };
    loadTxData(): Promise<void>;
    loadContractTxs(contract_name: string): Promise<void>;
}
export {};
//# sourceMappingURL=transactions.d.ts.map