import {
    transformKeys,
    specialCharRegCheck,
    appendTblCreate,
    appendKeysInsert,
    appendValuesInsert
} from "../../src/functions/functions";
import {normalDataObject, normalDataArr, keyHasSpecialCharArr} from '../test.data';
import {pipe} from "../../src/functions/pipe";

describe('createTableFunctions 테스트', () => {

    describe('transformKeys 테스트', () => {
        test('transformKeys 는 함수여야 한다. ', () => {
            expect(typeof transformKeys).toBe('function');
        })

        test('transformKeys 는 key 로 구성된 배열을 반환한다.', () => {
            expect(transformKeys(normalDataObject)).toEqual(normalDataArr);
        })
    })

    describe("specialCharRegCheck 테스트", () => {
        let arrHasSpecialCharacter: string[];
        beforeEach(() => {
            arrHasSpecialCharacter = keyHasSpecialCharArr;
        });

        test('defaultReg는 특수문자를 포함하지 않은 헤더행이면, 헤더행을 배열로 반환한다.', () => {
            expect(typeof specialCharRegCheck).toBe('function');
            expect(specialCharRegCheck(normalDataArr)).toEqual(normalDataArr);
        })

        test("defaultReg 는 특수문자를 포함한 , 에러를 throw 한다.", () => {
            expect(() => specialCharRegCheck(arrHasSpecialCharacter)).toThrowError('Schema has special character');
        })
    })

    describe("appendTblCreate 테스트", () => {
        let tableName: string, arr: string[];

        beforeEach(() => {
            tableName = 'sample';
            arr = normalDataArr
        })

        test('appendTblCreate 는 함수를 반환한다.', () => {
            expect(typeof appendTblCreate).toBe('function');
            expect(typeof appendTblCreate(tableName)).toBe('function');
        })

        test('appendTblCreate() 는 문자열를 반환한다.', () => {
            expect(typeof appendTblCreate(tableName)(arr)).toBe('string');
            expect(appendTblCreate(tableName)(arr)).toEqual(`create table public.sample ( colct_no int8 NOT NULL, 연번 varchar NULL, 시설명 varchar NULL, 소재지 varchar NULL, 정원 varchar NULL, 운영주체 varchar NULL, issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);`)
        })
    })

    describe("appendKeysInsert 테스트", () => {
        test('appendKeysInsert 는 함수이고 함수를 반환한다.',() => {
            expect(typeof appendKeysInsert).toBe('function')
            expect(typeof appendKeysInsert('test')).toBe('function');
        })

        test('appendKeysInsert 는 문자열을 반환한다.',() => {
            expect(typeof appendKeysInsert('test')(normalDataArr)).toBe('string');
            expect(appendKeysInsert('test')(normalDataArr)).toEqual('insert into public.test (colct_no,연번,시설명,소재지,정원,운영주체,data_base_date)')
        })
    })

    describe("appendValuesInsert 테스트", () => {
        test("appendValuesInsert 는 함수이고 문자열을 반환한다.", () => {
            expect(typeof appendValuesInsert).toBe('function');
            const result = appendValuesInsert(normalDataObject, '20240220')
            expect(typeof result).toBe('string');
            expect(result).toEqual(' values (0,\'1\',\'울산\',\'방어진\',\'50\',\'사회복지\', 20240220),(1,\'2\',\'울산\',\'방어진\',\'50\',\'사회복지\', 20240220);');

        })
    })
})