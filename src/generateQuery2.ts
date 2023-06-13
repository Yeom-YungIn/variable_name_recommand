const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g
const reg_space = / /gi
const rex_empt = /__empty/
const rex_empt2 = /__empty_[0-9]/

// interface data {
//     tableName: string,
//     dataBaseDate?: string,
//     data: Object
// }


/**
 * @param {string} tableName tableName
 * @param {Object} data data xlsx to Json parsing Data
 * @returns Create Table DDL
 */
async function createTableQ(tableName: string, data:  { [key: string]: any }){
    if (reg.test(tableName) === true) {
        console.log('테이블명 특수문자 포함')
        return 0
    }

    let query = 'CREATE TABLE '
    query += 'public.' + tableName + ' ('
    query += 'colct_no int8 NOT NULL,'

    // append keys
    for (const key in Object.keys(data[0])) {
        const col = Object.keys(data[0])[key]
        if (reg.test(col) === true) {
            console.log('컬럼 특수문자 포함')
            return 0
        } else if (rex_empt.test(col) || rex_empt2.test(col)) {
            console.log(col)
        } else {
            query += col.trim().replace(reg_space, '') + ` varchar NULL,`
        }
    }
    query += 'issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);'
    return query
}

/**
 * @param {string} tableName tableName
 * @returns Alter table PK Query
 */
async function createPKQ (tableName: string) {
    const query = `ALTER TABLE public.${tableName} ADD CONSTRAINT ${tableName}_pk PRIMARY KEY (colct_no, data_base_date)`
    return query
}

/**
 * @param {string} tableName tableName
 * @param {string} dataBaseDate Data Base Date
 * @param {Object} data xlsx to Json parsing Data
 * @returns Insert Query
 */
async function createInsertQ (tableName: string, dataBaseDate: string, data: Object) {
    let arr: string[] = new Array;
    console.log('```````````' + arr)
    if (reg.test(tableName) === true) {
        console.log('테이블명 특수문자 포함')
        return 0
    }
    let query: string = `insert into public.`
    query += tableName
    query += ' ('
    query += 'colct_no,'
    // append keys
    for (const key in Object.keys(data[0])) {
        const col = Object.keys(data[0])[key]
        if (reg.test(col) === true) {
            console.log('컬럼 특수문자 포함')
            return 0
        } else if (rex_empt.test(col) || rex_empt2.test(col)) {
            arr.push(key)
            console.log(col)
        } else {
            query += col.trim().replace(/ /gi, '')
            query += `,`
        }
    }
    query += 'data_base_date'
    query += ')'
    // append values
    let i = 0
    query += (' values ')
    for (const item in data) {
        query += (`(${i},`)
        i += 1
        let j = 0
        for (const keys in data[item]) {
            if (arr.includes(j.toString())) {
                console.log(keys + ' ' + arr.includes(j.toString()))
            } else {
                if (data[item][keys] === null) {
                    query += (`'',`)
                } else if (reg_space.test(data[item][keys])) {
                    query += (`'`)
                    query += (data[item][keys].replace(/'/gi, ''))
                    query += (`',`)
                } else {
                    query += (`'`)
                    query += (data[item][keys])
                    query += (`',`)
                }
            }
            j += 1
        }
        query += `'` + dataBaseDate + `'`
        if (parseInt(item) < Object.keys(data).length - 1) {
            query += ('),')
        } else {
            query += (')')
        }
    }
    return query
}

export {
    createTableQ,
    createPKQ,
    createInsertQ
}