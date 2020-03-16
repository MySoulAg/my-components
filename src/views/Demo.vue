<template>
  <div class="demo">
    <input-net-check></input-net-check>
    <tabs></tabs>
    <swipe></swipe>
  </div>
</template>
<script>
import InputNetCheck from "@/components/InputNetCheck";
import Tabs from "@/components/Tabs";
import Swipe from "@/components/Swipe";
export default {
  components: {
    InputNetCheck,
    Tabs,
    Swipe
  },
  data() {
    return {
     
    };
  },

  

  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 20px;
}
</style>