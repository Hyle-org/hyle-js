export type ContractInfo = {
    verifier: string;
    contract_name: string;
    program_id: string;
    state_digest: string;
};
export declare class ContractsStore {
    network: string;
    contractData: Record<string, ContractInfo>;
    constructor(network: string, customData?: Record<string, ContractInfo>);
    loadContractData(contract_name: string): Promise<void>;
    loadContract(): Promise<void>;
}
//# sourceMappingURL=contracts.d.ts.map