<template>
  <!-- 输入框实时检测（用户名是否可用）组件 -->
  <div class="input-net-check">
    <input
      type="text"
      v-model="inputValue"
      @keydown.delete="deletDown"
      @keyup.delete="deletUp"
      @input="handleInput"
    />
    <span>{{message}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      message: "",
      isDeletUp: true
    };
  },

  methods: {
    handleInput() {
      window.clearTimeout(window.timeOut);
      window.timeOut = window.setTimeout(() => {
        if (this.inputValue != "" && this.isDeletUp) {
          this.message = "正在校验姓名....";
          window.timeOut1 = window.setTimeout(() => {
            this.checkName(this.inputValue);
            window.clearTimeout(window.timeOut1);
          }, 1000);
        } else {
          this.message = "";
        }
      }, 500);
    },

    deletUp() {
      this.isDeletUp = true;
    },

    deletDown() {
      this.isDeletUp = false;
    },

    checkName(name) {
      if (name == "admin") {
        this.message = "该用户名已经被注册！";
      } else {
        this.message = "该用户名可用";
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>