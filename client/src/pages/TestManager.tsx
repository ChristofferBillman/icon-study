import TestInstance from "./TestInstance"
import TestResult from "../types/TestResult"
import { useEffect, useState } from "react"
import TestRoundConfirmation from "./TestRoundConfirmation"
import RoundTwoConfirmation from "./RoundTwoConfirmation"
import RoundOneConfirmation from "./RoundOneConfirmation copy"
import { useNavigate } from "react-router-dom"
import { useDataCollectionContext, useDataCollectionSetter } from "../contexts/DataCollectionContext"
import useToast from "../contexts/ToastContext"

function TestManager() {
    const navigate = useNavigate()
    const toast = useToast()

    const { result } = useDataCollectionContext()
    const { setResult } = useDataCollectionSetter()

    const [currentRound, setCurrentRound] = useState(0)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const [startsWithBold, setStartsWithBold] = useState(false)

    useEffect(() => {
        fetch('/api/startsWithBold', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(!res.ok) {
				toast('Något gick snett.', 'error')
                navigate('/')
				return
			}
			res.json().then(json => setStartsWithBold(json))
		})
		.catch(() => {
			toast('Något gick snett. Kontrollera din internetuppkoppling.', 'error')
            navigate('/')
		})
    }, [])

    const completeTest = [
        {grids: testSetGlyphs, prompts: testSetPrompts, weight: 500},
        {grids: set1Glyphs,    prompts: set1Prompts, weight: startsWithBold ? 700 : 200},
        {grids: set2Glyphs,    prompts: set2Prompts, weight: startsWithBold ? 200 : 700}
    ]

    const onComplete = (partResult: TestResult) => {
        setResult([...result, partResult])
        setCurrentRound(currentStep => currentStep + 1)
        setShowConfirmation(true)
    }

	if(showConfirmation) {
        switch(currentRound) {
            case 1: return <TestRoundConfirmation onContinue={() => setShowConfirmation(false)}/>
            case 2: return <RoundOneConfirmation onContinue={() => setShowConfirmation(false)}/>
            case 3: return <RoundTwoConfirmation onContinue={() => navigate('/debrief')}/>
        }
    }

    return (
        <TestInstance
            grids={completeTest[currentRound].grids}
            prompts={completeTest[currentRound].prompts}
            onComplete={onComplete}
            weight={completeTest[currentRound].weight}
        />
    )
}

export default TestManager

const set1Prompts: Array<string> = [
    'Alarmklocka',
    'Bakterie',
    'Sedlar',
    'Sax',
    'Flygplan',
    'Volleyboll',
    'Fönster',
    'Bokmärke',
    'Paket',
    'Resväska'
  ]
  
const set1Glyphs: Array<Array<[string, boolean] | [string]>> = [
    [
        ['alarm', true], ['star'], ['done'], ['news'],  ['videocam'],
        ['phone_enabled'], ['watch'], ['star'], ['close'], ['chair'],
        ['campaign'], ['rainy'], ['temple_hindu'], ['wine_bar'], ['window'],
        ['mouse'], ['attach_file'], ['package_2'], ['lock'], ['sports_basketball'],
    ], 
    [
        ['search'], ['settings'], ['favorite'], ['key'], ['face'],
        ['eco'], ['sunny'], ['diamond'], ['rocket'], ['egg'],
        ['dentistry'], ['pill'], ['microbiology', true], ['pulmonology'], ['bomb'],
        ['syringe'], ['build'], ['extension'], ['notifications'], ['edit'],
    ],
    [
        ['palette'], ['timer'], ['nature'], ['payments', true], ['shopping_cart'],
        ['shopping_bag'], ['receipt_long'], ['sell'], ['account_balance'], ['work'],
        ['public'], ['person'], ['water_drop'], ['barefoot'], ['water_bottle'],
        ['playing_cards'], ['helicopter'], ['mosque'], ['inventory_2'], ['import_contacts'],
    ],
    [
        ['phone_enabled'], ['satellite_alt'], ['photo_camera'], ['filter_alt'], ['brush'],
        ['straighten'], ['account_balance_wallet'], ['map'], ['location_on'], ['explore'],
        ['restaurant'], ['flag'], ['factory'], ['package'], ['electrical_services'],
        ['traffic'], ['pet_supplies'], ['folder'], ['cloud'], ['cut', true],
    ],
    [
        ['imagesearch_roller'], ['news'], ['book'], ['mic'], ['videocam'],
        ['music_note'], ['hearing'], ['directions_car'], ['flight', true], ['directions_bus'],
        ['train'], ['pedal_bike'], ['subway'], ['school'], ['science'],
        ['sports_esports'], ['cake'], ['biotech'], ['sports_basketball'], ['piano'],
    ],
    [
        ['badge'], ['phishing'], ['trophy'], ['water_medium'], ['cleaning'],
        ['smartphone'], ['print'], ['computer'], ['synagogue'], ['keyboard'],
        ['mouse'], ['dark_mode'], ['battery_0_bar'], ['casino'], ['icecream'],
        ['sports_volleyball', true], ['shield'], ['fitness_center'], ['cottage'], ['sports_bar'],
    ],
    [
        ['smoking_rooms'], ['carpenter'], ['ac_unit'], ['chair'], ['electric_bolt'],
        ['mode_fan'], ['thermometer'], ['kitchen'], ['window', true], ['valve'],
        ['door_front'], ['light'], ['tools_ladder'], ['thumb_up'], ['sentiment_satisfied'],
        ['rocket_launch'], ['emoji_objects'], ['coronavirus'], ['rainy'], ['cookie'],
    ],
    [
        ['potted_plant'], ['hive'], ['cloudy_snowing'], ['wind_power'], ['skull'],
        ['weight'], ['eyeglasses'], ['nutrition'], ['stethoscope'], ['calendar_month'],
        ['schedule'], ['lock'], ['bookmark', true], ['alarm'], ['hourglass_empty'],
        ['mail'], ['markunread_mailbox'], ['landscape'], ['data_table'], ['podium'],
    ],
    [
        ['traffic'], ['wine_bar'], ['sports_baseball'], ['anchor' ], ['package_2', true],
        ['headphones'], ['outlet'], ['church'], ['description'], ['attach_file'],
        ['signature'], ['ink_marker'], ['album'], ['airplay'], ['sailing'],
        ['tram'], ['campaign'], ['air'], ['sports_motorsports'], ['castle'],
    ],
    [
        ['backpack'], ['power'], ['watch'], ['router'], ['speaker'],
        ['joystick'], ['tv_remote'], ['flashlight_on'], ['local_bar'], ['luggage', true],
        ['bed'], ['outlet'], ['iron'], ['umbrella'], ['table_lamp'],
        [''], [''], [''], [''], [''],
    ],
]

