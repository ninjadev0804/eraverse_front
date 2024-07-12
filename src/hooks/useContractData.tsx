import { useState, useCallback } from 'react'
import { readContract } from '@wagmi/core'
import { projectConfig } from '@/config/config';
import { contractABI } from '@/config/contractABI';

export const fetchWLPrice = () => {
    const [wlPrice, setWLPrice] = useState(0);

    const handleWLPrice = useCallback(async () => {
        try {
            const data = await readContract({
                address: projectConfig.contractAddress as `0x${string}`,
                abi: contractABI,
                functionName: 'WL_PRICE',
            });
            setWLPrice(Number(data) / (10 ** 18));
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
        return false;
    }, []);
    return { onWLPrice: handleWLPrice, wlPrice };
};

export const fetchReservedPrice = () => {
    const [reservedPrice, setReservedPrice] = useState(0);

    const handleReservedPrice = useCallback(async () => {
        try {
            const data = await readContract({
                address: projectConfig.contractAddress as `0x${string}`,
                abi: contractABI,
                functionName: 'RESERVED_PRICE',
            });
            setReservedPrice(Number(data) / (10 ** 18));
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
        return false;
    }, []);
    return { onReservedPrice: handleReservedPrice, reservedPrice };
};

export const fetchFcfsPrice = () => {
    const [fcfsPrice, setFcfsPrice] = useState(0);

    const handleFcfsPrice = useCallback(async () => {
        try {
            const data = await readContract({
                address: projectConfig.contractAddress as `0x${string}`,
                abi: contractABI,
                functionName: 'FCFS_PRICE',
            });
            setFcfsPrice(Number(data) / (10 ** 18));
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
        return false;
    }, []);
    return { onFcfsPrice: handleFcfsPrice, fcfsPrice };
};

// export const fetchWlEndTime = () => {
//     const [wlEndTime, setWLEndTime] = useState(0);

//     const handleWLEndTime = useCallback(async () => {
//         try {
//             const data = await readContract({
//                 address: projectConfig.contractAddress as `0x${string}`,
//                 abi: contractABI,
//                 functionName: 'wlEndTime',
//             });
//             setWLEndTime(Number(data));
//         } catch (error) {
//             console.error('Error fetching contract data:', error);
//         }
//         return false;
//     }, []);
//     return { onWLEndTime: handleWLEndTime, wlEndTime };
// };

export const fetchListEndTime = () => {
    const [listEndTime, setListEndTime] = useState(0);

    const handleListEndTime = useCallback(async () => {
        try {
            const data = await readContract({
                address: projectConfig.contractAddress as `0x${string}`,
                abi: contractABI,
                functionName: 'listedMintEndTime',
            });
            setListEndTime(Number(data));
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
        return false;
    }, []);
    return { onListEndTime: handleListEndTime, listEndTime };
};