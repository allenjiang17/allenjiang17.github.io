
<script>
import ProjectCard from './components/project_card.vue'
import Download from './components/download_button.vue'

export default {
  // component options
  // declare some reactive state here.
    components: {
        ProjectCard,
        Download
    },
    data(){
        return {
            page:"project",
            projects: {
                project1: {
                    title: "SongBook",
                    content: "Songbook is a web app for managing music sets. It provides an easy and streamlined workflow for creating sets of songs, editing and transposing chord sheets, and exporting song sheets as pdfs, word docs, and more. It features an editable database of songs, protected with user log-in and authentication, as well as Media Mode -- an interface for projecting lyrics during live band play.",
                    technologies: "Next.js React Tailwind Vercel MongoDB",
                    github_link: 'https://github.com/allenjiang17/ssm_songbook',
                    live_link: 'https://ssm-songbook.vercel.app/',
                    screenshot: "src/assets/songbook.png"
                },
                project2: {
                    title: "Chess",
                    content: "I've always loved playing chess, so I wrote a chess library (available in Python and JS) to demonstrate object-oriented programming principles and explore the game further. I've also built a basic computer player AI using the classic minimax algorithm with alpha-beta pruning. You can use the web app, built with React, to try playing the computer (black) with several levels of search depth, up to 4 as the algorithm gets prohibitively expensive.",
                    technologies: "React Tailwind Python",
                    github_link: 'https://github.com/allenjiang17/chess_react',
                    live_link:'https://allenjiang17.github.io/chess_react/',
                    screenshot: 'src/assets/chess.png'
                },
                project3: {
                    title: "Star Explorer",
                    content: "Star explorer is a 3D simulation of the night sky rendered using Three.js. You can observe the stars, planets, moon and Sun at any latitude and longitude on Earth, at any given time point. Star coordinates are referenced from the Yale Bright Star Catalog (1950), and planetary position data is obtained using the JPL Horizons API  ",
                    technologies: "Three.js React Tailwind Vercel Vite",
                    github_link: 'https://github.com/allenjiang17/star_explorer',
                    live_link:'https://star-explorer.vercel.app',
                    screenshot: 'src/assets/star_explorer.png'
                }
            }
        }
    },
    methods: {
        toggle_page(value) {
            this.page = value;

        }
    }
}
</script>

<template>
    <div id = "main_body">
    <div id="header">
        <h1> allen jiang</h1>
        <div id="links">
            <button @:click="toggle_page('project')" class="link"> projects</button>
            <button @:click="toggle_page('resume')" class="link"> resume</button>
            <button @:click="toggle_page('about')" class="link"> about me</button>
        </div>
    </div>   
    <div id="project_page" v-if="page == 'project'">    
        <!--TODO: make this better using v-for -->
        <ProjectCard :title="projects.project1.title" :content="projects.project1.content" :technologies="projects.project1.technologies" :github_link="projects.project1.github_link" :live_link="projects.project1.live_link" :screenshot="projects.project1.screenshot"/>
        <ProjectCard :title="projects.project2.title" :content="projects.project2.content" :technologies="projects.project2.technologies" :github_link="projects.project2.github_link" :live_link="projects.project2.live_link" :screenshot="projects.project2.screenshot"/>
        <ProjectCard :title="projects.project3.title" :content="projects.project3.content" :technologies="projects.project3.technologies" :github_link="projects.project3.github_link" :live_link="projects.project3.live_link" :screenshot="projects.project3.screenshot"/>

    </div>

    <div id="resume_page" v-if="page == 'resume'">        
        <img id="resume" src="src/assets/resume_allenjiang_2023.png"/>
        <Download/>
    </div>

    <div id="about_page" v-if="page == 'about'">
        <div id="about_wrapper">
        <img id="profile" src="src/assets/profile.jpg"/>
        <div>
            <div id="blurb_title">  a little bit about me</div>
            <div id="blurb">
                I'm a web developer and pastor. My training is in biomedical engineering and robotics at Johns Hopkins University.
                I enjoy making web apps for all kinds of uses in my free time, but I enjoy any and all kinds of programming. 
                I'm currently based near Baltimore, MD. In my free time, I enjoy rock climbing, tennis and hanging out with my wife and daughter.
                <br/><br/>

                You can contact me at allenjiang17@gmail.com
            </div>
        </div>
        </div>
    
    </div>



    </div>  
</template>

<!-- Learning Notes
    1. weird that the function handlers can have arguments?
-->

<style scoped>
#main_body {
    width: 80%;
    margin: auto;
    margin-top:2vh;
}
#header{
    display: flex;
    justify-content: space-between;
    margin-bottom:2vh;
}

#links {
    display:flex;
}

.link {
    padding:1vh;
    margin-right:2vh;
}
h1 {
  color: rgb(29, 93, 155);
  font-size:2.5rem;
}

#project_page{
    padding:1rem;
    max-height: 90vh;
    overflow: auto;
}

#resume_page{
    background-color:rgb(245,245,245);
    position:relative;
    max-height:90vh;
    overflow:auto;
}

#about_page{
    /*background-color:rgb(245,245,245);*/
    padding:1rem;
    max-height:90vh;
    overflow:auto;

}

#about_wrapper{
    display:flex;
}

#profile{
    height:15rem;
    margin-right:3rem;
}

#resume{
    width:80%;
    margin:auto;
}

#blurb_title{
    font-size:1.5rem;
}

</style>
