
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
     <button type="button" class="btn btn-primary" onclick="deletarVideos('${video.id}')">Excluir</button>
     <button type="button" class="btn btn-primary" onclick="atualizar('${video.id}')">Atualizar</button>
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
        carregarVideos();
      } else{
        console.error('Erro ao deleter'); 
      }
    } catch (error) { 
    console.error('Erro:', error);
    alert("Erro ao conectar com o servidor");
}
      }

      async function atualizar(id){
        const novoTitulo = prompt("Novo Titulo: ");
        const novaDescricao = prompt("Nova descrição: ");
        const novaDuracao = Number(prompt("Nova duração: "));

        const dadosAtualizados = {
          title: novoTitulo,
          description: novaDescricao,
          duration: novaDuracao
        }

        try{
          const response = await fetch(`http://localhost:3333/videos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados) //Transforma o objeto em texto JSON
          });

          if(response.ok){
            console.log('Video atualizado com sucesso');
            carregarVideos();
          } else{
            console.log('Erro ao atualizar');
            alert('Erro ao atualizar o video')
          }
        } catch{
          console.error('Erro:', error);
          
          alert("Erro ao conectar com o servidor")
        }
      }
       
carregarVideos();
window.deletarVideos = deletarVideos;
window.atualizar = atualizar;