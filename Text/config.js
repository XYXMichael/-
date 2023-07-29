let env = "develop"
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if(envVersion === "release" && env!=="production"){
  env = "production"
}
export default{
  env,
  baseUrl:{
    develop:'http://localhost:3000',
    production:'http://api.xxx.com',
  },
}