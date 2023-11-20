import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Layout from "../components/Layout"
import { useDataCollectionContext } from "../contexts/DataCollectionContext"
import { useNavigate } from "react-router-dom"
import useToast from "../contexts/ToastContext"

function Debrief() {


	const navigate = useNavigate()
	const toast = useToast()
	
	const { result, basicInfo, email } = useDataCollectionContext()

	const handleSubmit = () => {
		fetch('/api/submitResults', {
			method: 'POST',
			body: JSON.stringify({testResult: result, ...basicInfo }),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(!res.ok) {
				toast('Något gick snett.', 'error')
				return
			}
			//navigate()
		})

		if(email != 'not_provided') {
			fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({ email }),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
		}
	}

	if(result.length == 0) {
		return (
			<Layout>
				<h1>Hoppsan!</h1>
				<h2>Något verkar har gått snett.</h2>

				<Button
					color='primary'
					onClick={() => navigate('/')}
				>
					Tillbaka hem
				</Button>
			</Layout>
		)
	}

	const rows: number[][] = new Array(10).fill([]).map(() => [0, 0, 0]);

	// Invert data type for display in table.
	for (let row = 0; row < 10; row++) {
		for (let col = 0; col < 3; col++) {
			rows[row][col] = result[col].recognitionTimes[row]
		}
	}

	const errors = []

	for(let i = 0; i < 2; i++) {
		for(let j = 0; j < result[i].errors.length; j++) {
			errors.push(result[i].errors[j])
		}
	}

	return (
		<Layout>
			<h1>Granska och skicka</h1>
			<p>Nedan så visas dina resultat.</p>
			<h2> Tid från att rutnät visats och ikon klickats</h2>
			<Table aria-label="datatable">
				<TableHeader>
					<TableColumn>Testomgång</TableColumn>
					<TableColumn>Omgång 1</TableColumn>
					<TableColumn>Omgång 2</TableColumn>
				</TableHeader>

				<TableBody>
					{rows.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							<TableCell key='0'>{row[0] && row[0] + ' ms'}</TableCell>
							<TableCell key='1'>{row[1] && row[1] + ' ms'}</TableCell>
							<TableCell key='2'>{row[2] && row[2] + ' ms'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<h2>Felaktiga klickningar</h2>
			
			<Table aria-label="datatable">
				<TableHeader>
					<TableColumn>Ikon</TableColumn>
					<TableColumn>Antal felklickningar</TableColumn>
				</TableHeader>
				<TableBody>
					{errors.map(((err, index) => (
						<TableRow key={index}>
							<TableCell>{err.iconName}</TableCell>
							<TableCell style={{display: 'flex'}}>{[...Array(err.numberOfErrors)].map(_ => <p>•</p>)}</TableCell>
					</TableRow>
					)))}
				</TableBody>
			</Table>
			

			<p>
				När du klickar "Skicka resulat" samlas dina resultat in. Du kan du inte dra tillbaka din medverkan eftersom att datat ej är kopplat dig dig på något sätt.
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
