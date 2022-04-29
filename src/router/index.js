import React from 'react'
import Router,{ useLocation,useHistory } from 'react-router-dom'

import Admin from '../views/Admin'
import Nfts from '../views/Nfts'
import NftsAdd from '../views/Nfts/components/Add'
import NftsAddAdvance from '../views/Nfts/components/Advance'
import NftsHold from '../views/Nfts/Hold'
import Blindbox from '../views/Blindbox'
import BlindboxAdd from '../views/Blindbox/components/Add'
import BlindboxAddAdvance from '../views/Blindbox/components/Advance'
import BlindboxHold from '../views/Blindbox/Hold'
// import Tokenlock from '../views/Tokenlock'
// import TokenlockMy from '../views/Tokenlock/My'
// import TokenlockAdd from '../views/Tokenlock/components/Add'
import Solution from '../views/Solution'
import SolutionDetail from '../views/Solution/components/Detail'
import SolutionOpen from '../views/Solution/components/Open'
import SolutionAdminDex from '../views/SolutionAdmin/Dex'
import SolutionAdminDexAdd from '../views/SolutionAdmin/components/Add'
// import Tokenvesting from '../views/Tokenvesting'
// import TokenvestingHold from '../views/Tokenvesting/Hold'
// import TokenvestingAdd from '../views/Tokenvesting/components/Add'
// import TokenvestingAddAdvance from '../views/Tokenvesting/components/Advance'
import Toast from "light-toast";

export const RouterConfig = [
  {
    path: '/admin',
    name: 'Admin',
    exact: true,
    component: Admin,
    meta: 'h_item1'
  },
  {
    path: '/nfts',
    name: 'Nfts',
    exact: true,
    component: Nfts,
    meta: 'h_item4'
  },
  {
    path: '/nfts/hold',
    name: 'NftsHold',
    exact: true,
    component: NftsHold,
    meta: 'h_item4'
  },
  {
    path: '/nfts/add',
    name: 'NftsAdd',
    exact: true,
    component: NftsAdd,
    meta: 'h_item4'
  },
  {
    path: '/nfts/add/advance',
    name: 'NftsAddAdvance',
    exact: true,
    component: NftsAddAdvance,
    meta: 'h_item4'
  },
  {
    path: '/blindbox',
    name: 'Blindbox',
    exact: true,
    component: Blindbox,
    meta: 'h_item5'
  },
  {
    path: '/blindbox/hold',
    name: 'BlindboxHold',
    exact: true,
    component: BlindboxHold,
    meta: 'h_item5'
  },
  {
    path: '/blindbox/add',
    name: 'BlindboxAdd',
    exact: true,
    component: BlindboxAdd,
    meta: 'h_item5'
  },
  {
    path: '/blindbox/add/advance',
    name: 'BlindboxAddAdvance',
    exact: true,
    component: BlindboxAddAdvance,
    meta: 'h_item5'
  },
  {
    path: '/solution',
    name: 'Solution',
    exact: true,
    component: Solution,
    meta: 'h_item10'
  },
  {
    path: '/solution/detail/dex',
    name: 'SolutionDetail',
    exact: true,
    component: SolutionDetail,
    meta: 'h_item10'
  },
  {
    path: '/solution/detail/nft',
    name: 'SolutionDetail',
    exact: true,
    component: SolutionDetail,
    meta: 'h_item10'
  },
  {
    path: '/solution/detail/farm',
    name: 'SolutionDetail',
    exact: true,
    component: SolutionDetail,
    meta: 'h_item10'
  },
  {
    path: '/solution/open/dex',
    name: 'SolutionOpen',
    exact: true,
    component: SolutionOpen,
    meta: 'h_item10'
  },
  {
    path: '/solution/open/nft',
    name: 'SolutionOpen',
    exact: true,
    component: SolutionOpen,
    meta: 'h_item10'
  },
  {
    path: '/solution/open/farm',
    name: 'SolutionOpen',
    exact: true,
    component: SolutionOpen,
    meta: 'h_item10'
  },
  {
    path: '/solution/admin/dex',
    name: 'SolutionAdminDex',
    exact: true,
    component: SolutionAdminDex,
    meta: 'h_item98'
  },
  {
    path: '/solution/admin/dex/add',
    name: 'SolutionAdminDexAdd',
    exact: true,
    component: SolutionAdminDexAdd,
    meta: 'h_item98'
  },
  {
    path: '/solution/admin/nft',
    name: 'SolutionAdminDex',
    exact: true,
    component: SolutionAdminDex,
    meta: 'h_item99'
  },
  {
    path: '/solution/admin/farm',
    name: 'SolutionAdminDex',
    exact: true,
    component: SolutionAdminDex,
    meta: 'h_item100'
  },
]


