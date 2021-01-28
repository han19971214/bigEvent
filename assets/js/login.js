$(function() {
    // 解构赋值
    const { form, layer } = layui

    //点击链接进行表单切换
    $('.link a ').click(function() {
        $('.layui-form').toggle()
    })

    // 表单校验
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码只能在6到12位之间'
        ],

        samePass: function(value) {

            if (value !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 实现注册功能
    $('.reg-form').submit(function(e) {
            //阻止默认提交
            e.preventDefault()
                //发送ajax
            axios.post('api/reguser', $(this).serialize())
                .then(res => {
                    console.log(res);
                    //校验失败
                    if (res.status !== 0) {
                        return layer.msg('注册失败')
                    }
                    //跳转登录
                    layer.msg('注册成功！')
                    $('.login-form a').click()

                })
        })
        //实现登录功能
    $('.login-form').submit(function(e) {
        e.preventDefault()

        //发送ajax
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                // 校验请求失败
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                //登录成功后 首先把token（个人身份凭证 令牌）保存本地存储
                localStorage.setItem('token', res.token)

                //提示登录成功
                layer.msg('登录成功！')

                //跳转首页
                location.href = './index.html'
            })

    })

})