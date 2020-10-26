// @scripts
import { copyObjInCamelCase, copyObjIncludingProps } from '../../util';

test('copyObjIncludingProps', () => {
    const source = { a: 1, b: 2, c: 3 };
    const copy = copyObjIncludingProps(source, ['a', 'c']);
    const expected = { a: 1, c: 3 };
    expect(copy).toEqual(expected);
});

describe('copyObjInCamelCase', () => {
    test('copyObjInCamelCase (simple object)', () => {
        const source = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin'
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (simple object already camelCase)', () => {
        const source = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (simple array)', () => {
        const source = [{
            UserEmail: 'admin1@domain.com',
            UserName: 'Admin1'
        }, {
            UserEmail: 'admin2@domain.com',
            UserName: 'Admin2'
        }];
        const copy = copyObjInCamelCase(source);
        const expected = [{
            userEmail: 'admin1@domain.com',
            userName: 'Admin1'
        }, {
            userEmail: 'admin2@domain.com',
            userName: 'Admin2'
        }];
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (complex object)', () => {
        const source = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin',
            Permissions: [
                'Permission1',
                'Permission2'
            ],
            RecentSearches: [
                { Id: 6, Description: 'Andes' },
                {
                    Id: 54,
                    Description: 'Gómez Plata',
                    MoreData: [{ Prop1: 1 }, { Prop2: 2 }]
                }
            ]
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin',
            permissions: [
                'Permission1',
                'Permission2'
            ],
            recentSearches: [
                { id: 6, description: 'Andes' },
                {
                    id: 54,
                    description: 'Gómez Plata',
                    moreData: [{ prop1: 1 }, { prop2: 2 }]
                }
            ]
        };
        expect(copy).toEqual(expected);
    });
});
