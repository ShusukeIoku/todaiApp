<template>
  <div class="answer-item item">
    <UserInfo class="user-info" :uid="data.user" />
    <div v-if="shown" class="body" v-html="md.render(data.content)"></div>
    <p class="date"></p>
    <button class="toggle-btn" @click="shown = !shown">
      <fa v-if="shown" icon="chevron-up" />
      <fa v-else icon="chevron-down" />
    </button>
    <div :class="{ likes: likes }" class="like-btn" @click="toggleLike">
      <fa icon="heart" />
      <span>{{ likers.length }}</span>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
import firebase from "firebase/app";
import UserInfo from "@/components/UserInfo";
import markdownIt from "markdown-it";
import "katex/dist/katex.min.css";
import mk from "markdown-it-katex";
import sanitizer from "markdown-it-sanitizer";
export default {
  props: ["data"],
  components: {
    UserInfo
  },
  data() {
    return {
      currentUser: {},
      likers: [],
      likes: false,
      shown: false,
      md: new markdownIt({
        html: true,
        linkify: true,
        breaks: true,
        typographer: true
      })
        .use(sanitizer)
        .use(mk, { throwOnError: false, errorColor: " #cc0000" })
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
      db.collection("answers")
        .doc(this.$props.data.id)
        .collection("likers")
        .doc(user.uid)
        .onSnapshot(liker => {
          if (liker.exists) {
            this.likes = true;
          } else {
            this.likes = false;
          }
        });
    });
  },
  firestore() {
    return {
      likers: db
        .collection("answers")
        .doc(this.$props.data.id)
        .collection("likers")
    };
  },
  methods: {
    toggleLike() {
      if (this.currentUser) {
        if (this.likes) {
          db.collection("answers")
            .doc(this.$props.data.id)
            .collection("likers")
            .doc(this.currentUser.uid)
            .delete();
        } else {
          db.collection("answers")
            .doc(this.$props.data.id)
            .collection("likers")
            .doc(this.currentUser.uid)
            .set(
              {
                liker: this.currentUser.uid
              },
              { merge: true }
            );
        }
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(result => {
          this.createUser(result.user);
          this.$router.push("/user/" + result.user.uid);
          this.$toasted.show(result.user.displayName + "さん、こんにちは！", {
            position: "top-center",
            duration: 1500
          });
        });
      }
    },
    createUser(user) {
      db.collection("users")
        .doc(user.uid)
        .set(
          {
            name: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            schoolPublic: true
          },
          { merge: true }
        );
    }
  }
};
</script>

<style lang="stylus" scoped>
.answer-item
  position relative
  .user-info
    margin-bottom 12px
  .body
    width 95%
    max-width 600px
    margin 30px auto
    position relative
  .like-btn
    position absolute
    top 12px
    right 60px
    color rgba(0,0,0,.5)
    font-size 1.2rem
    text-align center
    cursor pointer
    span
      font-size .7rem
      display block
  .likes
    color #ff5aac
  .toggle-btn
    position absolute
    top 12px
    right 15px
    font-size 1.2rem
    cursor pointer
</style>
