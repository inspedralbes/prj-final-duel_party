<template>
    <div class="explanation-box">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
            {{ description }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: '¿Cómo se juega?'
    },
    description: {
        type: String,
        default: 'Haz clic en la ruleta para que gire. Cuando se detenga, verás qué emoji ha salido. ¡Buena suerte!'
    }
})
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@keyframes pop {
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }

}

.explanation-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url('/images/fondo-inicio.png');
     
    padding: 16px 24px;
    margin: 20px auto;
    max-width: 600px;
    font-family: 'Press Start 2P', cursive;
    border: 2px solid white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.445); 
    animation: pop 0.5s ease-out;
}

.title {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #ffffff;
    text-align: center;
    
}

.description {
    font-size: 1rem;
    color: #ffffff;
    line-height: 1.6;
    text-align: center;
}
</style>
