import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

import { useNavigate } from 'react-router-dom'

function Landing() {

  const navigate = useNavigate()

  return (
    <Layout>
        <h1>Välkommen</h1>
        <p>
            Detta är en studie vars syfte är att undersöka vare sig ikoners tjocklek påverkar hur lätt de är att känna igen. Studien görs som del av kursen aktuell utveckling inom interaktionsteknik och design. Resultaten av studien kommer att redovisas som en skriftlig vetenskaplig rapport. Finns det några frågor, mejla christoffer.billman@gmail.com.
        </p>
        <h2>Praktisk information</h2>
        <p>Studien tar ungefär 20 minuter att slutföra. Innan du börjar, se till att du gör testet vid en dator (ej mobil enhet) och i en miljö fri från distraktioner.</p>

        <h2>Datahantering</h2>
        <p>Ingen insamlad data kommer att kunna kopplas till dig personligen, d.v.s. du förblir anonym. Efter att studien slutförts så kommer insamlad data som ej finns med i den skriftliga rapporten att raderas.</p>

        <h2>Frivillighet</h2>
        <p>Du deltar frivilligt i denna studie. Ångrar du dig under tiden du gör testet, så kan du när som helst stänga ned hemsidan utan att några uppgifter/data samlas in.</p>
        <Button
          color='primary'
          onClick={() => navigate('/collectBasicInfo')}
        >
          Jag förstår, ta mig vidare
        </Button>
    </Layout>
  )
}

export default Landing
