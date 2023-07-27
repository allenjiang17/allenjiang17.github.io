<template>
    <div>
      <button id="download" @click="downloadFile">Download File</button>
    </div>
  </template>
  
  <script>

  import pdf_url from '../assets/resume_allenjiang_2023.pdf'

  export default {

    methods: {
      downloadFile() {
        const fileUrl = pdf_url;
  
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = fileUrl;
  
        // Set the download attribute to specify the desired filename
        link.download = 'jiang_allen_resume_2023.pdf'
  
        // Simulate a click on the link to trigger the download
        link.click();
      }
    }
  }
  </script>

  <style scoped>

    #download{
        background-color:  rgb(29, 93, 155);
        color:white;
        padding:2rem;
        padding:0.3rem;
        padding-left:0.5rem;
        padding-right:0.5rem;
        border-radius: 0.3rem;
        position: absolute;
        top:2%;
        right:12%;


    }

</style>
  