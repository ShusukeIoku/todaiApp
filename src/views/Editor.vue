<template>
  <div class="create">
    <div class="title flex">
      <div class="img">
        <fa icon="pen-alt" />
      </div>
      <div class="txts">
        <h1>問題を作成する</h1>
        <p class="sub-title">Create a New Problem</p>
      </div>
    </div>
    <nav class="flex page-nav">
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'editor' }"
        @click="activeTab = 'editor'"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">問題を編集する</p>
      </button>
      <button
        class="flex btn-with-img"
        :class="{ active: activeTab == 'howto' }"
        @click="activeTab = 'howto'"
      >
        <div class="img">
          <fa icon="question" />
        </div>
        <p class="txt">問題のつくり方</p>
      </button>
    </nav>
    <div v-if="activeTab == 'editor'" class="tab-content">
      <label>科目</label>
      <div class="flex wrap selects">
        <button
          class="select"
          @click="selectedSubject = '英語'"
          :class="{ active: selectedSubject == '英語' }"
        >
          英語
        </button>
        <button
          class="select"
          @click="selectedSubject = '数学'"
          :class="{ active: selectedSubject == '数学' }"
        >
          数学
        </button>
      </div>
      <label>ジャンル</label>
      <div v-if="selectedSubject == '英語'" class="flex wrap selects">
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
          v-for="(genre, idx) in genreMath"
          :key="idx"
          class="select"
          :class="{ active: selectedGenre == genre }"
          @click="selectedGenre = genre"
        >
          {{ genre }}
        </button>
      </div>
      <label for="title">タイトル, キーワード</label>
      <input
        type="text"
        name="title"
        v-model="title"
        placeholder="出題のテーマや解答者への一言など"
      />
      <label for="content">
        問題文（他サイト等の文章を用いる場合は、引用元を明記してください）
      </label>
      <div class="flex edit-box">
        <button v-if="isShown" class="preview" @click="isShown = !isShown">
          <fa icon="eye" />
          プレビューをひらく
        </button>
        <button v-else class="preview" @click="isShown = !isShown">
          <fa icon="eye" />
          プレビューをしまう
        </button>
        <textarea type="text" name="content" v-model="content"> </textarea>
        <div
          class="view body"
          v-html="md.render(content)"
          :class="{ shown: isShown }"
        ></div>
      </div>
      <label for="content">
        解答, 解説（答えがわからない場合は、途中経過を書きましょう）
      </label>
      <div class="flex edit-box">
        <button v-if="isShown" class="preview" @click="isShown = !isShown">
          <fa icon="eye" />
          プレビューをひらく
        </button>
        <button v-else class="preview" @click="isShown = !isShown">
          <fa icon="eye" />
          プレビューをしまう
        </button>
        <textarea type="text" name="content" v-model="answer"> </textarea>
        <div
          class="view body"
          v-html="md.render(answer)"
          :class="{ shown: isShown }"
        ></div>
      </div>
      <button
        class="submit"
        :class="{ready:selectedSubject && selectedGenre && title && content && answer}"
        @click="saveProblem"
      >
        問題を公開する
      </button>
    </div>
    <div v-if="activeTab == 'howto'" class="tab-content howto">
      <div class="toc">
        <h2>もくじ</h2>
        <a href="#head1"><li>Markdownを使ってみよう！</li></a>
        <a href="#head2"><li>ヘッダーを書く</li></a>
        <a href="#head5"><li>リストをつくる</li></a>
        <a href="#head3"><li>リンクをつくる</li></a>
        <a href="#head7"><li>画像を貼り付ける</li></a>
        <a href="#head4"><li>数式を書く</li></a>
        <a href="#head6"><li>表を書く</li></a>
      </div>
      <h2 id="head1">Markdownを使ってみよう！</h2>
      <p>todaiForumでは、問題や解答を「マークダウン」という形式で編集します。
        マークダウンについて聞いたことがない人も、使い方はとても簡単なので、心配は無用です。</p>
      <p>以下では、問題作成や解答の編集に必要な限度でマークダウンの書き方を説明します。全般的に知りたい方は、<a href="https://www.markdown.jp/syntax/">こちらのページ</a>を参考にしてください。</p>
      <h2 id="head2">ヘッダーを書く</h2>
      <p>ヘッダーにしたい文の頭にシャープ（#）をつけます。シャープを増やすほどレベルが下がります。</p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex1">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex1)"
        >
        </div>
      </div>
      <h2 id="head5">リストをつくる</h2>
      <p></p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex4">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex4)"
        >
        </div>
      </div>
      <h2 id="head3">リンクをつくる</h2>
      <p>[リンクのテキスト](リンク先のURL)のように書きます。</p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex2">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex2)"
        >
        </div>
      </div>
      <h2 id="head7">画像を貼り付ける</h2>
      <p>![画像の名前](画像のURL)のように書きます。そのため、画像を添付するには、まず画像のURLを入手しなければなりません。
        もし、スマホなどで撮影した画像を使いたい場合は、<a href="https://imgbb.com/">imgbb</a>などに画像をアップロードして、URLをつくる必要があります。
      </p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex6">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex6)"
        >
        </div>
      </div>
      <h2 id="head4">数式を書く</h2>
      <p>数式は「Latex（レイテック, ラテフなどと読む）」という書き方を使います。
        ２種類の書き方があります。
        文章内で数字を使いたい場合には「$x^2$」のように左右を「$」で囲います。
        数式だけで一行分を使いたい場合には、下のように上下を「$$」で囲います。
      <p>分数やインテグラル、シグマ、行列なども綺麗に書けるので、<a href="https://medemanabu.net/latex/operators/">こちらのサイト</a>などを参考にしつつ、ぜひ積極的に使ってみてください。</p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex3">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex3)"
        >
        </div>
      </div>
      <h2 id="head6">表を書く</h2>
      <p></p>
      <div class="flex edit-box">
        <textarea type="text" name="content" v-model="ex5">
        </textarea>
        <div
          class="view body"
          v-html="md.render(ex5)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
