export default interface BasicInfo {
    screenResolution: {h: number, w: number,}
    age: string
    sex: string
    hasNormalVision: boolean
}

export const initialBasicInfo: BasicInfo = {
    screenResolution: {h: 0, w: 0},
    age: '',
    sex: '',
    hasNormalVision: false
}