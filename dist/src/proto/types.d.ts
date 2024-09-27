import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "hyle.zktx.v1";
/** Params defines the parameters of the module. */
export interface Params {
}
/** GenesisState is the state that must be provided at genesis. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    contracts: {
        [key: string]: Contract;
    };
}
export interface GenesisState_ContractsEntry {
    key: string;
    value: Contract | undefined;
}
/** Contract is the state of a contract */
export interface Contract {
    /** The identifier of the verifier to run for this contract */
    verifier: string;
    /** An identifier for the program (may depend on verifier) */
    programId: Uint8Array;
    /** Recap of the current contract state */
    stateDigest: Uint8Array;
    /** Hash of the next TX to settle, in order */
    nextTxToSettle: Uint8Array;
    /** Latest tx received to settle, for optimisation */
    latestTxReceived: Uint8Array;
}
/** PayloadMetadata is the transient state we need to keep to settle payloads */
export interface PayloadMetadata {
    /** Hash of the payload */
    payloadHash: Uint8Array;
    /** Identity of the caller */
    identity: string;
    /** Contract name to settle */
    contractName: string;
    /** The initial state of the contract */
    initialState: Uint8Array;
    /** The next state to transition to */
    nextState: Uint8Array;
    /** If this payload was verified */
    verified: boolean;
    /** If this is a success or failure */
    success: boolean;
    /** Next TX hash in the list of TX to settle */
    nextTxHash: Uint8Array;
}
/** TxTimeout is a list of TXs used to timeout */
export interface TxTimeout {
    /** List of transactions to timeout */
    txs: Uint8Array[];
}
export declare const Params: {
    encode(_: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(_: any): Params;
    toJSON(_: Params): unknown;
    create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params;
    fromPartial<I extends Exact<DeepPartial<Params>, I>>(_: I): Params;
};
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState;
    fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState;
};
export declare const GenesisState_ContractsEntry: {
    encode(message: GenesisState_ContractsEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState_ContractsEntry;
    fromJSON(object: any): GenesisState_ContractsEntry;
    toJSON(message: GenesisState_ContractsEntry): unknown;
    create<I extends Exact<DeepPartial<GenesisState_ContractsEntry>, I>>(base?: I): GenesisState_ContractsEntry;
    fromPartial<I extends Exact<DeepPartial<GenesisState_ContractsEntry>, I>>(object: I): GenesisState_ContractsEntry;
};
export declare const Contract: {
    encode(message: Contract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Contract;
    fromJSON(object: any): Contract;
    toJSON(message: Contract): unknown;
    create<I extends Exact<DeepPartial<Contract>, I>>(base?: I): Contract;
    fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract;
};
export declare const PayloadMetadata: {
    encode(message: PayloadMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PayloadMetadata;
    fromJSON(object: any): PayloadMetadata;
    toJSON(message: PayloadMetadata): unknown;
    create<I extends Exact<DeepPartial<PayloadMetadata>, I>>(base?: I): PayloadMetadata;
    fromPartial<I extends Exact<DeepPartial<PayloadMetadata>, I>>(object: I): PayloadMetadata;
};
export declare const TxTimeout: {
    encode(message: TxTimeout, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxTimeout;
    fromJSON(object: any): TxTimeout;
    toJSON(message: TxTimeout): unknown;
    create<I extends Exact<DeepPartial<TxTimeout>, I>>(base?: I): TxTimeout;
    fromPartial<I extends Exact<DeepPartial<TxTimeout>, I>>(object: I): TxTimeout;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
//# sourceMappingURL=types.d.ts.map