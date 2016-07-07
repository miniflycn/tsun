import { Model as UserInfo } from './model/UserInfo'


const userInfo = new UserInfo()
userInfo.get({ uin: 0, ignore: ['nickname'] }).then((data) => {
  
})
userInfo.get({ uin: 123 }).then((data) => {
  
})

