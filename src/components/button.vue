<script>

export default {
    props: ['icon','text', 'link']
}
</script>


<template>
    <a :href="link">
    <button id="button">
        <div id="container">
            <img id="icon" :src="icon"/>
            {{text}}
        </div>
    </button>
    </a>
    

</template>

<style scoped>

#button{
    background-color: darkgray;
    border-radius: 0.5rem;
    padding:0.3rem;
    padding-left:0.5rem;
    padding-right:0.5rem;
    font-size:0.8rem;
    color: white;
}

#button:hover{
    background-color: gray;


}

#container{
    display:flex;
    
}
#icon{
    display:inline-block;
    width:1rem;
    filter:invert();
    margin-right:0.3rem;
}

</style>