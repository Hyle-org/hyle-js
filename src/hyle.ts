import { getNetworkApiUrl } from "./network.ts";

// Proof should be base64, hash should be hex
export async function broadcastProofTx(network: string, hash: string, blobIndex: number, contractName: string, _proof: string) {
    // const proofTx = {
    //     txHash: hash,
    //     blobIndex: blobIndex,
    //     contractName: contractName,
    //     proof: proof,
    // }
    const proofTx = {
        txHash: hash,
        blobs_references: [{
            contract_name: contractName,
            blob_tx_hash: hash,
            blob_index: blobIndex,
        }],
        proof: [],
    }

    // const fee = {
    //     amount: [
    //         {
    //             denom: "hyle",
    //             amount: "2000",
    //         },
    //     ],
    //     gas: "180000", // 180k
    // };
    const response = await fetch(`${getNetworkApiUrl(network)}/v1/tx/send/proof`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(proofTx),
    });

    let proofTxHash = await response.json(); 
    return proofTxHash
}

export async function broadcastBlobTx(network: string, identity: string, blobs: { contractName: string; data: string }[]) {
    const transformedBlobs = blobs.map(blob => ({
        contract_name: blob.contractName,
        // data need to be the array of the ascii reprensatiton of the blob
        data: Array.from(new TextEncoder().encode(blob.data))
    }));
    
    let blobTx = {
        identity,
        blobs: transformedBlobs,
    };
    // const fee = {
    //     amount: [
    //         {
    //             denom: "hyle",
    //             amount: "2000",
    //         },
    //     ],
    //     gas: "180000", // 180k
    // };

    const response = await fetch(`${getNetworkApiUrl(network)}/v1/tx/send/blob`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blobTx),
    });
    let blobTxHash = await response.json(); 
    return blobTxHash
}

export async function checkTxesStatus(network: string, hashes: string[]) {
    for (const hash of hashes) {
        const resp2 = await checkTxStatus(network, hash);
        if (resp2.status == "failed") {
            return resp2;
        }
    }
    return {
        status: "success",
    };
}

export async function checkTxStatus(network: string, txHash: string) {
    const response = await fetch(`${getNetworkApiUrl(network)}/v1/history/transaction/${txHash}`, {
        method: 'GET',
    });
    if (!response.ok) {
        return {
            status: "failed",
            error: "Tx not found",
        };
    }
    return {
        status: "success",
    };
}

export async function checkContractExists(network: string, contractName: string) {

    const checkExists = await fetch(`${getNetworkApiUrl(network)}/v1/history/contract/${contractName}`);

    try {
        let data = await checkExists.json();
        return data.name == contractName;
    } catch (e) {
        return false;
    }
}

export async function registerContract(network: string, verifier: string, contractName: string, programId: Uint8Array, stateDigest: Uint8Array) {
    var owner = "todo"; 
    let contractRegister = {
        owner: owner,
        verifier,
        contract_name: contractName,
        program_id: Array.from(programId),
        state_digest: Array.from(stateDigest),
    };
    // const fee = {
    //     amount: [
    //         {
    //             denom: "hyle",
    //             amount: "2000",
    //         },
    //     ],
    //     gas: "180000", // 180k
    // };

    const response = await fetch(`${getNetworkApiUrl(network)}/v1/contract/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractRegister),
    });

    return await response.json();
}
