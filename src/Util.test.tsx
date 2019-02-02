import * as Util from './Util';

it('uses multi-line strings', () => {
  expect(Util.formatString("hi\\nthere")).toEqual(`hi
there`);
})