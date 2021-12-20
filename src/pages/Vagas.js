import { useContext, useEffect, useState } from 'react'
import Card from '../components/Card'
import { VagasContext } from '../context/VagasContext'
import styles from './Vagas.module.css'
import loadingGif from "../images/loading.gif"

const Vagas = () =>{
  const {listaVagas,setListaVagas,getListVagas,loadingJobs,vagaPages,loadNewPage,pagesLoaded,setPagesLoaded} = useContext(VagasContext)
  
  useEffect(()=>{    
    getListVagas()
    setPagesLoaded(0)
  },[])
  return(
    <section className={styles.vagas}>
      <div className={styles.fundoDBC}>
        <h1 className={styles.bemvindo}>Controle de Currículo - CV</h1>
      </div>
      {loadingJobs 
      ? 
      <img className={styles.loadingGif} src={loadingGif}/> 
      :       
      <div className={`container ${styles.vagasContent}`}>
        <h1>Listagem de vagas do sistema</h1>
        <h3>{listaVagas.length} VAGAS CARREGADAS</h3>
        {listaVagas.map((vaga)=>(
          <Card key={vaga.vaga.id} info={vaga}/>
        ))}
        {pagesLoaded != vagaPages-1 && <button className={styles.loadMore} onClick={()=>{
        loadNewPage(pagesLoaded)
        setPagesLoaded(pagesLoaded+1)
      }}>Carregar Mais</button>}
      </div>}
    </section>
  )
}

export default Vagas