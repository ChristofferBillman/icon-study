import { Button } from "../components/Button"
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
				<Button text='Starta timer' onClick={startTimer} />
				<Button text='Stoppa timer' onClick={stopTimer} />
			</div>
		</Layout>
	)
}

export default PerformanceTest
