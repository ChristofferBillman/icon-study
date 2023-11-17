import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"

interface Props {
  onContinue: () => void
}

function RoundOneConfirmation({onContinue}: Props) {

  return (
    <Layout>
        <h1>Omgång 1 slutförd</h1>
        <p>
            Halvvägs klar! Du kommer nu få utföra samma test igen fast med en annorlunda ikontjocklek.
        </p>
        <Button
          onClick={onContinue}
        >
          Starta omgång 2
        </Button>
    </Layout>
  )
}

export default RoundOneConfirmation
