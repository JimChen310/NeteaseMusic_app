<template>
    <div class="login">
        <div class="loginTop">欢迎登录</div>
        <div class="loginContent">
            <input type="text" name="phone" class="phone" v-model="phone"  placeholder="请输入手机号码" />
            <input type="password" name="password" v-model="password" class="password"  placeholder="请输入密码" />
            <button class="btn" @click="Login">登录</button>
        </div>
    </div>
</template>

<script>
import {getLoginUser} from '../request/api/home'

export default {
    data(){
        return {
            phone:'',
            password:'',
        }
    },
    methods:{
        async Login(){
            let res = await this.$store.dispatch("getLogin",{phone:this.phone,password:this.password})
            console.log(res);
            if(res.data.code === 200){   // code为200时证明登陆成功，跳转到个人页面
                // 能否进入用户页面的布尔值更新
                this.$store.commit('updateIsLogin',true);
                // 保存token
                this.$store.commit('updateToken',res.data.token);
                // 获取user信息
                let result = await getLoginUser(res.data.account.id);
                console.log(result);
                // 存储user信息
                this.$store.commit('updateUser',result);
                // 页面跳转
                this.$router.push('/userinfo');
            }else{
                alert("账号或密码错误");
                this.password = "";
            }
        }
    }
}
</script>
  
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    padding: 0.2rem;
    position: absolute;
    background: pink;
    top:0;
    left: 0;
    overflow-y: auto;
    .loginTop {
        margin-top: 1rem;
        font-size: 1rem;
        color: #fff;
        text-align: center;
    }
    .loginContent {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 2rem;
        .phone,
        .password {
            padding: .2rem;
            width: 5rem;
            height: 1rem;
            border: 0.02rem solid #999;
        }
        .btn{
            width: 2rem;
            height: .6rem;
        }
    }
}
</style>
    