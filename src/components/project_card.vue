<script>

import Button from './button.vue'
import Title from './project_title.vue'

export default{    
    components: {Button, Title},
    props:['title', 'screenshot', 'content', 'technologies','github_link','live_link']

}

</script>

<template>
    <div id="body">
        <div id="text">
            <Title :text="title"/>
            <div id="content">{{content}}</div>
            <div id="technologies">Skills: {{technologies }}</div>
            <div class = "button">
                <Button text="View Code on Gitub" :link="github_link"/>
            </div>
            <div class = "button">
                <Button text="View Live" :link="live_link"/>
            </div>

        </div>
        <img id="screenshot" :src="screenshot"/>
    </div>

</template>

<style scoped>

#body{
    background-color:white;
    padding: 1rem;
    margin-bottom:2vh;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);


}

#screenshot{
    width:fit-content;
    height:15rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

}

#text{
    margin-right:1rem;
}
#title{
    font-size:1.3rem;
    margin-bottom: 1rem;

}

#content{
    font-size:1rem;
    margin-bottom: 1rem;

}

#technologies{
    font-size:0.9rem;
    color:rgb(60,60,60);
    margin-bottom: 1rem;

}

.button{
    display:inline-block;
    margin-right:0.5rem;
    margin-bottom:1rem;
}

@media (min-width: 900px) {

    #body{
        display:flex;
        align-items: center;

    }

    .button{
        margin-bottom:0;
    }

}

</style>
