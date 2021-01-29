$(function() {

    const { layer, form } = layui


    // 页面一加载 就获取用户信息
    function initUserInfo() {
        axios.get('/my/userinfo').then(res => {

            if (res.status !== 0) {
                return layer.msg('获取失败！')
            }

            //渲染信息
            console.log(res.data);
            const { data } = res
            //给表单赋值

            form.val('edit-userinfo', data)
        })
    }

    initUserInfo()
        //表单验证
    form.verify({
        nick: [
            /^\w{1,6}$/,
        ]
    })

    //提交修改
    $('.base-info-form').submit(function(e) {

        e.preventDefault()
            //发送ajax请求
        axios.post('/my/userinfo', $(this).serialize())
            .then(res => {
                console.log(res);

                //校验失败
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！')

                }
                layer.msg('修改信息成功！')
                    // 更新用户信息
                window.parent.getUserInfo()
            })

    })

    //重置 功能
    $('#reset-btn').click(function(e) {
        e.preventDefault()
        initUserInfo()
    })



})