<script>

export default {
    props: ['icon','text', 'link']
}
</script>


<template>

    <div id="title"> 
        {{text}}
    </div>

</template>

<style scoped>

#title{
    color: rgb(29, 93, 155);
    width: fit-content;
    font-size:1.2rem;
}

</style>