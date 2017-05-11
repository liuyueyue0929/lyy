module.exports.data=function(){
    return[
        {
            router:"/index",
            handle:function(req,res,next,url){
                //req请求头
                //res相应数据
                //console.log(url.parse(req.url).query)
                //res请求头是模拟的后台数据返回告诉浏览器返回数据头，没有头的话数据出不来
                res.writeHead(200,{
                    "Content-Type":"application/json;charset=U2TF-8",
                    "Access-Control-Allow-Origin":"*"//允许跨域
                })
                var data={
                    name:"liuyueyue",
                    age:21,
                    address:"BJ"
                }
                res.end(JSON.stringify(data));//有开头有结尾 不然数据依然无返回
            }
        },
        {
            router:"/data",
            handle:function(req,res,next,url){
                //req请求头
                //res相应数据
                //console.log(url.parse(req.url).query)
                //res请求头是模拟的后台数据返回告诉浏览器返回数据头，没有头的话数据出不来
                res.writeHead(200,{
                    "Content-Type":"application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin":"*"//允许跨域
                })
                var data={
                    name:"xiaoheigege",
                    age:22,
                    address:"BJ"
                }
                res.end(JSON.stringify(data));//有开头有结尾 不然数据依然无返回
            }
        }
    ]
}
