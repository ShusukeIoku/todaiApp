<template>
  <div class="item">
    <div class="flex">
      <div class="subjects">
        <span>{{ problem.subject }}</span>
        <span>＞</span>
        <span>{{ problem.genre }}</span>
      </div>
      <p>{{ problem.title }}</p>
    </div>
    <UserInfo :uid="uid" />
    <Buttons :problem="problem" :noStock="noStock" />
    <p class="date"></p>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons";
import UserInfo from "@/components/UserInfo";
export default {
  props: ["problem", "uid", "noStock"],
  components: {
    UserInfo,
    Buttons
  }
};
</script>

<style lang="stylus">
.item
  padding 10px 10px 0
  border-bottom 1px solid #eee
  position relative
  .subjects
    margin 11px 5px 0 0
    padding 0 8px
    border 1px solid #555
    border-radius 20px
    font-size .7rem
    height 1.5rem
    line-height 1.5rem
    span
      padding 0 1px
  h2
    font-size 1rem
    margin 0
  &:hover
    background rgba(0,0,0,.03)
  .date
    position absolute
    bottom 5px
    right 5px
</style>
