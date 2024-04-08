export type api = {
  path: string;
  fixture: string;
  as: string;
  method?: 'GET' | 'POST';
}

type FixtureType = 'common' | 'login'; // fixture 資料夾分類

export const interceptAPIs = (apis: api[], type: FixtureType) => {
  apis.forEach((row) => {
    cy.intercept({
      method: row.method ? row.method : 'GET',
      path: `**/${row.path}`,
    }, {
      fixture: `/${type}/${row.fixture}.json`
    }).as(row.as);
  });
  console.log(apis);
  
  return {asApis: apis.map(row => `@${row.as}`)}
} 