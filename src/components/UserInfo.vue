<template>
  <div class="user-info">
    <div class="flex">
      <div class="img" :style="'background-image: url(' + user.photoURL + ');'">
        <div
          class="badge contribution"
          :class="{
            padawan: problemsCreated.length < 3,
            intermediate:
              problemsCreated.length >= 3 && problemsCreated.length < 10,
            master: problemsCreated.length >= 10 && problemsCreated.length < 20,
            lord: problemsCreated.length >= 20
          }"
        >
          {{ problemsCreated.length }}
        </div>
        <a
          v-if="user.twitter"
          :href="'https://twitter.com/' + user.twitter"
          target="_blank"
        >
          <div class="badge twicon">
            <fa :icon="['fab', 'twitter']" />
          </div>
        </a>
      </div>
      <router-link :to="'/user/'+user.id">
        <div class="txts">
          <p v-if="user.nickname" class="name">{{ user.nickname }}</p>
          <p v-else class="name">{{ user.name }}</p>
          <p class="info">
            <span v-if="user.school">{{ user.school }}</span>
            <span v-if="user.grade"> ({{ user.grade }})</span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  props: ["uid"],
  data() {
    return {
      user: {},
      problemsCreated: []
    };
  },
  firestore() {
    return {
      user: db.collection("users").doc(this.$props.uid),
      problemsCreated: db
        .collection("problems")
        .where("user", "==", this.$props.uid)
    };
  }
};
</script>

<style lang="stylus" scoped>
.user-info
  margin-bottom 10px
  .img
    width 2rem
    height 2rem
    font-size 1rem
    border-radius 50%
    background-size cover
    position relative
    .badge
      position absolute
      right -3px
      text-align center
      box-shadow 0 0 5px rgba(0,0,0,.5)
    .twicon
      background #00aced
      color white
      bottom -3px
      font-size .5rem
      width 15px
      height 15px
      line-height 16px
      border-radius 50%
      cursor pointer
    .contribution
      top -3px
      color white
      font-size .6rem
      padding 0 3px
      border-radius 3px
    .padawan
      background white
      color #555
    .intermediate
      background green
    .master
      background blue
    .lord
      background black
      color red
  .txts
    margin-left 5px
    .name
      margin 0
      font-size 1rem
    .info
      margin 0
      font-size .6rem
</style>
