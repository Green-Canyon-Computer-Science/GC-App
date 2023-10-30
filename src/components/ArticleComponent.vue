<template>
    <ion-card>
      <img :src="img" alt="Article Image" id="articleimg">
    </ion-card>

  <ion-card>
    <vue-markdown :source="article + ''" id="article"></vue-markdown>
  </ion-card>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render'

</script>

<script>
import { reactive } from 'vue'; 
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton  } from '@ionic/vue';


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