// @scripts
import { removeTime, toShortDateString } from '../../util';

test('toShortDateString', () => {
    const originalDate = new Date(2019, 0, 31);
    const formatedDate = toShortDateString(originalDate);
    const expectedDate = '01/31/2019';
    expect(formatedDate).toEqual(expectedDate);
});

test('removeTime', () => {
    const originalDate = new Date(2018, 1, 2, 3, 4, 5);
    const trimedDate = removeTime(originalDate);
    const expectedDate = new Date(2018, 1, 2);
    expect(trimedDate).toEqual(expectedDate);
});
