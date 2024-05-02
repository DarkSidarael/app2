fetch('js/backend.json')
.then(response => response.json())
.then(data=> {
    //SALVAR OS DADOS VINDOS DO BACK-END LOCALMENTE
    //VAMOS UTILIZAR LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');

    
    setTimeout(() =>{

        //ESVAZIAR A ÁREA DE PRODUTOS
    $("#produtos").empty();


        data.forEach(produto =>{
            var produtoHTML = `
            <div class="item-card">
            <a data-id="${produto.id}" href="" class="item">
                    <div class="img-container">
                        <img src="${produto.imagem}">
                    </div>
                    <div class="nome-rating">
                        <span class="color-gray">${produto.nome}</span>
                        <span class="bold margin-right">
                             <i class="mdi mdi-star"></i>
                            ${produto.rating}
                        </span>
                    </div>
                    <div class="price"> R$ ${produto.preco_promocional.toLocaleString('pt-BR', {Style: 'currency', currency:'BRL'})}</div>
                    
                </a>
            </div>
            `;
    
            $("#produtos").append(produtoHTML);
    
        });

        $(".item").on('click', function () {
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        });

    }, 1500);

    

})
.catch(error => console.error('Erro ao fazer fetch dos dados: '+error))

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    $('.btn-cart').attr('data-count', carrinho.length );

}, 300);