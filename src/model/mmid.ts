import { borshSerialize, BorshSchema } from "borsher";
import { Blob } from "@/model/hyle";

export const mmidContractName = "mmid";

//
// Types
//

export type IdentityAction =
    | {
          RegisterIdentity: {
              signature: string;
          };
      }
    | {
          VerifyIdentity: {
              nonce: number;
              signature: string;
          };
      };

//
// Builders
//

export const register = (signature: string): Blob => {
    const action: IdentityAction = {
        RegisterIdentity: { signature },
    };
    const blob: Blob = {
        contract_name: mmidContractName,
        data: serializeIdentityAction(action),
    };
    return blob;
};

export const verifyIdentity = (nonce: number, signature: string): Blob => {
    const action: IdentityAction = {
        VerifyIdentity: { nonce, signature },
    };

    const blob: Blob = {
        contract_name: mmidContractName,
        data: serializeIdentityAction(action),
    };
    return blob;
};

//
// Serialisation
//

const serializeIdentityAction = (action: IdentityAction): number[] => {
    return Array.from(borshSerialize(schema, action));
};

const schema = BorshSchema.Enum({
    RegisterIdentity: BorshSchema.Struct({
        signature: BorshSchema.String,
    }),
    VerifyIdentity: BorshSchema.Struct({
        nonce: BorshSchema.u128,
        signature: BorshSchema.String,
    }),
});
