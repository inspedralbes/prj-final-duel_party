<template>
    <main>
       <h1>hola</h1>
    </main>
</template>
<script setup>

import { reactive } from 'vue';
import Montaña from '../components/montaña.vue';
import Penales from '../components/penales.vue';
import luz_verde from '../components/luz_verde.vue';


const jugadores = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);


const jugadoress = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);

const jugadores2 = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);

const jugadores1 = reactive([
    { username: "diego", in: true },
    { username: "elihu", in: true },
    { username: "bryan", in: true },
    { username: "abdiel", in: true }
]);
</script>