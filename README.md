# XLSX_Query_Generate

# XLSX_Query_Generate

“xlsx_query_generate” provide varioust query for “xlsx” and “sequelize/postgresql”

xlsx.shee2Json's data is unsuitable for sequencing

# USAGE

```jsx
const queryGenerate = require('xlsx_query_generate');
const sequelize = require('sequelize');
const transaction = await sequelize.transaction

const GQ = new queryGenerate.GenerateQueryC()

try {
	// sheet2Json: xlsx.sheet2Json
	const createTBQ = await generateQ.createTableQ('testTable', sheet2Json)
	const createPkQuery = await GQ.createPkQ("tableName")
	const createInsertQ = await generateQ.createInsertQ('testTable', "20230616",sheet2Json)
	
  /**
	console.log(createTBQ)
	console.log(createPkQuery)
	console.log(createInsertQ)
  */

	await sequelize.query(createTBQ, transaction)
	await sequelize.query(createPkQuery, transaction)
	await sequelize.query(createInsertQ, transaction)
} catch (e) {
	return e
}

```