import markdownIt from "markdown-it";
import "katex/dist/katex.min.css";
import mk from "markdown-it-katex";
import sanitizer from "markdown-it-sanitizer";
export default {
  data() {
    return {
      ex1: "# 大きいヘッダー\n## 中くらいのヘッダー\n### 小さいヘッダー",
      ex2: '[東京大学ホームページ](https://www.u-tokyo.ac.jp/ja/index.html)',
      ex3: "$x=5$とする。このとき、\n\n$$\n5x^2+2\n$$\n\nの値を求めよ。",
      ex4: "- 項目1\n- 項目2\n- 項目3",
      ex5: "|a  |b  |c  |\n|---|---|---|\n|1  |2  |3  |\n|4  |5  |6  |",
      ex6: "![安田講堂](https://upload.wikimedia.org/wikipedia/commons/2/23/Yasuda_Auditorium_-_Tokyo_University_3.jpg)",
      currentUser: {},
      title: "",
      content: "",
      answer: "",
      activeTab: "editor",
      selectedSubject: "英語",
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
      genreMath: ["数I", "数II", "数III", "数A", "数B", "数C"],
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
          }), isShown: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  methods: {
    saveProblem() {
      if (this.selectedSubject && this.selectedGenre && this.title && this.content && this.answer) {
        const date = new Date();
        db.collection("problems")
          .add({
            title: this.title,
            subject: this.selectedSubject,
            genre: this.selectedGenre,
            content: this.content,
            user: this.currentUser.uid,
            date: date
          })
          .then(data => {
            this.$toasted.show("Congrats! 問題が公開されました。", {
              position: "top-center",
              duration: 1500
            }),
              this.createAnswer(data.id);
            this.$router.push("/problem/" + data.id);
          });
      } else {
        this.$toasted.show("全ての項目を選択・記入してください。", {
          position: "top-center",
          duration: 1500
        })
      }
    },
    createAnswer(id) {
      const date = new Date();
      db.collection("answers")
        .doc(id + "-" + this.currentUser.uid)
        .set({
          content: this.answer,
          problem: id,
          user: this.currentUser.uid,
          date: date,
          problemAuthor: this.currentUser.uid,
          problemTitle: this.title,
          problemSubject: this.selectedSubject,
          problemGenre: this.selectedGenre
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.selects
  margin-left 10px
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
.submit
  position fixed
  top 30px
  left 50%
  margin-left -75px
  width 150px
  text-align center
  border-radius 20px
  height 2.5rem
  line-height 2.5rem
  padding 0
  background #eee
  color white
  z-index 1000
  cursor auto
.ready
  background #555
  cursor pointer
.preview
  position absolute
  right 10px
  bottom 5px
  z-index 1000
textarea
  z-index 100
.view
  width 96%
  padding 0 2%
  transition all .2s
.shown
  margin-left -100%
.edit-box
  border 2px solid #eee
  position relative
.howto
  margin 50px auto
  width 95%
  max-width 600px
  .toc
    border 1px solid #eee
    padding 10px 20px
    h2
      margin 10px 0
    li
      margin 10px 0
  h2
    border-bottom 1px solid #eee
    padding-bottom 5px
    margin-top 50px
  a
    border-bottom 2px solid #555
    padding-bottom 1px
@media (max-width 768px)
  .submit
    width 100%
    top auto
    bottom 0
    left 0
    border-radius 0
    margin 0
    display none
  .ready
    display block
</style>
