<template>
    <div class="searchTop">
        <!-- 返回图标 -->
        <svg class="icon" aria-hidden="true" @click="$router.back()">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <!-- 搜索框 绑定键盘事件来接收输入值 -->
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">搜索历史</span>
        <!-- 搜索历史列表的显示 -->
        <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistoryKey(item)">
            {{item}}
        </span>
        <!-- 删除按键 -->
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <!-- 歌单搜索列表 -->
    <div class="itemList">
        <!-- 全部的歌曲进行列表渲染 -->
        <div class="item" v-for="(item, i) in searchList" :key="i">
            <div class="itemLeft" @click="updateIndex(item)">
                <!-- 歌曲的索引序列 -->
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <!-- 歌曲名称 -->
                    <p>{{ item.name }}</p>
                    <!-- 作者有多个,需要对作者数据进行循环遍历渲染 -->
                    <span v-for="(item1, index) in item.artists" :key="index">
                        {{ changeArName(item1.name, index, item.artists.length) }}
                    </span>
                </div>
            </div>
            <div class="itemRight">
                <!-- mv图标是否显示需要对其中的数据进行判断,非0时表示有mv -->
                <svg class="icon bofang" aria-hidden="true" v-show="item.mvid != 0">
                    <use xlink:href="#icon-bofangMV"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getSearchMusic } from "../request/api/home"

export default {
    data() {
        return {
            // 历史记录
            keyWordList: [],
            // 输入字符串的接收变量
            searchKey: "",
            searchList: [],
        }
    },
    mounted() {
        // 渲染后将储存在session的数据取出并赋值
        // 此处进行了一个三元判断,如果session中存储了值则正常赋值,否则就给予一个默认空值
        this.keyWordList = JSON.parse(sessionStorage.getItem('keyWordList'))
            ? JSON.parse(sessionStorage.getItem("keyWordList"))
            : [];
    },
    methods: {
        async enterKey() {
            // 输入值不为空
            if (this.searchKey !== "" && this.searchKey !== " ") {
                this.searchKey = this.searchKey.trim();
                // unshift将元素添加到数组的首位
                this.keyWordList.unshift(this.searchKey);
                // 去重 使用ES6的新数据类型Set对重复的数据进行消除,在使用 ... 将数据拆分重新组合为数组
                this.keyWordList = [...new Set(this.keyWordList)];
                // 固定长度 永远只保留最新的5项(unshift添加元素的缘故),将最后一项pop删除
                if (this.keyWordList.length > 5) {
                    this.keyWordList.pop();
                }
                // 将数据存储到session,使得数据可以持久化   
                sessionStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
                // 根据输入的关键词搜索
                let res = await getSearchMusic(this.searchKey);
                // console.log(res);
                // 赋值
                this.searchList = res.data.result.songs;
                console.log(this.searchList);
                // 输入完成后输入框清空
                this.searchKey = "";
            }
        },
        // 删除历史
        delHistory() {
            // session存储清除
            sessionStorage.removeItem("keyWordList");
            // 数组置空
            this.keyWordList = [];
        },
        // 点击历史记录搜索，将item传入
        async searchHistoryKey(item) {
            let res = await getSearchMusic(item);
            this.searchList = res.data.result.songs;
            console.log(this.searchList);
        },
        // 修整作者
        changeArName(name,index,length){
            if (index+1 < length) {
                return name + ',';
            }else {
                return name;
            }
        },
        // 点击搜索列表播放歌曲
        updateIndex(item){
            // 由于接口传出的参数不同，所以我们要修改
            item.al = item.album;
            item.album.name = item.name;
            item.al.picUrl = item.artists.img1v1Url;
            // 
            this.$store.commit("pushPlayList",item);
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length - 1)
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: .2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 85%;
        padding: .1rem;
    }
}

// 搜索历史样式
.searchHistory {
    width: 100%;
    padding: .2rem;
    position: relative;

    // 搜索历史
    .searchSpan {
        font-weight: 700;
    }

    .spanKey {
        background-color: rgb(185, 169, 169);
        padding: .1rem .2rem;
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }

    .icon {
        width: .3rem;
        height: .3rem;
        position: absolute;
        right: .2rem;
    }
}

.itemList {
    width: 100%;

    .item {
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .itemLeft {
            width: 85%;
            height: 100%;
            display: flex;
            align-items: center;

            .leftSpan {
                display: inline-block;
                width: 0.2rem;
                text-align: center;
            }

            div {
                p {
                    width: 4.54rem;
                    height: 0.4rem;
                    // 隐藏超出的内容
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                }

                span {
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }

                margin-left: 0.3rem;
            }
        }

        .itemRight {
            width: 20%;
            height: 100%;
            display: flex;
            // justify-content: space-between;
            align-items: center;
            position: relative;

            .bofang {
                position: absolute;
                left: 0;
            }

            .liebiao {
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>