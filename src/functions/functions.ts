export function transformKeys (sheet2Json: object[]): string[] {
        const keys = Object.keys(sheet2Json[0]);
        return keys;
}

export function specialCharRegCheck(data: string[]): string[] {
        const reg: RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/;
        data.filter((key: string) => {
                if (reg.test(key)) {
                        throw new Error('Schema has special character');
                }
        });
        return data;
}

export function appendTblCreate(tableName: string):(data: string[]) => string {
        let query: string = `create table public.` + tableName + ` ( colct_no int8 NOT NULL, `
        return function (data: string[]): string {
                data.map((key: string) => {
                        query += key.trim().replace(/ /gi, '') + ' varchar NULL, '
                })
                query += 'issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);'
                return query
        }
}



export function appendKeysInsert(tableName: string): (keys: string[]) => string {
        let query: string = `insert into public.` + tableName;
        query += ' (';
        query += 'colct_no,';

        return function (keys: string[]): string {
                keys.map((key: string) : void=> {
                        query += key.trim().replace(/ /gi, '')
                        query += ','
                })
                query += 'data_base_date)'
                return query;
        }
}

export function appendValuesInsert(data: object[], dataBaseDate: string) {
        let query = ` values `
        data.map((obj: object, index: number) => {
                let val = Object.values(obj)
                query += `(`
                query += `${index}`
                query += `,`
                val.map((x, index) => {
                        query += `'${x.toString().trim().replace(/'/gi, '')}'`
                        if (index !== val.length - 1) query += `,`;
                        else query += `, ${dataBaseDate}`
                })
                if(index !== data.length - 1) query += `),`
                else query += `);`
        })
        return query;

}