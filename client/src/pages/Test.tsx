import { useNavigate } from 'react-router-dom'
import { GlyphGrid } from "../components/GlyphGrid"
import { Glyph } from "../components/Glyph"
import { useState } from 'react'
import useToast from '../contexts/ToastContext'

const glyphs = [
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>,
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>,
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>
]

const set1glyphs: Array<Array<[string, boolean] | [string]>> = [
  [
    ['star', true], ['star'], ['done'], ['star'],  ['star'],
    ['star'], ['done'], ['star'], ['close'], ['done'],
    ['done'], ['close'], ['star'], ['done'], ['close'],
    ['done'], ['close'], ['star'], ['done'], ['close'],
  ], 
  [
    ['search'], ['settings'], ['favorite'], ['key'], ['face'],
    ['eco'], ['sunny'], ['diamond'], ['rocket'], ['egg'],
    ['dentistry'], ['pill'], ['microbiology'], ['pulmonology'], ['bomb'],
    ['syringe'], ['build'], ['extension'], ['notifications'], ['edit'],
  ],
  [
    ['palette'], ['timer'], ['nature'], ['payments'], ['shopping_cart'],
    ['shopping_bag'], ['receipt_long'], ['sell'], ['account_balance'], ['work'],
    ['public'], ['person'], ['water_drop'], ['barefoot'], ['water_bottle'],
    ['playing_cards'], ['helicopter'], ['anchor'], ['inventory_2'], ['import_contacts'],
  ],
  [
    ['phone_enabled'], ['satellite_alt'], ['photo_camera'], ['filter_alt'], ['brush'],
    ['straighten'], ['account_balance_wallet'], ['map'], ['location_on'], ['explore'],
    ['restaurant'], ['flag'], ['factory'], ['package'], ['electrical_services'],
    ['traffic'], ['pet_supplies'], ['folder'], ['cloud'], ['cut'],
  ],
  [
    ['imagesearch_roller'], ['news'], ['book'], ['mic'], ['videocam'],
    ['music_note'], ['hearing'], ['directions_car'], ['flight'], ['directions_bus'],
    ['train'], ['pedal_bike'], ['subway'], ['school'], ['science'],
    ['sports_esports'], ['cake'], ['biotech'], ['sports_basketball'], ['piano'],
  ],
  [
    ['sports_volleyball'], ['phishing'], ['trophy'], ['water_medium'], ['cleaning'],
    ['smartphone'], ['print'], ['computer'], ['headphones'], ['keyboard'],
    ['mouse'], ['dark_mode'], ['battery_0_bar'], ['casino'], ['icecream'],
    ['badge'], ['shield'], ['fitness_center'], ['cottage'], ['sports_bar'],
  ],
  [
    ['smoking_rooms'], ['carpenter'], ['ac_unit'], ['chair'], ['electric_bolt'],
    ['mode_fan'], ['thermometer'], ['kitchen'], ['window'], ['valve'],
    ['door_front'], ['light'], ['tools_ladder'], ['thumb_up'], ['sentiment_satisfied'],
    ['rocket_launch'], ['emoji_objects'], ['coronavirus'], ['rainy'], ['cookie'],
  ],
  [
    ['potted_plant'], ['hive'], ['cloudy_snowing'], ['wind_power'], ['skull'],
    ['weight'], ['eyeglasses'], ['nutrition'], ['stethoscope'], ['calendar_month'],
    ['schedule'], ['lock'], ['bookmark'], ['alarm'], ['hourglass_empty'],
    ['mail'], ['markunread_mailbox'], ['landscape'], ['data_table'], ['podium'],
  ],
  [
    ['traffic'], ['wine_bar'], ['castle'], ['mosque'], ['church'],
    ['synagogue'], ['temple_hindu'], ['package_2'], ['description'], ['attach_file'],
    ['signature'], ['ink_marker'], ['album'], ['airplay'], ['sailing'],
    ['tram'], ['campaign'], ['air'], ['sports_motorsports'], ['sports_baseball'],
  ],
  [
    ['backpack'], ['power'], ['watch'], ['router'], ['speaker'],
    ['joystick'], ['tv_remote'], ['flashlight_on'], ['local_bar'], ['luggage'],
    ['bed'], ['outlet'], ['iron'], ['umbrella'], ['table_lamp'],
    [''], [''], [''], [''], [''],
  ],
]



function Test() {

  const navigate = useNavigate()
  const toast = useToast()

  const [currentStep, setCurrentStep] = useState(8)

  const handleChangeGrid = () => {
    setCurrentStep(currentStep => (currentStep + 1) % 9)
  }

  return (
    <div style={{
        width: '100vw',
        height: '100vh',
    }}
    onClick={handleChangeGrid}
    >
        <GlyphGrid
          glyphnames={set1glyphs[currentStep]}
          onCorrectPress={() => {toast("you pressed the right one!", 'success')}}
          cols={5}
          rows={4}
        />
    </div>
  )
}

export default Test
