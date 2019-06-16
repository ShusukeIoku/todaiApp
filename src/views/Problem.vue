<template>
  <div class="problem">
    <a
      :href="
        'https://twitter.com/intent/tweet?text=【' +
          problem.subject +
          ' ' +
          problem.genre +
          '】「' +
          problem.title +
          '」' +
          '%20-%20todaiAppで解く&url=https://todaiapp.com/problem/' +
          $route.params.id
      "
      target="_black"
    >
      <button
        class="flex btn-with-img tweet-btn bg"
        :class="{ leanrightbg: !currentUser }"
      >
        <div class="img">
          <fa :icon="['fab', 'twitter']" />
        </div>
        <p class="txt">問題をシェア</p>
      </button>
      <button class="btn tweet-btn sm" :class="{ leanright: !currentUser }">
        <div class="img">
          <fa :icon="['fab', 'twitter']" />
        </div>
        <p class="txt">問題をシェア</p>
      </button>
    </a>
    <div class="title">
      <div class="subjects">
        <span>{{ problem.subject }}</span>
        <span>|</span>
        <span>{{ problem.genre }}</span>
      </div>
      <h2>{{ problem.title }}</h2>
      <div class="flex">
        <div
          class="img"
          :style="'background-image: url(' + user.photoURL + ');'"
        >
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
        <!--
        <router-link :to="'/user-public/' + uid">
        -->
        <div class="txts">
          <p v-if="user.nickname" class="name">{{ user.nickname }}</p>
          <p v-else class="name">{{ user.name }}</p>
          <p class="info">
            <span v-if="user.school">{{ user.school }}</span>
            <span v-if="user.grade"> ({{ user.grade }})</span>
          </p>
        </div>
        <!--
        </router-link>
        -->
      </div>
    </div>
    <nav class="flex page-nav">
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'question' }"
        @click="activeTab = 'question'"
      >
        <div class="img">
          <fa icon="question" />
        </div>
        <p class="txt">問題</p>
      </button>
      <button
        v-if="currentUser"
        class="flex btn-with-img"
        :class="{ active: activeTab == 'myAnswer' }"
        @click="activeTab = 'myAnswer'"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">あなたの解答</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'answers' }"
        @click="activeTab = 'answers'"
      >
        <div class="img">
          <fa icon="grin" />
        </div>
        <p class="txt">{{ answers.length }}人の解答</p>
      </button>
    </nav>
    <div v-if="activeTab == 'question'" class="tab-content body">
      <div v-if="currentUser && currentUser.uid == uid" class="flex">
        <button class="box-btn" @click="qeditable = !qeditable">
          <fa v-if="qeditable" icon="eye" />
          <fa v-else icon="pen-alt" />
          <span v-if="qeditable"> プレビュー</span>
          <span v-else> 編集する</span>
        </button>
        <button v-if="qeditable" class="box-btn" @click="updateProblem">
          <fa icon="save" />
          <span> 保存する</span>
        </button>
        <!--
        <button class="box-btn">
          <fa icon="download" />
          <span> PDFでダウンロード</span>
        </button>
        -->
      </div>
      <p class="toi">問</p>
      <div v-if="qeditable">
        <textarea v-model="problem.content"></textarea>
      </div>
      <div v-else v-html="md.render(problem.content)"></div>
    </div>
    <div v-if="activeTab == 'myAnswer'" class="tab-content body">
      <div class="flex">
        <button class="box-btn" @click="aeditable = !aeditable">
          <fa v-if="aeditable" icon="eye" />
          <fa v-else icon="pen-alt" />
          <span v-if="aeditable"> プレビュー</span>
          <span v-else> 編集する</span>
        </button>
        <button
          v-if="myAnswer && aeditable"
          class="box-btn"
          @click="updateAnswer"
        >
          <fa icon="save" />
          <span> 保存する</span>
        </button>
        <button
          v-else-if="!myAnswer && aeditable"
          class="box-btn"
          @click="saveAnswer"
        >
          <fa icon="save" />
          <span> 公開する</span>
        </button>
      </div>
      <div v-if="myAnswer">
        <div v-if="aeditable">
          <textarea v-model="myAnswer.content"></textarea>
        </div>
        <div v-else v-html="md.render(myAnswer.content)"></div>
      </div>
      <div v-else>
        <div v-if="aeditable">
          <textarea v-model="newAnswer"></textarea>
        </div>
        <div v-else v-html="md.render(newAnswer)"></div>
      </div>
    </div>
    <div v-if="activeTab == 'answers'" class="tab-content">
      <div>
        <AnswerItem v-for="answer in answers" :key="answer.id" :data="answer" />
      </div>
    </div>
  </div>
</template>

