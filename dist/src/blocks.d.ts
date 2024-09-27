export type BlockInfo = {
    hash: string;
    parent_hash: string;
    height: number;
    timestamp: Date;
    txs: [{
        hash: string;
    }] | string[];
};
export declare class BlockStore {
    network: string;
    blockData: Record<string, BlockInfo>;
    blocks: {
        height: number;
        num_txs: number;
    }[];
    constructor(network: string);
    loadBlockData(blockIdentifier: string): Promise<void>;
    loadBlocks(): Promise<void>;
}
//# sourceMappingURL=blocks.d.ts.map