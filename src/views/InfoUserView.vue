<template>
    <div class="infoUserTop">
        <img :src="user.avatarUrl" alt="" class="profileimg">
        <div class="name">{{user.nickname}}</div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            user: JSON.parse(localStorage.getItem('user')).data.profile
        }
    }
}
</script>

<style lang="less" scoped>
.infoUserTop{
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .profileimg{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    .name{
        font-weight: 700;
        font-size: .4rem;
    }
}
</style>