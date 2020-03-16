<template>
  <div class="swipe-srack">
    <div class="swipe-box">
      <div class="swipe-item" v-for="(item,index) in list " :key="index">
        <img :src="item" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        'http://p1.music.126.net/m0Vp1C6Vt27nbQqA0Xo4dA==/109951164792238128.jpg',
        'http://p1.music.126.net/T7akpI94xUO7aIGUfzuCYw==/109951164793666659.jpg',
        'http://p1.music.126.net/K7_0cZh7JFr2OaNbN7vMgQ==/109951164794113744.jpg',
        'http://p1.music.126.net/wwLrMwqEcmA_KMzWl5hvgg==/109951164793474715.jpg',
        'http://p1.music.126.net/Nt5cRxv1AmJm_jRhpZkc5A==/109951164793647481.jpg'
      ]
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.setBoxWidth()

      this.setItemWidth()

      let boxStyle = document.getElementsByClassName('swipe-box')[0].style
      let step = this.getSrackWidth()
      let stepNum = 0

      let time = setInterval(() => {
        stepNum++
        boxStyle.transitionDuration = '500ms'
        if (stepNum == this.getItemNum()) {
          document.getElementsByClassName(
            'swipe-item'
          )[0].style.transform = `translateX(${this.getBoxWidth()}px)`
          boxStyle.transform = `translateX(-${step * stepNum}px)`
          let time1 = setTimeout(() => {
            boxStyle.transitionDuration = '0s'
            boxStyle.transform = `translateX(0px)`
            document.getElementsByClassName(
              'swipe-item'
            )[0].style.transform = `translateX(0px)`
            clearTimeout(time1)
          }, 1000)
          clearInterval(time)
          this.init()
        }
        boxStyle.transform = `translateX(-${step * stepNum}px)`
      }, 3000)
    },

    getSrackWidth() {
      return document
        .getElementsByClassName('swipe-srack')[0]
        .getBoundingClientRect().width
    },

    getBoxWidth() {
      return this.getSrackWidth() * this.getItemNum()
    },

    getItemNum() {
      return document.getElementsByClassName('swipe-item').length
    },

    setBoxWidth() {
      document.getElementsByClassName('swipe-box')[0].style.width =
        this.getBoxWidth() + 'px'
    },

    setItemWidth() {
      let itemArr = document.getElementsByClassName('swipe-item')
      for (let i = 0, len = this.getItemNum(); i < len; i++) {
        itemArr[i].style.width = this.getSrackWidth() + 'px'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.swipe-srack {
  margin-top: 20px;
  overflow: hidden;
  width: 100%;

  .swipe-box {
    display: flex;
    // transition-duration: 500ms;
    //   width: 1175px;

    .swipe-item {
      flex-shrink: 0;
      //   width: 345px;

      img {
        width: 100%;
      }
    }
  }
}
</style>