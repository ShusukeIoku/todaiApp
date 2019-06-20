<template>
  <div class="buttons flex">
    <div>
      <router-link :to="'/problem/' + problem.id">
        <button class="box-btn">
          <fa icon="pen-alt" />
          <span> 問題をみる</span>
        </button>
      </router-link>
      <button
        v-if="currentUser"
        class="box-btn"
        @click="toggleStock"
        :class="{ stocked: stocked }"
      >
        <fa icon="save" />
        <span v-if="stocked"> ストック中</span>
        <span v-else> 問題をストックする</span>
      </button>
    </div>
    <p class="answers">
      <fa icon="grin" />
      {{ answers.length }}人が解答
    </p>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";
export default {
  props: ["problem"],
  data() {
    return {
      currentUser: {},
      stocked: {},
      answers: []
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.currentUser = user;
      db.collection("users")
        .doc(user.uid)
        .collection("stocks")
        .doc(this.$props.problem.id)
        .onSnapshot(snapshot => {
          this.stocked = snapshot.data();
        });
    });
  },
  firestore() {
    return {
      answers: db
        .collection("answers")
        .where("problem", "==", this.$props.problem.id)
    };
  },
  methods: {
    toggleStock() {
      if (this.stocked) {
        db.collection("users")
          .doc(this.currentUser.uid)
          .collection("stocks")
          .doc(this.$props.problem.id)
          .delete()
          .then(
            this.$toasted.show("問題をストックから削除しました。", {
              position: "top-center",
              duration: 1500
            })
          );
      } else {
        db.collection("users")
          .doc(this.currentUser.uid)
          .collection("stocks")
          .doc(this.$props.problem.id)
          .set({
            content: this.$props.problem.content,
            genre: this.$props.problem.genre,
            subject: this.$props.problem.subject,
            title: this.$props.problem.title,
            user: this.$props.problem.user
          })
          .then(
            this.$toasted.show("問題をストックしました！", {
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
.buttons
  border-top 1px solid #eee
  margin 0 -10px
  padding 5px
  justify-content space-between
  .box-btn
    margin 5px
  .answers
    margin-right 10px
.stocked
  background black
  color white
</style>
