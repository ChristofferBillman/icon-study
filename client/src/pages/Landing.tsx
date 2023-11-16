import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

import { useNavigate } from 'react-router-dom'

function Landing() {

  const navigate = useNavigate()
  return (
    <Layout>
        <h1>Välkommen</h1>
        <p>
            Detta är en studie vars syfte är att undersöka vare sig ikoners tjocklek påverkar hur lätt de är att känna igen.
        </p>
        <p>Studien tar ungefär 20 minuter att slutföra. Innan du börjar, se till att du sitter i en miljö fri från distraktioner.</p>
        <p>Du deltar frivilligt i denna studie.</p>
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
