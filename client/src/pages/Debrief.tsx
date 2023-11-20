import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Layout from "../components/Layout"
import { useDataCollectionContext } from "../contexts/DataCollectionContext"

function Debrief() {

  
  
  const { result, basicInfo, email } = useDataCollectionContext()

  console.log(result)

  const handleSubmit = () => {
    // Fetch call
  }

  const rows: number[][] = new Array(10).fill([0, 0, 0])

  for(let row = 0; row<2; row++) {
    for(let col = 0; col < 9; col++) {
      rows[col][row] = result[row].recognitionTimes[col]
    }
  }

  console.log(rows)

  return (
    <Layout>
        <h1>Granska och skicka</h1>
        
        <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Testomgång</TableColumn>
        <TableColumn>Omgång 1</TableColumn>
        <TableColumn>Omgång 2</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
                <TableCell key='0'>{row[0]}</TableCell>
                <TableCell key='1'>{row[1]}</TableCell>
                <TableCell key='2'>{row[2]}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    
        <p>
          Efter du klickar "Skicka resulat" kan du inte dra tillbaka din medverkan, eftersom att datat ej är kopplat dig dig på något sätt.
        </p>
        <Button
            color='primary'
            onClick={handleSubmit}
        >
          Skicka resultat
        </Button>
        <h5>Genom att klicka på "Skicka resultat", ger du ditt samtyckte att medverka i studien.</h5>
    </Layout>
  )
}

export default Debrief