const testSetPrompts: Array<string> = [
    'Lås',
    'Dörr',
    'Slott',
    'Löv',
    'TV-kontroll'
]

const testSetGlyphs: Array<Array<[string, boolean] | [string]>> = [
    [
        ['extension'], ['folder'], ['lock', true], ['mouse'],  ['phishing'],
        ['tv_remote'], ['tram'], ['music_note'], ['door_front'], ['thumb_up'],
        ['eco'], ['public'], ['helicopter'], ['ac_unit'], ['album'],
        ['filter_alt'], ['campaign'], ['castle'], ['speaker'], ['window'],
    ],
    [
        ['extension'], ['folder'], ['lock'], ['mouse'],  ['phishing'],
        ['tv_remote'], ['helicopter'], ['music_note'], ['speaker'], ['thumb_up'],
        ['eco'], ['public'], ['tram'], ['ac_unit'], ['album'],
        ['filter_alt'], ['campaign'], ['castle'], ['door_front', true], ['window'],
    ],
    [
        ['extension'], ['folder'], ['lock'], ['mouse'],  ['phishing'],
        ['tv_remote'], ['tram'], ['music_note'], ['door_front'], ['thumb_up'],
        ['eco'], ['public'], ['helicopter'], ['ac_unit'], ['album'],
        ['filter_alt'], ['campaign'], ['window'], ['speaker'], ['castle', true],
    ],
    [
        ['extension'], ['folder'], ['lock'], ['mouse'],  ['eco', true],
        ['tv_remote'], ['tram'], ['music_note'], ['door_front'], ['thumb_up'],
        ['phishing'], ['public'], ['helicopter'], ['ac_unit'], ['album'],
        ['filter_alt'], ['campaign'], ['castle'], ['speaker'], ['window'],
    ],
    [
        ['extension'], ['folder'], ['tv_remote', true], ['mouse'],  ['phishing'],
        ['lock'], ['tram'], ['music_note'], ['door_front'], ['thumb_up'],
        ['eco'], ['public'], ['helicopter'], ['ac_unit'], ['album'],
        ['filter_alt'], ['campaign'], ['castle'], ['speaker'], ['window'],
    ],
]

const set2Glyphs: Array<Array<[string, boolean] | [string]>> = [
    [
        ['alarm', true], ['star'], ['done'], ['news'],  ['videocam'],
        ['phone_enabled'], ['watch'], ['star'], ['close'], ['chair'],
        ['campaign'], ['rainy'], ['temple_hindu'], ['wine_bar'], ['window'],
        ['mouse'], ['attach_file'], ['package_2'], ['lock'], ['sports_basketball'],
    ]
]

const set2Prompts: Array<string> = [
    'Alarmklocka'
]
