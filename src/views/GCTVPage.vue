<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>WolfDen Productions</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">WolfDen Productions</ion-title>
          </ion-toolbar>
        </ion-header>

        <div id="container">
          <ion-card>
            <ion-card-content>
              <strong class="capitalize">Most Recent Videos</strong>

            </ion-card-content>
          </ion-card>

          <div id="cards">
            <ion-list>
              <ion-item v-for="(item, index) in items" :key="index" class="video">
                <iframe :width="windowWidth-20" :height="windowHeight" :src="videoUrl(item)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </ion-item>
            </ion-list>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
              <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </div>
        </div>



      </ion-content>
    </ion-page>
  </template>

<script setup>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonCardSubtitle, IonInfiniteScrollContent, IonInfiniteScroll, IonItem, IonList} from '@ionic/vue';
import { ref } from 'vue';
import { APIENDPOINT } from '../constants';
let resultNum = 0;
const getNewVideos = async () => {
  try {
    const result =  await (await fetch(APIENDPOINT + "/youtube?max=" + 5 + "&offset=" + resultNum, {method: "GET"})).json();
    return result.data;
    } catch (e) {
      console.log(e);
    }
    return [];
}
const videoUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
}
const items = ref([]);
getNewVideos().then((result) => {
  console.log(result + ', ' + items.value);
  items.value = items.value.concat(result);
});
const ionInfinite = (ev) => {
  resultNum += 5;
  getNewVideos().then((result) => {
    items.value = items.value.concat(result);
    setTimeout(() => ev.target.complete(), 500);
  });
};
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
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  /* top: 65px; */
}
.video {
  /* --inner-padding-end: 5;
  --padding-start: 10; */
  margin-bottom: 20px;
}
#cards > * {
  border-radius: 15px;
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