import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

interface Props {
  onContinue: () => void
}

function TestRoundConfirmation({onContinue}: Props) {

  return (
    <Layout>
        <h1>Testomgång slutförd</h1>
        <p>
            Nu har du slutfört testomgången. Förstår du inte testet kan du köra testomgången igen genom att klicka på tillbakaknappen i din webbläsare.
        </p>
        <Button
          color='primary'
          onClick={onContinue}
        >
          Starta omgång 1
        </Button>
    </Layout>
  )
}

export default TestRoundConfirmation
