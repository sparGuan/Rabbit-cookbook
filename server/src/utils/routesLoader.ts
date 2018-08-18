import * as glob from 'glob'
export default (dirname:string) => {
  return new Promise((resolve, reject) => {
    const routes:Array<any> = [];
    console.log('**/index.ts')
    glob(`${dirname}/**/index.ts`, {
      ignore: 'index.ts',
    }, (err, files:Array<any>) => {
      if (err) {
        reject(err)
        return
      }
      console.log(files)
      files.forEach((file) => {        
        let route = require(file) // eslint-disable-line global-require, import/no-dynamic-require
        routes.push(route)
      })
      resolve(routes)
    })
  })
}