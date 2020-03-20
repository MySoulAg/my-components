<template>
  <!-- tab动画切换 组件 -->
  <div class="tabs">
    <ul>
      <li
        @click="changeTab(index)"
        :class="activeItem==index?'active':''"
        v-for="(item,index) in tabList"
        :key="index"
      >{{item.title}}</li>
    </ul>
    <div class="container">
      <div
        class="container-item"
        :class="[index==activeItem?'block':'']"
        v-for="(item,index) in tabList"
        :key="index"
      >
        <transition :name="transitionDirection">
          <div v-show="index==activeItem" class="box">
            <div v-if="item.containt">
              <div v-if="item.containt.length>0">
                <div v-for="(item1,index1) in item.containt" :key="index1">
                  <img style="width:100px" :src="item1.knwldgTitlePic" alt />
                </div>
              </div>
              <div v-else>暂无数据</div>
            </div>
            <div v-else>加载中</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeItem: 0, //默认显示第一个tab和内容
      transitionDirection: "right", //默认动画切换的方向
      tabList: [
        { title: "全部", dmsnYdeId: 2, queryType: "20" },
        { title: "养老动态", dmsnYdeId: 1, queryType: "09" },
        { title: "养生健康", dmsnYdeId: 5, queryType: "09" },
        { title: "理财资讯", dmsnYdeId: 6, queryType: "09" },
        { title: "智慧养老", dmsnYdeId: 7, queryType: "09" },
        { title: "政策法规", dmsnYdeId: 3, queryType: "09" }
      ]
    };
  },

  created() {
    this.getList();
  },

  methods: {
    changeTab(index) {
      if (index == this.activeItem) {
        return;
      }
      if (index > this.activeItem) {
        this.transitionDirection = "right";
      } else {
        this.transitionDirection = "left";
      }
      this.activeItem = index;
      if (this.tabList[index].containt) return;
      this.getList();
    },

    getList() {
      //http://rap2.taobao.org:38080/app/mock/178194/newsList3
      let temActiveItem = this.activeItem;
      this.$axios
        .post("/app/web/public/remote", {
          application: "occ-klm-service",
          service: "/knwldgSrv/queryKnwldgInfList",
          object: {
            msgHead: {
              serviceName: "/occ-klm-service/knwldgSrv/queryKnwldgInfList"
            },
            msgCommon: {},
            msgEntity: {
              queryType: this.tabList[temActiveItem].queryType,
              dmsnYdeId: this.tabList[temActiveItem].dmsnYdeId,
              pageJump: 1,
              recInPage: 10,
              knwldgLglpsnId: "YLY99",
              ctrl: { async: true, maskAll: true },
              checkNull: true
            }
          }
        })
        .then(res => {
          console.log(res.data.msgEntity.data);
          this.$set(
            this.tabList[temActiveItem],
            "containt",
            res.data.msgEntity.data
          );
        });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.tabs {
  padding: 20px;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      cursor: pointer;
    }

    li.active {
      color: orange;
    }
  }

  .container {
    position: relative;
    .container-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      overflow: hidden;
      .box {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #eee;
      }
    }
    .container-item.block {
      position: static;
    }
  }
}

// 淡入/淡出 --start
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 1s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
// 淡入/淡出 --end

//滑动 进入/进出 --start
.left-enter-active {
  transition: all 0.3s ease;
}
.left-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.left-enter,
.left-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.left-enter {
  transform: translateX(-100%);
  opacity: 0;
}
//滑动 进入/进出 --end

//滑动 进入/进出 --start
.right-enter-active {
  transition: all 0.3s ease;
}
.right-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.right-enter,
.right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.right-enter {
  transform: translateX(100px);
  opacity: 0;
}
//滑动 进入/进出 --end
</style>