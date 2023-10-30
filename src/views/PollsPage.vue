<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Polls</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Polls</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-card>
          <ion-card-content>
            <strong style="font-size: 30px; line-height: 26px;">Polls</strong>

          </ion-card-content>
        </ion-card>
        <div id="cards">
          <div v-for="(p, i) in polls" :key="i">
            <PollCard :p="p"></PollCard>  
          </div>
          <ion-infinite-scroll @ionInfinite="ionInfinite">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
          </ion-infinite-scroll>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonCardSubtitle, IonInfiniteScrollContent, IonInfiniteScroll} from '@ionic/vue';
import { reactive } from 'vue';
import { Storage } from '@ionic/storage';
import { APIENDPOINT, setCookie, getCookie, getDate } from '../constants';
import PollCard from '../components/PollCard.vue';


const polls = reactive([]);
let off = 0;

async function delayedFalse() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(false);
    }, 1000); // 1000 milliseconds = 1 second
  });
}

const getPolls = async () => {

  try {
    const result =  (await (await fetch(APIENDPOINT + "/polls?sortbytime=1&max=10&offset=" + (off), {method: "GET"})).json()).data;
    return result;
  } catch (e) {
    console.log(e);
  }
  return [];
};

const ionInfinite = (ev) => {
  off += 10;
  getPolls().then((result) => {
    if (result.length == 0) {
      return;
    }
    result.forEach(element => {
      polls.push(element);
    });
    setTimeout(() => ev.target.complete(), 500);

  });
};

getPolls().then((result) => {
  polls.splice(0, polls.length, ...result)
})


</script>
  
<style scoped>
  
  ion-card {
    text-align: center;
  }

  p {
    font-size: large !important;
  }

</style>
  