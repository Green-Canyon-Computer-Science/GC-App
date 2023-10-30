<template>
    <ion-card :class="props.slim?'infocontent':''">
        <img style="height: 200px;" alt="announcement image" :src=" props.item.imglink" :class="props.slim?'cardimg':''" />
        <ion-card-header :class="props.slim?'cardheader':''">
            <ion-card-title> {{ props.item.title }} </ion-card-title>
            <ion-card-subtitle> {{ convert(props.item.timestamp) }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content :class="props.slim?'cardcontent':''">
        <p>
            {{ props.slim?shorten(props.item.descr):props.item.descr }}
        </p>
        </ion-card-content>
        <div id="learnButton">
        <ion-button id="learn" :href="'/article?index=' + props.item.id">Learn More</ion-button>
        </div>
    </ion-card>
</template>

<script setup>
import { getDate, shorten } from '../constants';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonCardSubtitle, IonInfiniteScrollContent, IonInfiniteScroll} from '@ionic/vue';
import { reactive } from 'vue';

const props = defineProps(['item', 'slim']);

function convert(timestamp) {
    return getDate(timestamp);
}


</script>

<style scoped>
.cardcontent {
    padding: 0px;
    margin: 0;
  }
  .cardheader {
    padding: 0px;
    margin: 0;
    padding-top: 10px;
    align-self: flex-end;
  }
  .cardimg {
    float: left;
    height: 500px;
    width: 50%;
    max-height: 177px;
    object-fit: cover;
  }
  .infocontent {
    display: flexbox;
    justify-content: space-between;
    margin-left: 24px;
    margin-right: 24px;
  }
</style>