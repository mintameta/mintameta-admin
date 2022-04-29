import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'


const useEncryptAddress = (address: string) => {
  const { account } = useWallet()
  const [newAddress, setNewAddress] = useState('')
  const encryptAddress = useCallback(async () => {
    setNewAddress(address.replace(/(\w{4})\w*(\w{4})/, '$1******$2'))
  }, [address])

  useEffect(() => {
    if (account && address) {
      encryptAddress()
    }
  }, [account, address])

  return newAddress
}

export default useEncryptAddress
