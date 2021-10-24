import React from 'react';

class Dog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foto: '',
      carregou: false,
    };

    this.chamarApi = this.chamarApi.bind(this);
    this.chamarNovoDog = this.chamarNovoDog.bind(this);
  }

  componentDidMount() {
    this.chamarApi();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const http = nextState.foto;
    const numero = http.indexOf('terrier');
    const IdentificaQueNãoExisteAPalavra = -1;
    if (numero === IdentificaQueNãoExisteAPalavra) {
      localStorage.setItem('foto', http);
      return true;
    }
    const imagem = localStorage.getItem('foto');
    this.setState({
      foto: imagem,
    });
    return false;
  }

  componentDidUpdate() {
  }

  async chamarApi() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const api = await fetch(url);
    const resultado = await api.json();
    if (resultado.status === 'success') {
      const fotoAnimal = resultado.message;
      this.verificaRaça(fotoAnimal);
      this.setState({
        foto: fotoAnimal,
        carregou: true,
      });
    }
  }

  verificaRaça(fotoAnimal) {
    const separarNomeDaHttp = fotoAnimal.split('/');
    global.alert(separarNomeDaHttp[4]);
  }

  chamarNovoDog() {
    this.setState({
      carregou: false,
    });
    this.chamarApi();
  }

  render() {
    const { foto, carregou } = this.state;
    if (carregou === false) {
      return (
        <p>Loading...</p>
      );
    }
    return (
      <div>
        <img src={ foto } alt="foto de animal" />
        <button type="submit" onClick={ this.chamarNovoDog }>Novo Dog</button>
      </div>
    );
  }
}

export default Dog;
