import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import data from '../surveyresponsesREAL'
import { useCallback, useMemo } from 'react';

import Statistics from 'statistics.js'

const columns = [
    { name: "Kön", uid: "sex" },
    { name: "Ålder", uid: "age" },
    { name: "Resultat", uid: 'testResult' }
]

function Analysis() {

    const renderCell = useCallback((result: typeof data[0], columnKey: React.Key) => {
        const cellValue = result[columnKey as keyof typeof data[0]];

        switch (columnKey) {
            case "age":
                return <p>{result.age}</p>
            case "sex":
                return <p>{result.sex}</p>
            case "testResult":
                return testResultsCard(result)
            default:
                return <p>{cellValue}</p>
        }
    }, [])

    const ttestResult = ttest(diffData(data))

    return (
        <div style={{ padding: '100px', minHeight: '100vh', gap: '50px',display: 'flex', flexDirection: 'column' }}>
            <h1>Datadumpen</h1>

            <h2>Reaktionstider</h2>
            <Table aria-label="table">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={'start'}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={data}>
                    {(item) => (
                        <TableRow key={Math.round(Math.random() * 100)}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Card>
                <CardBody>
                    <div>
                        <h3>Skillnad totalt (200 - 700)</h3>
                        {Math.round(average(diffData(data)))}
                    </div>
                </CardBody>
            </Card>

            <h2>T-test skillnad reaktionstider</h2>
            <Table aria-label="table">
                <TableHeader>
                        <TableColumn key="gsdaf" align={'start'}>
                            T-statistika
                        </TableColumn>
                        <TableColumn key="genderwomasdfn" align={'start'}>
                            Frihetsgrader
                        </TableColumn>
                        <TableColumn key="genderodther" align={'start'}>
                            pOneSided
                        </TableColumn>
                        <TableColumn key="genderopdtout" align={'start'}>
                            pTwoSided
                        </TableColumn>
                </TableHeader>
                <TableBody items={data}>
                        <TableRow key={Math.round(Math.random() * 100)}>
                             <TableCell>{ttestResult.tStatistic.toFixed(3)}</TableCell>
                             <TableCell>{ttestResult.degreesOfFreedom}</TableCell>
                             <TableCell>{ttestResult.pOneSided.toFixed(3)}</TableCell>
                             <TableCell>{ttestResult.pTwoSided.toFixed(3)}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
            
            <h2>Könsfördelning</h2>
            <Table aria-label="table">
                <TableHeader>
                        <TableColumn key="genderman" align={'start'}>
                            Andel män
                        </TableColumn>
                        <TableColumn key="genderwoman" align={'start'}>
                            Andel kvinnor
                        </TableColumn>
                        <TableColumn key="genderother" align={'start'}>
                            Andel annat kön
                        </TableColumn>
                        <TableColumn key="genderoptout" align={'start'}>
                            Andel vill ej ange kön
                        </TableColumn>
                </TableHeader>
                <TableBody items={data}>
                        <TableRow key={Math.round(Math.random() * 100)}>
                             <TableCell>{getRatioOfGender('man', data)}</TableCell>
                             <TableCell>{getRatioOfGender('woman', data)}</TableCell>
                             <TableCell>{getRatioOfGender('other', data)}</TableCell>
                             <TableCell>{getRatioOfGender('optout', data)}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
            
            <h2>Ålder</h2>
            <Table aria-label="table">
                <TableHeader>
                        <TableColumn key="avgage" align={'start'}>
                            Genonsnittlig ålder
                        </TableColumn>
                </TableHeader>
                <TableBody items={data}>
                        <TableRow key={Math.round(Math.random() * 100)}>
                             <TableCell>{average(data.map(respondent => respondent.age))}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

function testResultsCard(result: typeof data[0]): JSX.Element {

    const weight200 = result.testResult[1].iconWeight == 200 ? result.testResult[1].recognitionTimes : result.testResult[2].recognitionTimes
    const weight700 = result.testResult[1].iconWeight == 700 ? result.testResult[1].recognitionTimes : result.testResult[2].recognitionTimes

    return (
        <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div>
                    <h3>Genomsnitt 200</h3>
                    {Math.round(average(weight200))} ms
                </div>

                <div>
                    <h3>Genomsnitt 700</h3>
                    {Math.round(average(weight700))} ms
                </div>

                <div>
                    <h3>Skillnad (200 - 700)</h3>
                    {Math.round(average(weight200) - average(weight700))} ms
                </div>
            </CardBody>
        </Card>
    )
}

const average = (array: any[]) => array.reduce((a: any, b: any) => a + b) / array.length;

/**
 * 
 * @param d The entire dataset
 * @returns The difference between all observations of the test with weight 200 and weight 700 (200 - 700).
 */
function diffData(d: typeof data) {

    const allDiffs = []

    for(let i = 0; i < d.length; i++) {
        const respondent = d[i]

        const weight200 = respondent.testResult[1].iconWeight == 200 ? respondent.testResult[1].recognitionTimes : respondent.testResult[2].recognitionTimes
        const weight700 = respondent.testResult[1].iconWeight == 700 ? respondent.testResult[1].recognitionTimes : respondent.testResult[2].recognitionTimes

        const diff = substractvector(weight200, weight700)
        allDiffs.push(diff)
    }

    return allDiffs.flat()
}

function substractvector(vector1: number[], vector2: number[]) {
    if(vector1.length != vector2.length) throw new Error('Vectors are not the same length. Cannot subtract.')

    return vector1.map((e,i) => e - vector2[i])
}

function getRatioOfGender(gender: 'man' | 'woman'  | 'other'  | 'optout', d: typeof data) {
   const counts: {[key: string]: number} = {
    man: 0,
    woman: 0,
    other: 0,
    optout: 0
   }

   for(let i = 0; i < d.length; i++) {
        const participant = d[i]
        counts[participant.sex] = counts[participant.sex] + 1
   }

   console.log(counts)
   // Ratio
   return counts[gender] / (counts.man + counts.woman + counts.other + counts.optout)
}

function ttest(column: number[]) {

    const values: {time: number}[] = column.map(time => {return {time}})

    const stats = new Statistics(values, {time: 'metric'})
    return stats.studentsTTestOneSample('time', 0)
}

export default Analysis
