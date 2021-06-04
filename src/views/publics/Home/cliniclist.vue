<template>
  <div>
    <Calendar @dateSelected="vulues" :can-select='true' :selectMode="'click'"  :width="'80%'" :tbodyHeight="'100px'"></Calendar>
  </div>
</template>

<script>
import Calendar from "./components/Calendar";
export default {
  components: {
    Calendar,
  },
  methods: {
    vulues(e){
     console.log(e)
    }
  },
};
</script>

<style lang="less" scoped></style>
