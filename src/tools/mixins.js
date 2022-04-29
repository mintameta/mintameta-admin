import localStore from "./localstorage";

export const mixin1 = {
  computed: {
    monitor () {
      return this.$store.state.HeaderItems.accounts[0]
    },
    isUpdate () {
      return this.$store.state.isUpdate.popupStatus
    }
  },
  watch: {
    monitor (newVal, oldVal) {
      // //console.log(oldVal, newVal)
      this.defaultInit()
    },
    isUpdate (newVal, oldVal) {
      // //console.log(oldVal, newVal)
      this.defaultInit()
    }
  },
  methods: {
    onAccountsChanged () {
      window.ethereum.on('accountsChanged', (accounts)=>{
        // //console.log('accountsChanged', accounts)
        this.$store.commit('setKey', {key: 'invitePopup', value: {status: 0}})
        this.$store.commit('setKey', {
          key: 'HeaderItems',
          value: {accounts: accounts}
        })
        localStore.save('accounts',accounts)
      })
      window.ethereum.on('chainChanged', (networkId)=>{
        // //console.log('networkChanged', networkId)
        this.$store.commit('setKey', {
          key: 'HeaderItems',
          value: {
            ssp_price: 0,
            ssp_amount: 0,
            eng_amount: 0,
            bnb_amount: 0,
            usdt_amount: 0,
            coreLp_amount: 0,
            shipWallet_amount: 0,
          }
        })
        this.$store.commit('setKey', {
          key: 'isUpdate',
          value: {popupStatus: !this.$store.state.isUpdate.popupStatus}
        })
      })
    },
    goTo(link = '/', type = 0, params = {}) {
      // //console.log('link',link,link.indexOf('/mine'));
      // link.indexOf('/mine') != -1 ||
      // link.indexOf('/game') != -1
      if (type==1 || link.indexOf('/game') != -1) {
        this.$toast.fail(this.lang('h_item14'))
        return;
      }
      // //console.log('this.$route',link,this.$route)
      if (link == this.$route.path) {
        return
      }
      this.$router.push({path: link, params: params})
    },
    openLoginShow () {
      this.$store.commit('setKey', {
        key: 'HeaderItems',
        value: {loginShow: true}
      })
    },
    setStore (key,value={}) {
      this.$store.commit('setKey', {
        key: key,
        value: value
      })
    },
  }
}
