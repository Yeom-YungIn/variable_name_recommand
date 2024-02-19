import {appendCreate, transformKeys, tableRegCheck} from "./func/createTableFunc";
import {pipe} from "./func/pipe";
import {GenerateQueryI} from "./generateQueryI";

//임시_TBD
const reg: RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g
const reg_space: RegExp = / /gi
const rex_empt: RegExp = /__empty/
const rex_empt2: RegExp = /__empty_[0-9]/

export class GenerateQueryC implements GenerateQueryI{

    /**
     * @param {string} tableName tableName
     * @param {Object[]} data data xlsx to Json parsing Data
     * @return {string} Create Table DDL
     */
    async createTableQ(tableName: string, data: object[]): Promise<string> {
        try {
            tableRegCheck([tableName])
            return pipe(transformKeys, tableRegCheck, appendCreate(tableName))(data)
        }catch (e) {
            throw e;
        }
    };

    /**
     * @param {string} tableName tableName
     * @returns Alter table PK QUERY
     */
    createPkQ(tableName: string ): string {
        return `ALTER TABLE public.${tableName} ADD CONSTRAINT ${tableName}_pk PRIMARY KEY (colct_no, data_base_date)`;
    }

    /**
     * @param {string} tableName tableName
     * @param {string} dataBaseDate Data Base Date
     * @param {Object} data xlsx to Json parsing Data
     * @returns INSERT QUERY
     */
    async createInsertQ(tableName: string, dataBaseDate: string, data: any): Promise<string> {
        let arr: string[] = [];
        if (reg.test(tableName) === true) {
            return "테이블명 특수문자 포함"
        }
        let query: string = `insert into public.`
        query += tableName
        query += ' ('
        query += 'colct_no,'
        // append keys
        for (const key in Object.keys(data[0])) {
            const col: string = Object.keys(data[0])[key]
            if (reg.test(col) === true) {
                console.log('컬럼 특수문자 포함')
                return "컬럼 특수문자 포함"
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
        let i: number = 0
        query += (' values ')
        for (const item in data) {
            query += (`(${i},`)
            i += 1
            let j: number = 0
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
}

export default Generator;