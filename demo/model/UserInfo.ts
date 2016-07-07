declare var DB: any;
import { Model as Base, ModelConfig } from './Base'

export class Model extends Base {
  name: string

  constructor(param = {}) {
    const options = <ModelConfig>Object.assign({ name: 'UserInfo' }, param)
    super(options)
  }

  get(param): Promise<UserInfo> {
    return new Promise((resolve) => {
      DB.send(this.name, param, (data) => {
        resolve(<UserInfo>data)
      })
    })
  }
}

export interface UserInfo {
    /**
     * 用户名
     */
    nickname: string;
}