<script>
import AnswerItem from "@/components/AnswerItem";
import { db } from "@/main";
import { auth } from "@/main";
import { md } from "@/main";
import markdownIt from "markdown-it";
import "katex/dist/katex.min.css";
import mk from "markdown-it-katex";
import mv from "markdown-it-video";
import mf from "markdown-it-footnote";
import sanitizer from "markdown-it-sanitizer";
export default {
  data() {
    return {
      qeditable: false,
      aeditable: true,
      currentUser: {},
      problemsCreated: [],
      problemsSolved: [],
      problem: {},
      user: {},
      uid: "",
      myAnswer: {},
      newAnswer: "",
      answers: [],
      activeTab: "question",
      md: new markdownIt({
        html: true,
        linkify: true,
        breaks: true,
        typographer: true
      }).use(sanitizer)
        .use(mk, {
          throwOnError: false,
          errorColor: " #cc0000"
        })
        .use(mv, { youtube: { width: 250, height: 150 } })
        .use(mf)
    }
  },
  head: {
    title() {
      return {
        inner: "問題ページ"
      };
    },
    meta: [
      { name: "description", content: "問題ページ" },
      { property: "og:title", content: "問題ページ" },
      { property: "og:description", content: "問題ページ" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://todaiapp.com/" },
      { property: "og:image", content: "../../public/img/logo.png" },
      { name: "twitter:card", content: "summary" }
    ]
  },
  components: {
    AnswerItem
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
      db.collection("answers")
        .doc(this.$route.params.id + "-" + user.uid)
        .get()
        .then(answer => {
          if (answer) {
            this.myAnswer = answer.data();
          }
        });
    });
    db.collection("problems")
      .doc(this.$route.params.id)
      .get()
      .then(problem => {
        this.problem = problem.data();
        db.collection("users")
          .doc(problem.data().user)
          .get()
          .then(user => {
            this.user = user.data();
            this.uid = user.id;
          });
        db.collection("problems")
          .where("user", "==", problem.data().user)
          .get()
          .then(problems => {
            problems.forEach(problem => {
              this.problemsCreated.push(problem.data());
            });
          });
        db.collection("answers")
          .where("user", "==", problem.data().user)
          .get()
          .then(problems => {
            problems.forEach(problem => {
              this.problemsSolved.push(problem.data());
            });
          });
      });
  },
  firestore() {
    return {
      answers: db
        .collection("answers")
        .where("problem", "==", this.$route.params.id)
    };
  },
  methods: {
    updateProblem() {
      db.collection("problems")
        .doc(this.$route.params.id)
        .set(
          {
            content: this.problem.content
          },
          { merge: true }
        )
        .then(
          this.$toasted.show("問題を更新しました！", {
            position: "top-center",
            duration: 1500
          }),
          (this.qeditable = false)
        );
    },
    updateAnswer() {
      db.collection("answers")
        .doc(this.$route.params.id + "-" + this.currentUser.uid)
        .set(
          {
            content: this.myAnswer.content
          },
          { merge: true }
        )
        .then(
          this.$toasted.show("解答を更新しました！", {
            position: "top-center",
            duration: 1500
          }),
          (this.aeditable = false)
        );
    },
    saveAnswer() {
      const date = new Date();
      db.collection("answers")
        .doc(this.$route.params.id + "-" + this.currentUser.uid)
        .set(
          {
            content: this.newAnswer,
            date: date,
            problem: this.$route.params.id,
            user: this.currentUser.uid,
            problemAuthor: this.problem.user,
            problemTitle: this.problem.title,
            problemSubject: this.problem.subject,
            problemGenre: this.problem.genre
          },
          { merge: true }
        )
        .then(
          this.$toasted.show("解答を公開しました！", {
            position: "top-center",
            duration: 1500
          }),
          (this.aeditable = false)
        );
    }
  }
};
</script>

<style lang="stylus" scoped>
.problem
  .tweet-btn
    position fixed
    top 10px
    right 170px
    font-size .8rem
    .icon
      font-size 1.2rem
  .leanrightbg
    right 130px
  .subjects
    margin 20px 0
    padding 0 8px
    border 1px solid #555
    border-radius 20px
    font-size .7rem
    height 1.5rem
    line-height 1.5rem
    width fit-content
    span
      padding 0 1px
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
  h2
    font-size 1rem
  .body
    width 95%
    max-width 600px
    margin 60px auto 50px
    position relative
    .toi
      font-size 2rem
      font-weight bolder
      text-align center
    .flex
      position absolute
      top -40px
      left 0
      .box-btn
        margin-right 5px
  .tweet-btn
    z-index 1000
    .img
        font-size 1.5rem
  .sm
    display none
@media (max-width 768px)
  .problem
    .bg
      display none
    .sm
      display block
    .tweet-btn
      right 120px
      .img
        font-size 1.3rem
        margin 0 auto
      .txt
        margin -10px 0 0 0
        font-size .6rem
    .leanright
      right 75px
</style>
