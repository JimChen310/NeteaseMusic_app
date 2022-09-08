function remSize(){
    // 获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    // 一般设计手机端比例时 都采用 iphone的750
    if (deviceWidth >= 750){
        // 大于750也按照750进行处理
        deviceWidth = 750;
    }
    if (deviceWidth <= 320){
        // 最小不能小于320，一律按照320进行处理
        deviceWidth = 320;
    }
    // rem布局的核心公式，计算出适配当前设备宽度的字体大小 也即 1rem的大小
    document.documentElement.style.fontSize = (deviceWidth / 7.5)+'px';
    // 设置 body的字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
// 首先运行一次
remSize()
// 当窗口发生变化时再次调用
window.onresize = function(){   // 窗口尺寸变化时会触发 onresize中定义的函数
    remSize()
}