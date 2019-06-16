<template>
  <header>
    <div class="titles">
      <h1 @click="$router.push('/')">todaiApp.</h1>
      <p class="subtitle">使った分だけ差がつくアプリ</p>
    </div>
    <nav class="flex">
      <button
        v-if="currentUser"
        class="flex btn-with-img bg"
        @click="$router.push('/edit')"
      >
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">問題を作成</p>
      </button>
      <button v-if="currentUser" class="sm btn" @click="$router.push('/edit')">
        <div class="img">
          <fa icon="pen-alt" />
        </div>
        <p class="txt">問題を作成</p>
      </button>
      <button v-else class="flex btn-with-img bg" @click="signIn">
        <div class="img">
          <fa icon="user" />
        </div>
        <p class="txt">サインイン</p>
      </button>
      <button
        v-if="currentUser"
        class="flex btn-with-img"
        @click="$router.push('/user/' + currentUser.uid)"
      >
        <div
          class="img"
          :style="'background-image: url(' + currentUser.photoURL + ');'"
        ></div>
      </button>
      <button v-else class="sm btn" @click="signIn">
        <div class="img">
          <fa icon="user" />
        </div>
        <p class="txt">サインイン</p>
      </button>
    </nav>
  </header>
</template>

<script>
import { db } from "../main";
import { auth } from "../main";
import firebase from "firebase/app";

export default {
  data() {
    return {
      currentUser: {}
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(result => {
        this.createUser(result.user);
        this.$router.push("/user/" + result.user.uid);
        this.$toasted.show(result.user.displayName + "さん、こんにちは！", {
          position: "top-center",
          duration: 1500
        });
      });
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
header
  padding 10px 2%
  display flex
  flex-wrap nowrap
  justify-content space-between
  position fixed
  top 0
  width 96%
  z-index 1000
  h1
    margin 0
    font-size 1.3rem
    cursor pointer
  .subtitle
    margin 0
    font-size .7rem
  .sm
    display none
  @media (max-width 768px)
    .sm
      display block
      font-size 1.3rem
      .txt
        margin -10px 0 0 0
        font-size .6rem
    .bg
      display none
    .btn-with-img
      .img
        width 40px
        height 40px
</style>
