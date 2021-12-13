import { useContext, useEffect, useState } from 'react'
import Card from '../components/Card'
import { VagasContext } from '../context/VagasContext'
import styles from './Vagas.module.css'
import loadingGif from "../images/loading.gif"

const Vagas = () =>{
  const {listaVagas,setListaVagas,getListVagas,loadingJobs} = useContext(VagasContext)

  useEffect(()=>{    
    getListVagas()
  },[])
  return(
    <section className={styles.vagas}>
      {loadingJobs 
      ? 
      <img className={styles.loadingGif} src={loadingGif}/> 
      :       
      <div className={`container ${styles.vagasContent}`}>
        <h1>Listagem de vagas do sistema</h1>
        <h3>{listaVagas.length} VAGAS DISPONÍVEIS</h3>
        {listaVagas.map((vaga)=>(
          <Card key={vaga.vaga.id} info={vaga}/>
        ))}
      </div>}
    </section>
  )
}

export default Vagas