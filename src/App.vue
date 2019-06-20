<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap')
body
  margin 0
  font-size 14px
  font-family 'Quicksand','YuGothic','Yu Gothic', serif
:link,
:visited
  text-decoration none
  color inherit
main
  margin 100px 0 50px
  min-height 400px
.flex
  display flex
  flex-wrap nowrap
  justify-content flex-start
.wrap
  flex-wrap wrap
.btn-with-img
  transition all .2s
  .txt
    margin 0 0 0 2px
  .img
    height 2rem
    width 2rem
    border-radius 50%
    font-size 1.2rem
    background-size cover
  &:hover
    color black
    font-weight bolder
button
  background transparent
  font-family 'Quicksand','YuGothic','Yu Gothic', serif
  font-size .8rem
  height 2rem
  line-height 2rem
  border none
  cursor pointer
  &:focus
    outline none
  &:hover
    color black
    font-weight bolder
.box-btn
  border 1px solid #555
  border-radius 3px
  font-size .7rem
  height 2.2rem
.title
  width fit-content
  margin 0 0 30px 10px
  .img
    width 3rem
    height 3rem
    font-size 2.5rem
    border-radius 50%
    background-size cover
  .txts
    margin-left 10px
    h1
      margin 0
      font-size 1.4rem
    .sub-title
      margin 0
.page-nav
  border-bottom 1px solid #eee
  button
    height 2.5rem
    line-height 2.5rem
    padding 0 12px 0 2px
    font-size .8rem
  .active
    color black
    font-weight bolder
    border-bottom 1px solid black
.tab-content
  margin 0
label
  display flex
  flex-wrap nowrap
  justify-content space-between
  margin 30px 0 10px 10px
  position relative
input,textarea
  background #eee
  display block
  border none
  width 96%
  padding 15px 2%
  font-size .9rem
  resize none
  &:focus
    outline none
textarea
  height 250px
select
  border 1px solid #eee
  background #eee
  height 3rem
  line-height 3rem
  width 100%
  font-size 1rem
  border-radius 0
  &:focus
    outline none
.body
  h1
    border-bottom 1px solid #eee
    padding-bottom 10px
  :link
    background #eee
    padding 5px
    border-radius 3px
    font-size .8rem
  table
    border-collapse collapse
    border-spacing 0
    width 100%
    margin 10px 0
    tr
      border-bottom solid 1px #eee
      th,td
        padding 10px
      th
        font-weight bolder
        background #eee
  img
    width 100%
  blockquote
    border 1px solid #eee
    padding 0 15px
    border-radius 3px
  strong
    text-decoration underline
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
    color white
</style>
