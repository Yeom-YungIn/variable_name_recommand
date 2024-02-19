import Generator from "../src/generator";

describe('Generator 테스트', () => {
    let generator: Generator;
    let tableName: string, data: object[];
    beforeEach(() => {
        generator = new Generator();
        tableName = 'test';
        data = [{'a': 1}]
    })

    test('createTableQ 는 정의되어 있으며 함수이다.', () => {
        expect(generator.createInsertQ).toBeDefined();
        expect(typeof generator.createTableQ).toBe('function');
    });

    test('createTableQ 의 tableName은 특수문자가 포함되면 에러를 반환한다.', async () => {
        const spiecalCharTableName = 'test&table'
        await expect(generator.createTableQ(spiecalCharTableName, data)).rejects.toThrow('Schema has special character');
    })

    test('createTableQ 의 테이블 생성 쿼리(문자열)를 반환한다.', async () => {
        const result: string = await generator.createTableQ(tableName, data);
        expect(result).toBe('public.test ( colct_no int8 NOT NULL, a varchar NULL, issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);')
    })
})