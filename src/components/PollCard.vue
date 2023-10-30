<template>
    
    <ion-card>
        <img v-if="props.p.image != null && props.p.image != ''" style="height: 200px;" alt="announcement image" :src="props.p.image">
        <ion-card-header>
            <ion-card-title> {{ props.p.title }} </ion-card-title>
            <ion-card-subtitle> {{ getDate(props.p.timestamp) }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
        <p>
            {{ props.p.desc }}
        </p>
        
        </ion-card-content>
        
        <div class="voteButton">
            <ion-button :href="'/poll?index=' + (props.p.id)" :disabled="isDisabled(p)" class="vote" >{{ props.p.button }}</ion-button>
        </div>
    </ion-card>
</template>

<script setup>
import { getDate, getCookie, setCookie } from '../constants';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonCardSubtitle, IonInfiniteScrollContent, IonInfiniteScroll} from '@ionic/vue';
import { reactive } from 'vue';

const props = defineProps(['p']);

function convert(timestamp) {
    return getDate(timestamp);
}

function isDisabled (p) {
    if (getCookie("answered") == null) {
        setCookie("answered", []);
        return p.disabled;
    }
    return eval(p.disabled) || (getCookie("answered")).includes(p.id + "");
}

</script>