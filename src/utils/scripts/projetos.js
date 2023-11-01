let gridCardsWrapper = document.querySelector("#gridCardsWrapper");

fetch("./src/json/projetos.json").then((response) => {
    response.json().then((dados) =>{
        dados.map((dado) => {
            gridCardsWrapper.innerHTML += 
            `
            <section class="cardItem">
                    <img src="./public/img/${dado.imagens[0]}" alt="" srcset="">
                    <section class="cardItemDados">
                        <h3>${dado.name}</h3>
                        <p>${dado.descricao}</p>
                        <a href="${dado.projetoLink}" target="_blank">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </section>

            `;
            console.log(dado.imagens);
         })
    })
})