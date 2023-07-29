import localConfigs from "./config"
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    
  },
  getConfig(key=""){
      if(key === ""){
        return localConfigs
      }
      if(!localConfigs[key]){
        console.warn(`${key} config is no exist`)
        return undefined
      }
      if(typeof localConfigs[key] === "object" && typeof localConfigs[key] !== null){
        const env = this.getConfig("env")
        return localConfigs[key][env]
      }
      return localConfigs[key]
  },
  globalData: {
    userInfo: null
  }
})
