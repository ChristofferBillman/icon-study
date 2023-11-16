import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

import { useNavigate } from 'react-router-dom'

function Onboarding() {

  const navigate = useNavigate()

  return (
    <Layout>
        <h1>Vad ska jag göra, och hur?</h1>
        <p>
            Du kommer att presenteras med en text som beskriver den ikon som du så fort som möjligt skall klicka på.
            Efter 5 sekunder så försvinner texten, och ett rutnät av ikoner visas. Du skall klicka på den ikon du tror hör
            samman med texten. Detta kommer att upprepas 10 gånger. Du kommer nu att få testa detta.
        </p>
        <Button
          onClick={() => navigate('/test')}
        >
          Till träningen!
        </Button>
    </Layout>
  )
}

export default Onboarding
