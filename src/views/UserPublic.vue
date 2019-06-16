<template>
  <div class="user-public">
    <div class="title flex">
      <div class="img" :style="'background-image: url(' + user.photoURL + ');'">
        <div
          class="badge contribution"
          :class="{
            padawan: problemsSolved.length + problemsCreated.length * 3 < 4,
            intermediate:
              problemsSolved.length + problemsCreated.length * 3 >= 4 &&
              problemsSolved.length + problemsCreated.length * 3 < 10,
            master:
              problemsSolved.length + problemsCreated.length * 3 >= 10 &&
              problemsSolved.length + problemsCreated.length * 3 < 20,
            lord: problemsSolved.length + problemsCreated.length * 3 >= 20
          }"
        >
          {{ problemsSolved.length + problemsCreated.length * 3 }}
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
      <div class="txts">
        <h1 v-if="user.nickname">{{ user.nickname }}</h1>
        <h1 v-else>{{ user.name }}</h1>
        <p class="sub-title">
          <span v-if="user.school">{{ user.school }}</span>
          <span v-if="user.grade"> ({{ user.grade }})</span>
        </p>
      </div>
    </div>
    <nav class="flex page-nav">
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'general' }"
        @click="activeTab = 'general'"
      >
        <div class="img">
          <fa icon="database" />
        </div>
        <p class="txt">総合データ</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'created' }"
        @click="activeTab = 'created'"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">出題データ</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'solved' }"
        @click="activeTab = 'solved'"
      >
        <div class="img">
          <fa icon="grin" />
        </div>
        <p class="txt">解答データ</p>
      </button>
    </nav>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      user: {},
      activeTab: "general",
      problemsCreated: [],
      problemsSolved: []
    };
  },
  firestore() {
    return {
      user: db.collection("users").doc(this.$route.params.uid),
      problemsCreated: db
        .collection("problems")
        .where("user", "==", this.$route.params.uid),
      problemsSolved: db
        .collection("answers")
        .where("user", "==", this.$route.params.uid)
    };
  }
};
</script>

<style lang="stylus" scoped>
.title
  margin 0 auto 30px
</style>
