<template>
  <img :src="img" alt="Article Image" id="articleimg">
  <vue-markdown :source="article + ''" id="article"></vue-markdown>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render'

</script>

<script>
import { reactive } from 'vue';

export default {
  name: 'ArticleComp',
  props: {
      title: String,
      article: String,
      img: String
  }
}
</script>

<style>
  #article {
    margin: 17px;
  }
  #articleimg {
    position: relative;
    width: 95%;
    left: 2.5%;
    border-radius: 25px;
  }
</style>