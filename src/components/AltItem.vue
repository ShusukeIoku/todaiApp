<template>
  <div class="item">
    <div class="flex">
      <div class="subjects">
        <span>{{ answer.problemSubject }}</span>
        <span>|</span>
        <span>{{ answer.problemGenre }}</span>
      </div>
      <p>{{ answer.problemTitle }}</p>
    </div>
    <UserInfo :uid="uid" />
    <p class="date"></p>
    <div class="buttons flex">
      <button class="box-btn" @click="isOpen = !isOpen">
        <fa icon="pen-alt" />
        <span> 問題と解答をみる</span>
      </button>
    </div>
    <div v-if="isOpen" class="popup">
      <div class="head">
        <button class="close">
          <fa icon="times" @click="isOpen = !isOpen" />
        </button>
        <h3>{{ answer.problemTitle }}</h3>
        <nav class="page-nav">
          <button :class="{active: activeTab == 'q'}" @click="activeTab = 'q'">問題</button>
          <button :class="{active: activeTab == 'a'}" @click="activeTab = 'a'">
            <span v-if="user.nickname">{{ user.nickname }}</span><span v-else>{{ user.name }}</span>さんの解答</button>
        </nav>
      </div>
      <div v-if="activeTab == 'q'" class="view body" v-html="md.render(problem.content)"></div>
      <div v-if="activeTab == 'a'" class="view body" v-html="md.render(answer.content)"></div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import UserInfo from "@/components/UserInfo";
import markdownIt from "markdown-it";
import "katex/dist/katex.min.css";
import mk from "markdown-it-katex";
import mv from "markdown-it-video";
import mf from "markdown-it-footnote";
import sanitizer from "markdown-it-sanitizer";
export default {
  props: ["answer", "uid"],
  components: {
    UserInfo,
  },
  data() {
    return {
      problem: {},
      user: {},
      isOpen: false,
      activeTab: 'q',
      md: new markdownIt({
        html: true,
        linkify: true,
        breaks: true,
        typographer: true
      })
        .use(sanitizer)
        .use(mk, {
          throwOnError: false,
          errorColor: " #cc0000"
        })
        .use(mv, { youtube: { width: 250, height: 150 } })
        .use(mf)
    };
  },
  firestore() {
    return {
      problem: db.collection("problems").doc(this.$props.answer.problem),
      user: db.collection("users").doc(this.$props.answer.user)
    };
  }
};
</script>

<style lang="stylus" scoped>
.item
  .buttons
    border-top 1px solid #eee
    margin 0 -10px
    padding 5px
    justify-content space-between
    .box-btn
      margin 5px
  .popup
    position fixed
    top 30px
    left 50%
    margin-left -45%
    width 90%
    height 60%
    padding 80px 0 10px 
    background white
    border-radius 5px
    box-shadow 0 0 5px rgba(0,0,0,.1)
    z-index 10000
    overflow-y scroll
    .head
      position fixed
      top 30px
      width 100%
      padding 0
      margin 0
      background white
      .close
        position fixed
        top 40px
        right 7%
        font-size 1.5rem
        z-index 10000
      h3
        padding 10px 15px
        margin 10px 0 0
      .page-nav
        button
          padding 0 20px
    .body
      padding 30px 20px
</style>

