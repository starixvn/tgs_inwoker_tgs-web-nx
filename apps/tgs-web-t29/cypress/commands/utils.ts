export type api = {
  path: string;
  fixture: string;
  as: string;
  method?: 'GET' | 'POST';
}

type FixtureType = 'common' | 'login'; // fixtures 的資料夾

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
    }).as(row.as);
  });
  
  return {asApis: apis.map(row => `@${row.as}`)}
} 