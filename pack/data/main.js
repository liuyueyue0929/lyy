module.exports.data=function(){
    return[
        {
            router:"/index",
            handle:function(req,res,next,url){
                //req����ͷ
                //res��Ӧ����
                //console.log(url.parse(req.url).query)
                //res����ͷ��ģ��ĺ�̨���ݷ��ظ����������������ͷ��û��ͷ�Ļ����ݳ�����
                res.writeHead(200,{
                    "Content-Type":"application/json;charset=U2TF-8",
                    "Access-Control-Allow-Origin":"*"//�������
                })
                var data={
                    name:"liuyueyue",
                    age:21,
                    address:"BJ"
                }
                res.end(JSON.stringify(data));//�п�ͷ�н�β ��Ȼ������Ȼ�޷���
            }
        },
        {
            router:"/data",
            handle:function(req,res,next,url){
                //req����ͷ
                //res��Ӧ����
                //console.log(url.parse(req.url).query)
                //res����ͷ��ģ��ĺ�̨���ݷ��ظ����������������ͷ��û��ͷ�Ļ����ݳ�����
                res.writeHead(200,{
                    "Content-Type":"application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin":"*"//�������
                })
                var data={
                    name:"xiaoheigege",
                    age:22,
                    address:"BJ"
                }
                res.end(JSON.stringify(data));//�п�ͷ�н�β ��Ȼ������Ȼ�޷���
            }
        }
    ]
}
