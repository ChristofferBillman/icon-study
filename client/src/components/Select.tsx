import { ChangeEvent } from "react"

interface Option {
    name: string
    value: string
}
interface Props {
    options: Option[]
    name: string
    setValue: (arg0: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({options, name, setValue}: Props) {
	return (
        <select name={name} onChange={setValue}>
            {options.map(option => <option value={option.value}>{ option.name }</option>)}
        </select>
	)
}
