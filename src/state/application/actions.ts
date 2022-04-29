//@ts-nocheck
import { createAction } from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber')
export const toggleStatusModal = createAction<void>('app/toggleStatusModal')
export const updateTransactionHash = createAction<void>('app/updateTransactionHash')
export const toggleStatus = createAction<void>('app/toggleStatus')
export const updateSetStore = createAction<{ key: string; value: any }>('app/updateSetStore')
