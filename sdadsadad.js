const roupasDiv= document.querySelector(".roupas")
const spanBadge = document.querySelector("span.position-absolute")

let compradors = []

const carregarRoupas = async () => {

    const dados = await axios.get("https://dode2511.github.io/disp-moveis/trab/roupas")


    const roupas= dados.data
  
    let resp = ""
  
    for (const roupa of roupas) {
      resp += 
      `
      <div class="col-6 col-sm-4 col-md-3">
        <div class="card">
        <img src="${roupa.foto}" class="card-img-top" alt="roupas">
          <div class="card-body">
            <h5 class="card-title">${roupa.id} - ${roupa.nome}</h5>
            <p class="card-text">${roupa.cor}</p>
            <p class="card-text">R$: 
  ${roupa.preco.toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
            <button class="btn btn-primary btAdicionar">Comprar</button>
          </div>
        </div>    
      </div>  
      `
    }
  
    roupasDiv.innerHTML = resp
  
    itemsComprados = localStorage.getItem("lanches") ?
       localStorage.getItem("lanches").split(";") : []
  
    spanBadge.innerText = itemsComprados.length      
  }
  
  window.addEventListener("load", carregarRoupas)
  
  roupasDiv.addEventListener("click", e => {
    if (e.target.classList.contains("btAdicionar")) {
     
      const div = e.target.parentElement

      const tagH5 = div.querySelector("h5")
  
      const idNome = tagH5.innerText

      
      const partes = idNome.split("-") 
  
      const id = partes[0]
  
      itemsComprados.push(id)
      
      spanBadge.innerText = itemsComprados.length
  
      localStorage.setItem("lanches", itemsComprados.join(";"))
    }
  })
  