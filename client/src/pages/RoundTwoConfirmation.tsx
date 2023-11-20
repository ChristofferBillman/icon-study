import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

interface Props {
  onContinue: () => void
}

function RoundTwoConfirmation({onContinue}: Props) {

  return (
    <Layout>
        <h1>Omgång 2 slutförd</h1>
        <p>
            Snyggt byggt! Du har slutfört den sista omgången.
        </p>
        <Button
          onClick={onContinue}
        >
          Granska & skicka resultat
        </Button>
    </Layout>
  )
}

export default RoundTwoConfirmation
