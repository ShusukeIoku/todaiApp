<template>
  <div class="top">
    <div class="title flex">
      <div class="img">
        <fa icon="search" />
      </div>
      <div class="txts">
        <h1>問題をさがす</h1>
        <p class="sub-title">Browse Problems</p>
      </div>
    </div>
    <div class="selectors flex">
      <div class="selector subject">
        <label>科目で選ぶ</label>
        <div class="flex wrap selects">
          <button
            class="select"
            @click="(selectedSubject = ''), (selectedGenre = '')"
            :class="{ active: selectedSubject == '' }"
          >
            全科目
          </button>
          <button
            class="select"
            @click="(selectedSubject = '英語'), (selectedGenre = '')"
            :class="{ active: selectedSubject == '英語' }"
          >
            英語
          </button>
          <button
            class="select"
            @click="(selectedSubject = '数学'), (selectedGenre = '')"
            :class="{ active: selectedSubject == '数学' }"
          >
            数学
          </button>
        </div>
      </div>
      <div class="selector">
        <label>ジャンルで選ぶ</label>
        <div v-if="selectedSubject == ''" class="flex wrap selects">
          <button
            class="select"
            :class="{ active: selectedGenre == '' }"
            @click="selectedGenre = ''"
          >
            全ジャンル
          </button>
        </div>
        <div v-if="selectedSubject == '英語'" class="flex wrap selects">
          <button
            class="select"
            :class="{ active: selectedGenre == '' }"
            @click="selectedGenre = ''"
          >
            全ジャンル
          </button>
          <button
            v-for="(genre, idx) in genreEnglish"
            :key="idx"
            class="select"
            :class="{ active: selectedGenre == genre }"
            @click="selectedGenre = genre"
          >
            {{ genre }}
          </button>
        </div>
        <div v-if="selectedSubject == '数学'" class="flex wrap selects">
          <button
            class="select"
            :class="{ active: selectedGenre == '' }"
            @click="selectedGenre = ''"
          >
            全ジャンル
          </button>
          <button
            v-for="(genre, idx) in genreMath"
            :key="idx"
            class="select"
            :class="{ active: selectedGenre == genre }"
            @click="selectedGenre = genre"
          >
            {{ genre }}
          </button>
        </div>
      </div>
    </div>
    <input
      class="serach"
      type="text"
      placeholder="キーワードで選ぶ"
      v-model="query"
    />
    <Item
      v-for="problem in filterBy(
        filterBy(filterBy(problems, query, 'title'), selectedGenre, 'genre'),
        selectedSubject,
        'subject'
      )"
      :key="problem.id"
      :problem="problem"
      :uid="problem.user"
    />
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
import { db } from "../main";
import Item from "@/components/Item";
export default {
  name: "top",
  head: {
    meta: [
      {
        name: "description",
        content:
          "todaiAppは、東大志望者＆現役東大生を主体とする相互出題・相互解答コミュニティです。"
      },
      { property: "og:title", content: "todaiApp" },
      {
        property: "og:description",
        content:
          "todaiAppは、東大志望者＆現役東大生を主体とする相互出題・相互解答コミュニティです。"
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://todaiapp.com/" },
      { property: "og:image", content: "../../public/img/logo.png" },
      { name: "twitter:card", content: "summary" }
    ]
  },
  data() {
    return {
      problems: [],
      query: "",
      selectedSubject: "",
      selectedGenre: "",
      genreEnglish: [
        "要約",
        "和訳",
        "英作文",
        "リスニング",
        "英文法",
        "英訳",
        "総合問題"
      ],
      genreMath: ["数I", "数II", "数III", "数A", "数B", "数C"]
    };
  },
  components: {
    Item
  },
  firestore() {
    return {
      problems: db.collection("problems").orderBy("date", "desc")
    };
  },
  mixins: [Vue2Filters.mixin]
};
</script>

<style lang="stylus" scoped>
.search
  margin-bottom 1px
.selectors
  margin -20px 0 20px
  .selector
    margin 5px
    width 70%
    .selects
      margin-left 10px
      label
        margin 0
      .select
        border 1px solid #eee
        border-radius 20px
        height 1.8rem
        line-height 1.8rem
        padding 0 15px
        margin 2px
        transition all .2s
        &:hover
          border 1px solid #555
          font-weight bolder
      .select.active
        border 1px solid #555
        font-weight bolder
  .subject
    width 220px
</style>
