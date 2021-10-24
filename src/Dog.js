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

  async chamarApi() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const api = await fetch(url);
    const resultado = await api.json();
    if (resultado.status === 'success') {
      const fotoAnimal = resultado.message;
      this.setState({
        foto: fotoAnimal,
        carregou: true,
      });
    }
  }

  chamarNovoDog() {
    this.setState({
      carregou: false,
    });
    const tempo = 200;
    setTimeout(() => {
      this.chamarApi();
    }, tempo);
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
