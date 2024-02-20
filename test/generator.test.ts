import Generator from "../src/generator";
import * as Functions from '../src/functions/functions'
import * as pipe from '../src/functions/pipe'
import {normalDataObject} from "./test.data";
import {appendKeysInsert, appendValuesInsert, transformKeys} from "../src/functions/functions";

describe('Generator 테스트', () => {
    let generator: Generator;
    let tableName: string, data: object[];
    beforeEach(() => {
        generator = new Generator();
        tableName = 'test';
        data = [{'a': 1}]
    })

    describe("createTableQ 테스트", () => {
        let transformKeysMock, specialCharRegCheckMock, appendCreateMock;

        test('createTableQ 는 정의되어 있으며 함수이다.', () => {
            expect(generator.createInsertQ).toBeDefined();
            expect(typeof generator.createTableQ).toBe('function');
        });

        test('createTableQ 의 tableName은 특수문자가 포함되면 에러를 반환한다.', () => {
            const spiecalCharTableName: string = 'test&table'
            expect(() => generator.createTableQ(spiecalCharTableName, data)).toThrowError('Schema has special character');
        })

        test('createTableQ 의 테이블 생성 쿼리(문자열)를 반환한다.', () => {
            const result: string = generator.createTableQ(tableName, data);
            expect(result).toBe('create table public.test ( colct_no int8 NOT NULL, a varchar NULL, issued timestamptz DEFAULT CURRENT_TIMESTAMP,data_base_date varchar);')
        })

        test('creatTableQ 는 createTableFunc 함수들을 호출한다.', () => {
            transformKeysMock = jest.spyOn(Functions, 'transformKeys');
            specialCharRegCheckMock = jest.spyOn(Functions, 'specialCharRegCheck');
            appendCreateMock = jest.spyOn(Functions, 'appendTblCreate');
            generator.createTableQ(tableName, data);

            expect(transformKeysMock).toHaveBeenCalledWith(data);
            expect(specialCharRegCheckMock).toHaveBeenCalledWith([tableName]);
            expect(appendCreateMock).toHaveBeenCalledWith(tableName);
        })
    });

    describe('createPkQ 테스트', () => {
        test('createPkQ 는 함수이고 문자열을 반환한다.', () => {
            expect(typeof generator.createPkQ).toBe('function');
            const result: string = generator.createPkQ('test')
            expect(typeof result).toBe('string');
            expect(result).toBe('ALTER TABLE public.test ADD CONSTRAINT test_pk PRIMARY KEY (colct_no, data_base_date)');
        })
    })

    describe('createInsertQ 테스트', () => {
        let pipeMock, transformKeysMock, appendKeysInsertMock, appendValuesInsertMock;
        let databaseDate: string;
        beforeEach(() => {
            databaseDate = '20240220';

        })
        test('createInserQ 는 함수이고, 문자열을 반환한다.',() => {
            expect(typeof generator.createInsertQ).toBe('function');
            expect(typeof generator.createInsertQ(tableName, '20240220', normalDataObject)).toBe('string')
        })
        
        test('createInsertQ 는 appendKeysInsert를 호출한다.', () => {
            pipeMock = jest.spyOn(pipe, 'pipe');
            appendKeysInsertMock = jest.spyOn(Functions, 'appendKeysInsert');
            transformKeysMock = jest.spyOn(Functions, 'transformKeys');
            appendValuesInsertMock = jest.spyOn(Functions, 'appendValuesInsert');
            generator.createInsertQ(tableName, databaseDate, normalDataObject);

            expect(pipeMock).toBeCalled();
            expect(appendKeysInsertMock).toBeCalledWith(tableName)
        })
    })
});