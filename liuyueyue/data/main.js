exports.data=function(){
    return[
        {
            router:"/index",
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
                    name:"liuyueyue",
                    age:21,
                    address:"BJ"
                }
                res.write(JSON.stringify(data));
                res.end();//�п�ͷ�н�β ��Ȼ������Ȼ�޷���
            }
        }
    ]
}
