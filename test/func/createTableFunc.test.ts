import {transformKeys, tableRegCheck, appendCreate} from "../../src/func/createTableFunc";
import {normalDataObject, normalDataArr, keyHasSpecialCharArr} from '../test.data';


describe('createTableFunctions 테스트', () => {

    describe('transformKeys 테스트', () => {
        test('transformKeys 는 함수여야 한다. ', () => {
            expect(typeof transformKeys).toBe('function');
        })

        test('transformKeys 는 key 로 구성된 배열을 반환한다.', () => {
            expect(transformKeys(normalDataObject)).toEqual(normalDataArr);
        })
    })

    describe("tableRegCheck 테스트", () => {
        let arrHasSpecialCharacter: string[];
        beforeEach(() => {
            arrHasSpecialCharacter = keyHasSpecialCharArr;
        });

        test('defaultReg는 특수문자를 포함하지 않은 헤더행이면, 헤더행을 배열로 반환한다.', () => {
            expect(typeof tableRegCheck).toBe('function');
            expect(tableRegCheck(normalDataArr)).toEqual(normalDataArr);
        })

        test("defaultReg 는 특수문자를 포함한 , 에러를 throw 한다.", () => {
            expect(() => tableRegCheck(arrHasSpecialCharacter)).toThrowError('Schema has special character');
        })
    })

    describe("appendCreate 테스트", () => {
        let tableName: string, arr: string[];

        beforeEach(() => {
            tableName = 'sample';
            arr = normalDataArr
        })

        test('appendCreate 는 함수를 반환한다.', () => {
            expect(typeof appendCreate).toBe('function');
            expect(typeof appendCreate(tableName)).toBe('function');
        })

        test('appendCreate() 는 문자열를 반환한다.', () => {
            expect(typeof appendCreate(tableName)(arr)).toBe('string');
            expect(appendCreate(tableName)(arr)).toEqual('public.sample ( colct_no int8 NOT NULL, 연번 varchar NULL, 시설명 varchar NULL, 소재지 varchar NULL, 정원 varchar NULL, 운영주체 varchar NULL, issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);')
        })


    })
})