/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import Layout from "../components/Layout"
import { useNavigate } from "react-router-dom"
import useToast from "../contexts/ToastContext"
import BasicInfo from "../types/BasicInfo"

import { Button, Input, Select, SelectItem, Checkbox, Tooltip } from '@nextui-org/react'

interface Props {
    setBasicInfo: any
    basicInfo: BasicInfo
    email: string
    setEmail: any
}

const sexes = [
    {label: 'Man', value: 'man'},
    {label: 'Kvinna', value: 'woman'},
    {label: 'Annat', value: 'other'},
    {label: 'Vill ej ange', value: 'optout'},
]

export default function BasicInfoPage({setBasicInfo, basicInfo, email, setEmail}: Props) {

    const navigate = useNavigate()
    const toast = useToast()

    const [wantsNotify, setWantsNotify] = useState(false)

    const setField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(Number.isInteger(basicInfo.age))
        setBasicInfo({
            ...basicInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        if(!(basicInfo.sex != '' && basicInfo.age != '' && basicInfo.hasNormalVision)) {
            toast('Du måste fylla i alla fält för att fortsätta.', 'error')
            return
        }

        if(wantsNotify && !email) {
            toast('Ange en giltig mejladress eller klicka ur att du vill bli notifierad.', 'error')
            return
        }

        if(!wantsNotify) {
            setEmail('')
        }
        toast('Giltigt formulär.', 'success')
        navigate('/onboarding')
    }
    
    return (
        <Layout>
            <div></div>
            <h1>Grundläggande information</h1>
            <p>Studien behöver samla in grundläggande information om dig. Du förblir anonym genom hela studien.</p>

            <Input
                label='Ålder'
                name='age'
                errorMessage={stringIsInteger(basicInfo.age) && 'Måste vara ett heltal'}
                isInvalid={stringIsInteger(basicInfo.age)}
                onChange={setField}
                isRequired={true}
            />
            
            <Select 
                label='Kön'  
                name='sex'
                isRequired={true}
                onChange={setField}
            >
                {sexes.map((sex) => (
                <SelectItem key={sex.value} value={sex.value}>
                    {sex.label}
                </SelectItem>
                ))}
            </Select>
            
            <div className='flex justify-between'>
                <Checkbox
                    isSelected={basicInfo.hasNormalVision}
                    onChange={e => {
                        setBasicInfo({
                            ...basicInfo,
                            hasNormalVision: e.target.checked
                        })
                    }}
                >
                    Min syn är normal eller korrigerad
                </Checkbox>
                <Tooltip
                    content={<>
                        <p>För att delta i studien måste du kunna se bra.</p>
                        <p>Är din syn dålig och ej korrigerad, så kan du tyvärr ej delta.</p>
                    </>}
                >
                    <b>?</b>
                </Tooltip>
            </div>

            <Checkbox isSelected={wantsNotify} onValueChange={setWantsNotify}>
                Notifiera mig när studien är klar
            </Checkbox>
            
            {wantsNotify ?
                <Input
                    label='Mejladress'
                    name='email'
                    isRequired={true}
                    description='Din mejladress kommer ej att kopplas till övrig information du angett eller dina testresultat.'
                /> :
                <div style={{height: '76px'}}/>}

            <Button
                color='primary'
                onClick={submitForm}
            >
                Starta studien
            </Button>
            
        </Layout>
    )
}

function stringIsInteger(str: string) {
    return !Number.isInteger(Number(str))
}

