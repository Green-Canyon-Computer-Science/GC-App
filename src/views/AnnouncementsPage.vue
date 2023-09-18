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

        <div id="cards">
            <ion-card v-for="(item, index) in announcements" :key="index">
                <img alt="announcement image" :src=" item.imglink" />
                <ion-card-header>
                    <ion-card-title> {{ item.title }} </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                  {{ item.descr}}
                </ion-card-content>
                <div id="learnButton">
                  <ion-button id="learn" :href="'/article?index=' + index">Learn More</ion-button>
                </div>
            </ion-card>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
              <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </div>

      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { reactive } from 'vue';

  const announcements = reactive([]); 

  const getNewAnn = async () => {
    const result =  await (await fetch("http://192.168.0.124:3000/announcements", {method: "GET"})).json();
    console.log(result);
    return result;
  }

  getNewAnn().then((result) => {
    announcements.splice(0, announcements.length, ...result);
    console.log("EEEEHHH" + announcements);
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

  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
  }
  #learn {
  }
  #learnButton {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  #cards {
  
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
  