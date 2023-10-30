<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Announcements</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Announcements</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-content>
          <strong style="font-size: 30px; line-height: 26px;">Announcements</strong>

        </ion-card-content>
      </ion-card>
      <div id="cards">
 
        <div v-for="(item, index) in announcements" :key="index">
          <AnnouncementsCard :item="item">

          </AnnouncementsCard> 
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
  import { APIENDPOINT } from '../constants';
  import AnnouncementsCard from '../components/AnnouncementCard.vue';

  const announcements = reactive([]); 
  let off = 0;

const getNewAnn = async () => {
  const endpoint = APIENDPOINT + "/announcements?max=10&offset=" + (off);
  console.log(endpoint);
  try {
    const result =  (await (await fetch(endpoint, {method: "GET"})).json()).data;
    return result;
  } catch (e) {
    console.log(e);
  }
  return [];

}

const ionInfinite = (ev) => {
  off += 10;
  console.log("Ion");
  getNewAnn().then((result) => {
    if (result.length == 0) {
      return;
    }
    console.log(result);
    result.forEach(element => {
      announcements.push(element);
    });
    setTimeout(() => ev.target.complete(), 500);

  });
};

getNewAnn().then((result) => {
  announcements.splice(0, announcements.length, ...result);
});

  
</script>
  
  <script>
  export default {
    data() {
      return {
        windowWidth: window.innerWidth,
        windowHeight: window.innerWidth / 1.77777

      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerWidth / 1.77777;
      }

    }
  }
  </script>

  <style scoped>
  ion-card {
    text-align: center;
  }

  p {
    font-size: large !important;
  }

  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
  }
  
  #learnButton {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #5c1e1e;
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  </style>
  