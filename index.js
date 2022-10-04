const divLoja = document.querySelector(".roupas")
const spanBadge = document.querySelector("span.position-absolute")

const myModal = new bootstrap.Modal(document.getElementById('carrinhoModal'))

const btnCarrinho = document.querySelector("#btCarrinho")
const btnFinalizar = document.querySelector("#btFinalizar")

const tabRoupa = document.querySelector("#tbroupa")

let itemsComprados
let roupas

const carregaLoja= async () => {

    const dados = await axios.get("https://dode2511.github.io/disp-moveis/trab/roupas")


  
   roupas = dados.data

  let resp = ""

  for (const roupa of roupas) {
    resp +=
      `
    <div class="col-6 col-sm-4 col-md-3">
      <div class="card mt-3">
      <img src="${roupa.foto}" class="card-img-top" alt="roupa">
        <div class="card-body">
          <h5 class="card-title">${roupa.id} - ${roupa.nome}</h5>
          <p class="card-text">${roupa.cor}</p>
          <p class="card-text">R$: 
${roupa.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
          <button class="btn btn-primary btAdicionar">Comprar</button>
        </div>
      </div>    
    </div>  
    `
  }

  divLoja.innerHTML = resp

  itemsComprados = localStorage.getItem("roupas") ?
    localStorage.getItem("roupas").split(";") : []

  spanBadge.innerText = itemsComprados.length
}

window.addEventListener("load", carregaLoja)

divLoja.addEventListener("click", e => {
  if (e.target.classList.contains("btAdicionar")) {
 
    const div = e.target.parentElement
    
    const tagH5 = div.querySelector("h5")

    const idNome = tagH5.innerText
    

    const partes = idNome.split("-")

    const id = partes[0]

    itemsComprados.push(id)

    spanBadge.innerText = itemsComprados.length

    localStorage.setItem("roupas", itemsComprados.join(";"))



  }
})

btnCarrinho.addEventListener("click", () => {
  myModal.show()

  
  for (let i = tabRoupa.rows.length - 1; i >= 1; i--) {
    tabRoupa.deleteRow(i)
  }

  let total = 0

  for (const item of itemsComprados) {


    const roupa = roupas.filter(aux => aux.id == item)[0]

  
    const linha = tabRoupa.insertRow(-1)

    
    const col1 = linha.insertCell(0)
    const col2 = linha.insertCell(1)
    const col3 = linha.insertCell(2)

   
    col1.innerHTML = `<img src="${roupa.foto}" alt="${roupa.nome}" width="80">`
    col2.innerText = roupa.nome
    col3.innerText = roupa.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })
    col3.classList.add("text-end")

    total = total + roupa.preco
  }

  const linha = tabRoupa.insertRow(-1)

  const col1 = linha.insertCell(0)
  const col2 = linha.insertCell(1)
  const col3 = linha.insertCell(2)


  col2.innerText = "Total R$: "
  col3.innerText = total.toLocaleString("pt-br", { minimumFractionDigits: 2 })

  col2.classList.add("text-end")
  col3.classList.add("text-end")
})

btnFinalizar.addEventListener("click", () => {
 
  myModal.hide()

  localStorage.removeItem("roupas")

  // exibe mensagem
  alert("Obrigado! Seu pedido foi realizado com sucesso")

  
  carregaLoja()
})