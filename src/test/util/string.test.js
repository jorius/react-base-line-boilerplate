// @scripts
import { format, getNameInitials } from '../../util';

describe('format', () => {
    test('format (no args)', () => {
        expect(format('Hello World {0}')).toEqual('Hello World {0}');
    });

    test('format (1 string arg)', () => {
        expect(format('Hello World {0}', 'Pepitp')).toEqual('Hello World Pepitp');
    });

    test('format (2 string args)', () => {
        expect(format('Hello World {0} {1}', 'Pepito', 'Perez')).toEqual('Hello World Pepito Perez');
    });

    test('format (complex scenario)', () => {
        expect(format('...{0}...{1}...{0}...', 1, 2, 3)).toEqual('...1...2...1...');
    });
});

describe('getNameInitials', () => {
    test('getNameInitials (no args)', () => {
        expect(getNameInitials()).toEqual('');
    });

    test('getNameInitials (null)', () => {
        expect(getNameInitials(null)).toEqual('');
    });

    test('getNameInitials (empty string)', () => {
        expect(getNameInitials('')).toEqual('');
    });

    test('getNameInitials (1 word)', () => {
        expect(getNameInitials('firstName')).toEqual('F');
    });

    test('getNameInitials (2 words)', () => {
        expect(getNameInitials('firstName lastName')).toEqual('FL');
    });

    test('getNameInitials (3 words)', () => {
        expect(getNameInitials('firstName secondName lastName')).toEqual('FL');
    });

    test('getNameInitials (4 words)', () => {
        expect(getNameInitials('firstName secondName lastName OtherlastName')).toEqual('FL');
    });

    test('getNameInitials (5 words)', () => {
        expect(getNameInitials('firstName secondName lastName OtherlastName OtherlastName')).toEqual('FL');
    });
});
