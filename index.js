/** actions perference
  'create'    //c 
  'view'      //v 
  'update'    //u
  'delete'    //d
*/

/** permission perference
  'employee'   //0
  'role'       //1
  'news'       //2
  'generate'   //3
  'product'    //4
  'order'      //5
  'customer'   //6
  'voucher'    //7
  'tag'        //8
  'category'   //9
  'email'      //10
  'media'      //11
  'comment'    //12
  'accesscode' //13
  'storage'    //14
*/

const fs = require('fs');
let base = {
  "$schema": "https://www.krakend.io/schema/v3.json",
  "version": 3,
  "name": "RestApiGateway",
  "timeout": "300000ms",
  "cache_ttl": "4000s",
  "port": 8080,
  "output_encoding": "json",
  "extra_config": {
    "router": {
      "return_error_msg": true
    },
    "qos/ratelimit/service": {
      "max_rate": 15,
      "client_max_rate": 5,
      "strategy": "ip"
    }
  },
  "endpoints": []
}

const files = fs.readdirSync('define');
const endpoints = files.reduce((acum, current) => {
  const temp = fs.readFileSync(`define/${current}`);
  const newData = JSON.parse(temp);

  return [...acum, ...newData];
}, []);

base.endpoints = endpoints

fs.writeFileSync(`krakend.json`, JSON.stringify(base, null, 2), 'utf8', (err) => {if(err) console.log(err)});
