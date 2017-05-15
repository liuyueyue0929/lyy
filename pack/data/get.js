const Mock = require('mockjs');
module.exports.data=function(){
	return [
		{
			"route":"/index",
			"handle":function(req,res,next){
				res.writeHead({
					'Content-Type':"application/json;charset=utf-8",
					"Access-Control-Allow-Origin":"*"
				})
				var data = {
					"name":"zhangsan"
				}
				res.end(JSON.stringify(data))
			}
		},
		{
			"route":"/mock",
			"handle":function(req,res,next){
				res.writeHead({
					'Content-Type':"application/json;charset=utf-8",
					"Access-Control-Allow-Origin":"*"
				})
				var Random = Mock.Random;
				Random.integer()
				Random.string('lower',4)
				Random.date('yyyy-MM-dd')
				Random.cname()
				var data = Mock.mock({
					"menuList|10":[
						{"name|1-6":"@cname","time":"@date"}
					]
				})
				res.end(JSON.stringify(data))
			}
		}
	]
}
