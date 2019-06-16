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
    <Buttons :problem="problem" hide="true" />
    <p class="date"></p>
  </div>
</template>

<script>
import { db } from "@/main";
import Buttons from "@/components/Buttons";
import UserInfo from "@/components/UserInfo";
export default {
  props: ["answer", "uid"],
  components: {
    UserInfo,
    Buttons
  },
  data() {
    return {
      problem: {}
    };
  },
  firestore() {
    return {
      problem: db.collection("problems").doc(this.$props.answer.problem)
    };
  }
};
</script>
