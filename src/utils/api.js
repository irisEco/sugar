const Fly = require("flyio/dist/npm/wx");
const fly = new Fly();


if (process.env.NODE_ENV === 'production') {

  fly.config.baseURL = "http://yapi.demo.qunar.com/mock/51996/api/";
  
} else {
  fly.config.baseURL = "http://yapi.demo.qunar.com/mock/51996/api/";
}


export default fly;