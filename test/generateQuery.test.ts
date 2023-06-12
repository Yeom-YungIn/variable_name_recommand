import { createTableQ, createPKQ, createInsertQ } from "../src/generateQuery";

test("create Table Query Test", async () => {
    const data = JSON.parse('[{"test":"a", "ttttest":""}]')
    const createTableQuery = await createTableQ("tableName", data)
    console.log(createTableQuery)
})

test("create PK Query Test", async () => {
    const createPkQ = await createPKQ("tableName")
    console.log(createPkQ)
})

test("create Insert Query Test", async () => {
    const data = JSON.parse('[{"test":"a", "ttttest":"tete"}]')
    const dataBaseDate = "20230612"
    const createInsertQuery = await createInsertQ("tableName", dataBaseDate, data)
    console.log(createInsertQuery)
})