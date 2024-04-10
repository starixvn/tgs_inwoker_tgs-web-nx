export type api = {
  path: string;
  fixture: string;
}

type FixtureType = 'common' | 'login' | 'deposit'; // fixtures 的資料夾

/**
 * 攔截 API
 * @param apis API陣列
 * @param type fixtures 的資料夾
 */
export const interceptAPIs = (apis: api[], type: FixtureType) => {
  apis.forEach((row) => {
    cy.intercept({
      method: '+(GET|POST)',
      path: `**/${row.path}`,
    }, {
      fixture: `/${type}/${row.fixture}.json`
    });
  });
} 