import { getNetworkApiUrl, getNetworkWebsocketUrl } from "./network";
import { WebSocketConnection } from "@/indexer";

export type BlockInfo = {
    hash: string;
    parent_hash: string;
    height: number;
    timestamp: Date;
    txs: [{ hash: string }] | string[];
};

export class BlockStore {
    network: string;
    blockData: Record<string, BlockInfo>;
    blocks: { height: number; num_txs: number }[];

    constructor(network: string) {
        this.network = network;
        this.blockData = {};
        this.blocks = [];
    }

    async loadBlockData(blockIdentifier: string) {
        if (this.blockData[blockIdentifier]) return;

        const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/history/block/${blockIdentifier}`);
        const data = await response.json();
        console.log("block", blockIdentifier, data);
        let hashes = data.txs.map((x: any) => x.hash);

        this.blockData[blockIdentifier] = {
            ...data,
            timestamp: new Date(data.timestamp * 1000),
            txs: hashes,
        };
    }

    async loadBlocks() {
        const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/history/blocks`);
        this.blocks = (await response.json()).reverse();

        const client = await WebSocketConnection.connect(`${getNetworkWebsocketUrl(this.network)}`);
        client.call("subscribe", { query: "tm.event='NewBlock'" }, (result) => {
            if (!result.data?.value?.block) return;
            this.blocks.push({
                height: result.header.height,
                num_txs: result.txs.len(),
            });
        });
    }
}
