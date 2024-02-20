import {
    transformKeys,
    specialCharRegCheck,
    appendTblCreate,
    appendKeysInsert,
    appendValuesInsert
} from "./functions/functions";
import {pipe} from "./functions/pipe";
import {GeneratorI} from "./generatorI";

export class Generator implements GeneratorI{

    /**
     * @param {string} tableName tableName
     * @param {Object[]} data data xlsx to Json parsing Data
     * @return {string} Create Table DDL
     */
    createTableQ(tableName: string, data: object[]): string {
        try {
            specialCharRegCheck([tableName])
            return pipe(transformKeys, specialCharRegCheck, appendTblCreate(tableName))(data)
        }catch (e) {
            throw e;
        }
    };

    /**
     * @param {string} tableName tableName
     * @returns Alter table PK QUERY
     */
    createPkQ(tableName: string ): string {
        specialCharRegCheck([tableName]);
        return `ALTER TABLE public.${tableName} ADD CONSTRAINT ${tableName}_pk PRIMARY KEY (colct_no, data_base_date)`;
    }

    /**
     * @param {string} tableName tableName
     * @param {string} dataBaseDate Data Base Date
     * @param {Object} data xlsx to Json parsing Data
     * @returns INSERT QUERY
     */
    createInsertQ(tableName: string, dataBaseDate: string, data: any): string {
        specialCharRegCheck([tableName]);
        const insertCol: string = pipe(transformKeys, appendKeysInsert(tableName))(data);
        const insertVal: string = appendValuesInsert(data, dataBaseDate);
        return insertCol + insertVal;
    }
}

export default Generator;