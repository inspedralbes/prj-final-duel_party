<template>
    <main>
        <luz_verde/>
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

</script>