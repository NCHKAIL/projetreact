import { useState } from 'react'

import './App.css'

function Compteur() {
  const [Compteur, setCompteur] = useState(0);


  return (
    <>
      <section id="center">

        <button
          type="button"
          className="counter"
      // onClick={function (){setCompteur( function (compteur){ return compteur+1});}}

      onClick={ ()=> setCompteur(Compteur=>Compteur+1)}        >
    incrémenter

    {console.log(Compteur)}
        </button>
          <button
          type="button"
          className="counter"
          // onClick={function (){setCompteur( function (compteur){ return compteur-1});}}
          
          onClick={ ()=> setCompteur(Compteur=>Compteur-1)}   
        >
            décrémenter
        </button>
        {Compteur}
      </section>


      
  
    </>
  )
}

export default Compteur
