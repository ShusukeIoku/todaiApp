<template>
  <div v-if="currentUser && currentUser.uid == user.id" class="user">
    <div class="title flex">
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
        :class="{ active: activeTab == 'info' }"
        @click="activeTab = 'info'"
      >
        <div class="img">
          <fa icon="info" />
        </div>
        <p class="txt">あなたの情報</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'created' }"
        @click="activeTab = 'created'"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">作成した問題</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'solved' }"
        @click="activeTab = 'solved'"
      >
        <div class="img">
          <fa icon="hand-paper" />
        </div>
        <p class="txt">解答した問題</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'stocked' }"
        @click="activeTab = 'stocked'"
      >
        <div class="img">
          <fa icon="save" />
        </div>
        <p class="txt">ストックした問題</p>
      </button>
      <button class="flex btn-with-img" @click="signOut">
        <div class="img">
          <fa icon="door-open" />
        </div>
        <p class="txt">ログアウトする</p>
      </button>
    </nav>
    <nav class="sm-page-nav">
      <button
        class="btn"
        :class="{ active: activeTab == 'info' }"
        @click="activeTab = 'info'"
      >
        <div class="img">
          <fa icon="info" />
        </div>
        <p class="txt">あなたの情報</p>
      </button>
      <button
        class="btn"
        :class="{ active: activeTab == 'created' }"
        @click="activeTab = 'created'"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">作成した問題</p>
      </button>
      <button
        class="btn"
        :class="{ active: activeTab == 'solved' }"
        @click="activeTab = 'solved'"
      >
        <div class="img">
          <fa icon="hand-paper" />
        </div>
        <p class="txt">解答した問題</p>
      </button>
      <button
        class="btn"
        :class="{ active: activeTab == 'stocked' }"
        @click="activeTab = 'stocked'"
      >
        <div class="img">
          <fa icon="save" />
        </div>
        <p class="txt">ストック</p>
      </button>
      <button class="btn" @click="signOut">
        <div class="img">
          <fa icon="door-open" />
        </div>
        <p class="txt">ログアウト</p>
      </button>
    </nav>
    <div v-if="activeTab == 'info'" class="tab-content">
      <label for="nickname">ユーザー名（Enterキーで保存）</label>
      <input
        type="text"
        name="nickname"
        v-model="user.nickname"
        @keypress.enter="saveInfo('nickname')"
      />
      <label for="school">学校名（Enterキーで保存）</label>
      <input
        type="text"
        name="school"
        v-model="user.school"
        @keypress.enter="saveInfo('school')"
      />
      <label for="grade">学年（選択すると自動で保存）</label>
      <select v-model="user.grade" @change="saveInfo('grade')">
        <option value="">選択してください</option>
        <option v-for="(grade, idx) in grades" :key="idx" :value="grade">
          {{ grade }}
        </option>
      </select>
      <label for="twitter">Twitter ID（Enterキーで保存）</label>
      <input
        type="text"
        name="twitter"
        v-model="user.twitter"
        @keypress.enter="saveInfo('twitter')"
      />
    </div>
    <div v-if="activeTab == 'created'" class="tab-content">
      <Item
        v-for="problem in problemsCreated"
        :key="problem.id"
        :problem="problem"
        :uid="problem.user"
      />
    </div>
    <div v-if="activeTab == 'solved'" class="tab-content">
      <AltItem
        v-for="answer in problemsSolved"
        :key="answer.id"
        :answer="answer"
        :uid="answer.problemAuthor"
        :problemId="answer.problem"
      />
    </div>
    <div v-if="activeTab == 'stocked'" class="tab-content">
      <Item
        v-for="problem in problemsStocked"
        :key="problem.id"
        :problem="problem"
        :uid="problem.user"
      />
    </div>
  </div>
  <div v-else class="user-public">
    <div class="title flex">
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
      <div class="txts">
        <h1 v-if="user.nickname">{{ user.nickname }}</h1>
        <h1 v-else>{{ user.name }}</h1>
        <p class="sub-title">
          <span v-if="user.school">{{ user.school }}</span>
          <span v-if="user.grade"> ({{ user.grade }})</span>
        </p>
      </div>
    </div>
    <div class="data-box">
      <h3>総合データ</h3>
    </div>
    <div class="data-box">
      <h3>出題データ</h3>
    </div>
    <div class="data-box">
      <h3>解答データ</h3>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
import Item from "@/components/Item";
import AltItem from "@/components/AltItem";
export default {
  data() {
    return {
      user: {},
      currentUser: {},
      problemsCreated: [],
      problemsSolved: [],
      problemsStocked: [],
      activeTab: "info",
      grades: [
        "中学1年",
        "中学2年",
        "中学3年",
        "高校1年",
        "高校2年",
        "高校3年",
        "大学生",
        "大卒"
      ]
    };
  },
  components: {
    Item,
    AltItem
  },
  firestore() {
    return {
      user: db.collection("users").doc(this.$route.params.uid),
      problemsCreated: db
        .collection("problems")
        .where("user", "==", this.$route.params.uid),
      problemsSolved: db
        .collection("answers")
        .where("user", "==", this.$route.params.uid),
      problemsStocked: db
        .collection("users")
        .doc(this.$route.params.uid)
        .collection("stocks")
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  methods: {
    signOut() {
      if (window.confirm("サインアウトしてよろしいですか？")) {
        auth.signOut().then(
          this.$router.push("/"),
          location.reload(),
          this.$toasted.show(this.user.name + "さん、またあとで！", {
            position: "top-center",
            duration: 1500
          })
        );
      }
    },
    saveInfo(field) {
      const userDoc = db.collection("users").doc(this.$route.params.uid);
      if (field == "nickname") {
        userDoc
          .set(
            {
              nickname: this.user.nickname
            },
            { merge: true }
          )
          .then(
            this.$toasted.show("変更を保存しました。", {
              position: "top-center",
              duration: 1500
            })
          );
      } else if (field == "school") {
        userDoc
          .set(
            {
              school: this.user.school
            },
            { merge: true }
          )
          .then(
            this.$toasted.show("変更を保存しました。", {
              position: "top-center",
              duration: 1500
            })
          );
      } else if (field == "grade") {
        userDoc
          .set(
            {
              grade: this.user.grade
            },
            { merge: true }
          )
          .then(
            this.$toasted.show("変更を保存しました。", {
              position: "top-center",
              duration: 1500
            })
          );
      } else if (field == "twitter") {
        userDoc
          .set(
            {
              twitter: this.user.twitter
            },
            { merge: true }
          )
          .then(
            this.$toasted.show("変更を保存しました。", {
              position: "top-center",
              duration: 1500
            })
          );
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.img
  position relative
  .badge
    position absolute
    right -4px
    text-align center
    box-shadow 0 0 5px rgba(0,0,0,.5)
  .twicon
    background #00aced
    color white
    bottom -4px
    font-size .8rem
    width 20px
    height 20px
    line-height 20px
    border-radius 50%
    cursor pointer
  .contribution
    top -4px
    color white
    font-size .7rem
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
.sm-page-nav
  display none
@media (max-width 768px)
  .page-nav
    display none
  .sm-page-nav
    display block
    border-bottom 1px solid #eee
    .btn
      text-align center
      height auto
      .img
        font-size 1.3rem
      .txt
        margin -5px 0 0 0
        font-size .6rem
    .active
      border-bottom 1px solid #555
      font-weight bolder
.user-public
  .title
    margin 0 auto
  .data-box
    width 600px
    max-width 95%
    margin 20px auto
    padding 10px
</style>
