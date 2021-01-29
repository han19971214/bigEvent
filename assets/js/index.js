function getUserInfo() {
    // //获取本地存储的token令牌
    // var token = localStorage.getItem('token') || ''
    //     //发送ajax请求
    // axios({
    //     url: '/my/userinfo',
    //     //·headers·是即将被发送的自定义请求头
    //     headers: { 'Authorization': token }
    // }).then(res => {
    //     console.log(res);
    // })

    //发送ajax请求
    axios.get('/my/userinfo').then(res => {
        console.log(res);
        //校验请求失败
        if (res.status !== 0) {
            return layer.msg('获取用户信息失败！')
        }

        const { data } = res
        //渲染用户信息
        //获取用户名
        const name = data.nickname || data.username
            //渲染昵称
        $('.nickname').text(`欢迎 ${name}`).show()
            //渲染头像
            //判断 如果有头像 数据
        if (data.user_pic) {
            $('.avatar').prop('src', data.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.text-avatar').text(name[0].toUpperCase()).show() //第一个字母转大写
            $('.avatar').hide()
        }

    })




}


$(function() {
    //调用获取个人信息函数
    getUserInfo()
    const { layer } = layui
    //获取用户个人信息

    $('#logout').click(function() {
        console.log(1);
        localStorage.removeItem('token')

        location.href = './login.html'
    })










})