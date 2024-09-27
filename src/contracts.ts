import { getNetworkApiUrl } from "@/network";

export type ContractInfo = {
    verifier: string;
    contract_name: string;
    program_id: string;
    state_digest: string;
};

export class ContractsStore {
    network: string;
    contractData: Record<string, ContractInfo>;

    constructor(network: string, customData?: Record<string, ContractInfo>) {
        this.network = network;
        this.contractData = customData ?? {};
    }

    async loadContractData(contract_name: string) {
        const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/history/contract/${contract_name}`);
        const contract = await response.json();
        console.log("contract", contract_name, contract);
        this.contractData[contract_name] = contract;
    }

    async loadContract() {
        const response = await fetch(`${getNetworkApiUrl(this.network)}/v1/history/contracts`);
        const contracts = await response.json();
        for (const contract of contracts) {
            this.contractData[contract.contract_name] = contract;
        }
    }
}
