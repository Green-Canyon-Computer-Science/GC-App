<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Green Canyon TV</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">GCTV</ion-title>
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
              <ion-item v-for="(item, index) in items" :key="index">
                <iframe :width="windowWidth" :height="windowHeight" :src="videoUrl(item.id.videoId)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { reactive } from 'vue';

let resultNum = 5;

const getNewVideos = async () => {
  const result =  await (await fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAy3canGYotL10o_c8EhlIwPjxDvliEhjw&channelId=UCiJmpBrGbX9oc2YQRCxYnrA&part=snippet,id&order=date&maxResults=" + resultNum, {method: "GET"})).json();
  console.log(result);
  return result.items;
}


const videoUrl = (videoId) => {
  console.log(videoId);
  return `https://www.youtube.com/embed/${videoId}`;
}

const items = reactive([]);
getNewVideos().then((result) => {
  items.splice(0, items.length, ...result);
  console.log("EEEEHHH" + items);
});

const ionInfinite = (ev) => {
  resultNum += 5;
  getNewVideos().then((result) => {
    items.splice(0, items.length, ...result);
    console.log("EEEEHHH" + items);
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
  top: 65px;
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
  