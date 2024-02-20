# **XLSX_Query_Generate**

## introduction

xlsx_query_generate is a library for creating tables and storing data using the values returned by xlsx's sheet_to_json method.
This creates a postgresql query. As long as the data format is correct (like object[] in TypeScript), you can change Json data into a query.

---
# **USAGE**

```jsx
import Generator from "xlsx_query_generate/dist/generator";
const generator = new Generator()

//This is the table name to be created.
const tableName = 'xlsxQueryGenerate';

//An array of objects.
const data = [{col:'val', col2:'val2'}];

//This is the date on which the data is based.
const dataBaseDate = '20240220'

//If you want to create a table query, you can use the generator's createTableQ method.
const createTBQ = generateQ.createTableQ('xlsxQueryGenerate', data)
//If you want to query to create a table PK, you can use the generator's createPkQ method.
const createPkQuery = GQ.createPkQ("tableName")
//If you want to do a data insertion query, you can use the generator's createInsertQmethod.
const createInsertQ = generateQ.createInsertQ('testTable', "20230616", data)
```

---