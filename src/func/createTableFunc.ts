export const transformKeys = (sheet2Json: object[]): string[] => {
        const keys = Object.keys(sheet2Json[0]);
        return keys;
}

export function tableRegCheck(data: string[]): string[] {
        const reg: RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/;
        data.filter((key: string) => {
                if (reg.test(key)) {
                        throw new Error('Schema has special character');
                }
        });
        return data;
}

export function appendCreate(tableName: string) {
        let query = 'public.' + tableName + ' ( colct_no int8 NOT NULL, '
        return function (data: string[]) {
                data.map((key: string) => {
                        query += key.trim().replace(/ /gi, '') + ' varchar NULL, '
                })
                query += 'issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);'
                return query
        }
}