import { useContext, useEffect } from 'react'
import Card from '../components/Card'
import { VagasContext } from '../context/VagasContext'
import styles from './Vagas.module.css'

const Vagas = () =>{
  const {listaVagas,setListaVagas,listaCandidatos, setListaCandidatos} = useContext(VagasContext)
  useEffect(()=>{
    setListaVagas([
      {
        id: 0,
        DataAbertura: "2021-12-07T17:12:05.32",
        Titulo: "104175 - Desenvolvedor Java",
        Status: "Aberta",
        Cliente: "Unicred",
        Analista: null,
        Responsavel: "Taner Moroni  Correa Goncalves",
        PCD: false,
        Cidade: null,
        Estado: null,
        ListaDeCandidatos: [
          {
            id:0,
            Nome: "Lucas Cintra Garcia",
            CPF: "123.123.531-23",
            DataNascimento: "22/11/2002",
            Endereco: "Rua Fulano Siclano",
            Cargo: "Desenvolvedor React",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          }
        ]
      },
      {
        id: 1,
        DataAbertura: "2021-12-08T00:00:00",
        Titulo: "REN104218 - Gerente de Projetos",
        Status: "Aberta",
        Cliente: "Lojas Renner",
        Analista: "Luzia maria barbosa oliveira",
        Responsavel: "Anderson Gomes Donas",
        PCD: true,
        Cidade: null,
        Estado: null,
        ListaDeCandidatos: [
          {
            id:0,
            Nome: "Lucas Cintra Garcia",
            CPF: "123.123.531-23",
            DataNascimento: "22/11/2002",
            Endereco: "Rua Fulano Siclano",
            Cargo: "Desenvolvedor React",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          },
          {
            id:1,
            Nome: "Tamara Lima",
            CPF: "145.156.511-23",
            DataNascimento: "10/11/2002",
            Endereco: "Rua Fulanão Siclanão",
            Cargo: "Desenvolvedor React",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          }
        ]
      },
      {
        id: 2,
        DataAbertura: "2021-12-08T00:00:00",
        Titulo: "SIC104227 - Desenvolvedor Backend - III - Sênior",
        Status: "Aberta",
        Cliente: "Sicredi",
        Analista: "Patricia Danieli Campos",
        Responsavel: null,
        PCD: false,
        Cidade: "Porto Alegre",
        Estado: "Rio Grande do Sul",
        ListaDeCandidatos: [
          {
            id:2,
            Nome: "Bruno Zonatto",
            CPF: "953.143.511-23",
            DataNascimento: "04/02/2002",
            Endereco: "Rua Imaginária Brasil",
            Cargo: "Desenvolvedor Java",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          },
          {
            id:1,
            Nome: "Tamara Lima",
            CPF: "145.156.511-23",
            DataNascimento: "10/11/2002",
            Endereco: "Rua Fulanão Siclanão",
            Cargo: "Desenvolvedor React",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          },
          {
            id:3,
            Nome: "Camile",
            CPF: "145.105.585-23",
            DataNascimento: "05/05/2002",
            Endereco: "Rua Fictícia Fulano",
            Cargo: "Desenvolvedor Java",
            Senioridade: "Júnior",
            DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
            Curriculo: "Curriculo"
          }
        ]
      }
    ])

    setListaCandidatos([
      {
        id:0,
        Nome: "Lucas Cintra Garcia",
        CPF: "123.123.531-23",
        DataNascimento: "22/11/2002",
        Endereco: "Rua Fulano Siclano",
        Cargo: "Desenvolvedor React",
        Senioridade: "Júnior",
        DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Curriculo: "Curriculo"
      },
      {
        id:1,
        Nome: "Tamara Lima",
        CPF: "145.156.511-23",
        DataNascimento: "10/11/2002",
        Endereco: "Rua Fulanão Siclanão",
        Cargo: "Desenvolvedor React",
        Senioridade: "Júnior",
        DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Curriculo: "Curriculo"
      },
      {
        id:2,
        Nome: "Bruno Zonatto",
        CPF: "953.143.511-23",
        DataNascimento: "04/02/2002",
        Endereco: "Rua Imaginária Brasil",
        Cargo: "Desenvolvedor Java",
        Senioridade: "Júnior",
        DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Curriculo: "Curriculo"
      },
      {
        id:3,
        Nome: "Camile",
        CPF: "145.105.585-23",
        DataNascimento: "05/05/2002",
        Endereco: "Rua Fictícia Fulano",
        Cargo: "Desenvolvedor Java",
        Senioridade: "Júnior",
        DadosEscolares: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Experiencias: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis orci a sapien ultrices vehicula et sit amet lorem. Phasellus tristique sapien euismod velit cursus cursus. Integer augue tortor",
        Curriculo: "Curriculo"
      },
    ])
  },[])
  console.log(listaVagas)
  return(
    <section className={styles.vagas}>
      <div className={`container ${styles.vagasContent}`}>
        <h1>Listagem de vagas do sistema</h1>
        <h3>{listaVagas.length} VAGAS DISPONÍVEIS</h3>
        {listaVagas.map((vaga)=>(
          <Card key={vaga.id} info={vaga}/>
        ))}
      </div>
    </section>
  )
}

export default Vagas