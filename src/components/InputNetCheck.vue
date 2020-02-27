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
    <span :class="changColor">{{message}}</span>   
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      message: "",
      isDeletUp: true,
      colorType: "0"
    };
  },

  computed: {
    changColor() {
      if (this.colorType == "0") {
        return;
      } else if (this.colorType == "1") {
        return "success";
      } else {
        return "waring";
      }
    }
  },

  methods: {
    handleInput() {
      window.clearTimeout(window.timeOut);
      window.timeOut = window.setTimeout(() => {
        if (this.inputValue != "" && this.isDeletUp) {
          this.message = "正在校验姓名....";
          this.colorType = "0";
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
        this.colorType = "2";
      } else {
        this.message = "该用户名可用";
        this.colorType = "1";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.input-net-check {
  input {
    border-radius: 6px;
    border-width: 1px;
    border: 1px solid rgb(192, 192, 192);
    padding: 3px 5px;
  }

  input:focus {
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
    border-color: #66afe9;
    outline: 0;
  }

  span {
    font-size: 12px;
    margin-left: 10px;
  }

  span.waring {
    color: rgb(218, 8, 8);
  }

  span.success {
    color: rgb(59, 212, 59);
  }
}
</style>