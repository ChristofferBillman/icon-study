import { Button } from "@nextui-org/react"
import Layout from "../components/Layout"
import useToast from "../contexts/ToastContext"

let t0: number
let t1: number

function PerformanceTest() {

	const toast = useToast()

	const startTimer = () => {
		t0 = performance.now()
	}

	const stopTimer = () => {
		t1 = performance.now()
		toast('Tog ' + (t1 - t0) + ' millisekunder.', 'info')
	}

	return (
		<Layout>
			<div style={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '1rem'
			}}>
				<Button onClick={startTimer}> Starta timer </Button>
				<Button onClick={stopTimer}> Stoppa timer </Button>
			</div>
		</Layout>
	)
}

export default PerformanceTest
