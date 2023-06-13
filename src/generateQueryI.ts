export interface GenerateQueryI {

    /**
     * @param {string} tableName tableName
     * @param {string} dataBaseDate Data Base Date
     * @param {Object} data xlsx to Json parsing Data
     * @returns Insert Query
     */
    createTableQ(tableName: string, data:  { [key: string]: any })
    /**
     * @param {string} tableName tableName
     * @returns Alter table PK Query
     */
    createPkQ(tableName: string)
    createInsertQ (tableName: string, dataBaseDate: string, data: Object)
}
