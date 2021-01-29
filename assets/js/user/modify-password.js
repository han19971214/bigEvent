$(function() {

    const { form, layer } = layui


    form.verify({
        pass: [
            /^\w{6,12}$/,

        ],

        confirmPass: function(val) {
            if (val !== $('#pass').val()) {
                return '密码输入不一致'
            }
        }




    })

    //表单提交
    $('.layui-form').submit(function(e) {
        e.preventDefault()


        //发起ajax请求
        axios.post('/my/updatepwd', $(this).serialize())
            .then(res => {
                console.log(res);
                //校验请求失败
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！')
                }
                //提示用户
                layer.msg('修改密码成功')
            })
    })































})