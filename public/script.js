async function carregarVideos() {
    const response = await fetch('http://localhost:3333/videos');
    const videos = await response.json();

    const container = document.getElementById('container-videos');
    container.innerHTML = '';

    videos.forEach(video => {
        container.innerHTML += `
            <div class="col-md-4"> 
    <div class="card" style="width: 18rem;">
  <img src="images/filme.jpg" width="90" height="100" class="card-img-top" alt="filme">
  <div class="card-body">
    <h5 class="card-title">${video.title}</h5>
    <p class="card-text">${video.description}</p>
    <p class="card-text -2">${video.duration}</p>
    <a href="#" class="btn btn-primary">Assistir</a>
     <button type="button" onclick="deletarVideos('${video.id}')">Eve</button>
      <button type="button" >Buda</button>
  </div>
</div>
</div>
        `;
    });
}  

    async function deletarVideos(id) {
      try{
          const response = await fetch(`http://localhost:3333/videos/${id}`, {
        method: 'DELETE'
      });
      
      if(response.ok){
        console.log('Video Deletado');
      } else{
        console.error('Erro ao deleter'); 
      }
    } catch{
      alert("Erro ao conectar com o sevidor");
    }
      }

    carregarVideos();
