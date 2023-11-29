import { Button, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import data from '../surveyresponsesREAL'
import { useCallback } from 'react';

import Statistics from 'statistics.js'
import { TestResultError } from '../types/TestResult';
import { Glyph } from '../components/Glyph';

const columns = [
    { name: "Kön", uid: "sex" },
    { name: "Ålder", uid: "age" },
    { name: "Resultat", uid: 'testResult' },
    { name: "Åtgärd", uid: 'actions' }
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
            case "actions":
                return testResultActions(result)
            default:
                return <p>{cellValue}</p>
        }
    }, [])

    const ttestResultTwoSample = ttestTwoSample(getColumn(data, 700), getColumn(data, 200))

    console.log('700: ' + JSON.stringify(getColumn(data,700)))
    console.log('200: ' + JSON.stringify(getColumn(data, 200)))

    return (
        <div style={{ padding: '100px', minHeight: '100vh', gap: '50px', display: 'flex', flexDirection: 'column' }}>
            <h1>Datadumpen</h1>
            <h2>n={data.length}</h2>

            <div>
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
                            <TableRow key={Math.round(Math.random() * 1000)}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Table aria-label="table">
                <TableHeader>
                    <TableColumn key="gsdfsdaf" align={'start'}>
                        Genomsnitt skillnad (200 - 700)
                    </TableColumn>
                    <TableColumn key="gsdfssdaf" align={'start'}>
                        Genomsnitt 200
                    </TableColumn>
                    <TableColumn key="gsdfs89daf" align={'start'}>
                        Genomsnitt 700
                    </TableColumn>

                </TableHeader>
                <TableBody items={data}>
                    <TableRow key={Math.round(Math.random() * 1000)}>
                        <TableCell>{(average(getColumn(data, 200)) - average(getColumn(data, 700))).toFixed(0)} ms</TableCell>
                        <TableCell>{Math.round(average(getColumn(data, 200)))} ms</TableCell>
                        <TableCell>{Math.round(average(getColumn(data, 700)))} ms</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div>
                <h2>T-test (two sample) skillnad reaktionstider</h2>
                <Table aria-label="table">
                    <TableHeader>
                        <TableColumn key="gsdasffff" align={'start'}>
                            T-statistika
                        </TableColumn>
                        <TableColumn key="genderwomasdfn" align={'start'}>
                            Frihetsgrader
                        </TableColumn>
                        <TableColumn key="genderodther" align={'start'}>
                            P-värde "one sided"
                        </TableColumn>
                        <TableColumn key="genderopdtout" align={'start'}>
                            P-värde "two sided"
                        </TableColumn>
                    </TableHeader>
                    <TableBody items={data}>
                        <TableRow key={Math.round(Math.random() * 1000)}>
                            <TableCell>{ttestResultTwoSample.tStatistic.toFixed(5)}</TableCell>
                            <TableCell>{ttestResultTwoSample.degreesOfFreedom}</TableCell>
                            <TableCell>{ttestResultTwoSample.pOneSided.toFixed(5)}</TableCell>
                            <TableCell>{ttestResultTwoSample.pTwoSided.toFixed(5)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                <div>
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
                            <TableRow key={Math.round(Math.random() * 1000)}>
                                <TableCell>{getRatioOfGender('man', data)}</TableCell>
                                <TableCell>{getRatioOfGender('woman', data)}</TableCell>
                                <TableCell>{getRatioOfGender('other', data)}</TableCell>
                                <TableCell>{getRatioOfGender('optout', data)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h2>Ålder</h2>
                    <Table aria-label="table">
                        <TableHeader>
                            <TableColumn key="avgage" align={'start'}>
                                Genonsnittlig ålder
                            </TableColumn>
                        </TableHeader>
                        <TableBody items={data}>
                            <TableRow key={Math.round(Math.random() * 1000)}>
                                <TableCell>{average(data.map(respondent => respondent.age))}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

function testResultsCard(result: typeof data[0]): JSX.Element {

    const weight200 = result.testResult[1].iconWeight == 200 ? result.testResult[1] : result.testResult[2]
    const weight700 = result.testResult[1].iconWeight == 700 ? result.testResult[1] : result.testResult[2]

    const didBoldFirst = result.testResult[1].iconWeight == 700

    return (
        <Card>
            <CardBody style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div>
                    <h3>Genomsnitt 200</h3>
                    {Math.round(average(weight200.recognitionTimes))} ms
                    {errorSummary(weight200.errors)}
                </div>

                <div>
                    <h3>Fel (200)</h3>
                    {errorSummary(weight200.errors)}
                </div>

                <div>
                    <h3>Genomsnitt 700</h3>
                    {Math.round(average(weight700.recognitionTimes))} ms
                </div>

                <div>
                    <h3>Fel (700)</h3>
                    {errorSummary(weight700.errors)}
                </div>

                <div>
                    <h3>Skillnad (200 - 700)</h3>
                    {Math.round(average(weight200.recognitionTimes) - average(weight700.recognitionTimes))} ms
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p>(Gjorde {didBoldFirst ? 'tjock' : 'tunn'} först)</p>
                </div>
            </CardBody>
        </Card>
    )
}

function errorSummary(errs: TestResultError[]) {
    return (
        <div>
            {errs.map(err => (
                <div>
                    <p>{err.iconName}: {err.numberOfErrors}</p>
                </div>
            ))}
        </div>
    )
}

function testResultActions(result: typeof data[0]) {
    return (
        <Button isIconOnly color='default' aria-label="Like">
            <Glyph name='delete' size={32} weight={400} color='rgb(255,50,50)'/>
        </Button>    
    )
}

const average = (array: any[]) => array.reduce((a: any, b: any) => a + b) / array.length;

function getColumn(d: typeof data, weight: number) {
    if(!(weight == 200 || weight == 700)) throw new Error('Gave non-200 or 700 value to getColumn.')
    const arr = []
    for (let i = 0; i < d.length; i++) {
        const respondent = d[i]

        const col = respondent.testResult[1].iconWeight == weight ? respondent.testResult[1].recognitionTimes : respondent.testResult[2].recognitionTimes
        arr.push(col)
    }
    return arr.flat()
}

function getRatioOfGender(gender: 'man' | 'woman' | 'other' | 'optout', d: typeof data) {
    const counts: { [key: string]: number } = {
        man: 0,
        woman: 0,
        other: 0,
        optout: 0
    }

    for (let i = 0; i < d.length; i++) {
        const participant = d[i]
        counts[participant.sex] = counts[participant.sex] + 1
    }

    console.log(counts)
    // Ratio
    return counts[gender] / (counts.man + counts.woman + counts.other + counts.optout)
}

function ttestTwoSample(thick: number[], thin: number[]) {

    const values: { thin: number, thick: number}[] = []

    thick.forEach((value, index) => values.push({thin: thin[index], thick: value}))

    const stats = new Statistics(values, {thin: 'metric', thick: 'metric' })
    return stats.studentsTTestTwoSamples('thin','thick', {dependent: true})
}

export default Analysis
