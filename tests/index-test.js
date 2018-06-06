import { Selector } from 'testcafe';

 fixture `Check if the button text changes`
 .page `http://localhost:8080`;

 test('Demo test', async t => {
   await t
     .click('#hello')
 });
