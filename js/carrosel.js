export class Carrosel{
    constructor(anterior, proximo, listaProdutos, navegacao){
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.navegacao = document.querySelector(navegacao);
        
        this.slides = this.getListaSlides();
        this.indicadores = this.getListInd();
        this.tamanho = this.getTamanhoSlide();

        this.indAtual = 0;
        this.proximo.addEventListener('click', this.proximoSlide.bind(this));
        this.anterior.addEventListener('click', this.anteriorSlide.bind(this));
        this.navegacao.addEventListener('click', this.pularParaSilde.bind(this));
        this.preparaSlides();
    }
    getListaSlides(){
        return Array.from(this.listaProdutos.children);
    }
    getListInd(){
        return Array.from(this.navegacao.children);
    }
    getTamanhoSlide(){
        return this.slides[0].getBoundingClientRect().width;
    }
    //funcao para pegar o indice atual da imagem na tela
    getSlideAtual(){
        return this.slides[this.indAtual];
    }
    getIndAtual(){
        return this.indicadores[this.indAtual];
    }
    proximoSlide(){
        let proximaPosicao = this.indAtual + 1;
        if(proximaPosicao > this.slides.length - 1){
            proximaPosicao = 0;
        }
        this.vaParaSilde(proximaPosicao);
    }
    anteriorSlide(){
        let anteriorPosicao = this.indAtual - 1;
        if(anteriorPosicao < 0){
            anteriorPosicao = this.slides.length - 1;
        }
        this.vaParaSilde(anteriorPosicao);
    }
    vaParaSilde(posicao){
        const indicadorAtual = this.getIndAtual();
        this.indAtual = posicao;
        const indicadorSelecionado = this.getIndAtual();
        this.scrollParaSlide(this.getSlideAtual());
        this.atualizaInd(indicadorAtual, indicadorSelecionado);
    }
    scrollParaSlide(slideSelecionado){
        this.listaProdutos.style.transform = 'translateX(-' + slideSelecionado.style.left + ')';
    }
    //funcao para adicionar e remover a classe dos indicadores
    atualizaInd(indicadorAtual, indicadorSelecionado){
        indicadorAtual.classList.remove('botao__indicador-ativo');
        indicadorSelecionado.classList.add('botao__indicador-ativo');
    }
    pularParaSilde(evento){
        if(evento.target === evento.currentTarget) {
            return;
        }
        const indicadorSelecionadoTarget = evento.target.getAttribute('data-indicador');
        this.vaParaSilde(parseInt(indicadorSelecionadoTarget));
    }
    preparaSlides(){
        this.slides.forEach((slide, i) => {
            slide.style.left = this.tamanho * i + 'px';
        });
    }
}