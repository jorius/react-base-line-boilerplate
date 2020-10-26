// @scripts
import { toMoney } from '../../util';

describe('toMoney', () => {
    test('toMoney (2 decimals)', () => {
        expect(toMoney({ number: 89.346, decimals: 2 })).toEqual('$ 89.35');
    });

    test('toMoney (3 decimals)', () => {
        expect(toMoney({ number: 89.346, decimals: 3 })).toEqual('$ 89.346');
    });

    test('toMoney (with thousands)', () => {
        expect(toMoney({ number: 8900.346, decimals: 2 })).toEqual('$ 8,900.35');
    });
});
