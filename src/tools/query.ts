import {gql} from 'apollo-boost'

export const iboxesQuery = ({where="",owner_=""})=>{
    // //console.log('where1',where)
    const sql = `
    query{
        iboxes(first: 1000,orderBy: addTime_,orderDirection: desc,where: {symbol__contains: "${where}", owner_: "${owner_}"}){
            id
            contractAddress_
            name_
            symbol_
            tokenImg_
            introduce_
            serialNumber_
            nftType_
            issueNumber_
            mintedNum_
            NFTOpened_
            owner_
            addTime_
        }
    }
`
    // //console.log('sql',sql)
    return (
        gql`${sql}`
    )
};
export const inftsQuery = ({where="",owner_="",nftType=-1})=>{
    // //console.log('where1',nftType)
    let where1 = ``;
    if (nftType>=0) {
        where1 += `, nftType_: ${nftType} `
    }
    const sql = `
    query{
        infts(first: 1000,orderBy: addTime_,orderDirection: desc,where: {symbol__contains: "${where}", owner_: "${owner_}" ${where1} }){
            id
            contractAddress_
            name_
            symbol_
            tokenImg_
            introduce_
            serialNumber_
            maxMintNum_
            mintedNum_
            inBoxNum_
            nftType_
            owner_
            addTime_
        }
    }
`
    // //console.log('sql',sql)
    return (
        gql`${sql}`
    )
};
export const inftsinglesQuery = ({where="",owner_="",isBox_=false})=>{
    // //console.log('where1',where)
    const sql = `
    query{
        inftsingles(first: 1000,orderBy: addTime_,orderDirection: desc,where: {symbol__contains: "${where}",isBox_: ${isBox_}, owner_: "${owner_}"}){
          id
          contractAddress_
          name_
          symbol_
          tokenImg_
          owner_
          NFTId_
          nftType_
          isBox_
          addTime_
        }
    }
`
    // //console.log('sql',sql)
    return (
        gql`${sql}`
    )
};
export const dataRecordsQuery = ({owner_=""})=>{
    // //console.log('where1',where)
    const sql = `
    query{
        dataRecords(first: 1,where: {id: "${owner_}"}){
            id
            nftLength
            boxLength
            nftSingleLength
        }
    }
`
    // //console.log('sql',sql)
    return (
        gql`${sql}`
    )
};
