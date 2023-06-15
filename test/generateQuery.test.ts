const xlsx = require('xlsx')
const file = "C:\\300.DEV\\DEV\\npm\\test\\xlsx_to_query_testFIle.xlsx"
import { GenerateQueryC } from "../src/generateQueryC";


test("create Insert Query Test", async () => {
    const workbook = xlsx.readFile(file, Uint8Array)
    const sheetName = workbook.SheetNames[0]
    const sheet2Json = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {defval: null, range: 0})
    const generateQ = new GenerateQueryC()
    const createTBQ = await generateQ.createTableQ('testTable', sheet2Json)
    console.log(createTBQ)
})