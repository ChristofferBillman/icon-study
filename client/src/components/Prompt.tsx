interface Props {
	text: string
}

export function Prompt({text}: Props) {
	return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <h1>{text}</h1>
        </div>
	)
}