<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Announcments</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">{{ title.title }}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ArticleComp :title="title.title" :article="article.article" :img="img.img"></ArticleComp>

      </ion-content>
    </ion-page>
  </template>
  
<script setup>
  const title = reactive({});
  const article = reactive({});
  const img = reactive({});
  const announcements = reactive([]); 

  const getNewAnn = async () => {
    const result =  await (await fetch("http://192.168.0.124:3000/announcements", {method: "GET"})).json();
    console.log(result);
    return result;
  }
  const qs = (function(a) {
    if (a == "") return {};
    const b = {};
    for (let i = 0; i < a.length; ++i)
    {
        const p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));


  const t = qs["index"];

  getNewAnn().then((result) => {
    announcements.splice(0, announcements.length, ...result);
    title.title = announcements[t].title;
    article.article = announcements[t].article
    img.img = announcements[t].imglink;
    console.log(title);
  });


</script>

  <script>
import ArticleComp from './ArticleTemp.vue';

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { reactive } from 'vue';



export default {
  name: 'ArticlePage',
  components: {
    ArticleComp
  }
}
</script>
  