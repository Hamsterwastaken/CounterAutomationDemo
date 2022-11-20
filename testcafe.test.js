import {counterPage,
        addQuantity,
        subtractQuantity,
        assertQuantity,
        assertEmpty } from './helpers'

fixture `Counter Suite`
    .page `http://192.168.0.123:3000/`;


test('Initialised state', async t => {
    await assertEmpty(t);
});

test('Adding/removing products', async t => {
    await addQuantity(t);
    await assertQuantity(t, 1);
    await subtractQuantity(t);
    await assertEmpty(t);
});

test('Reset state', async t => {
    await assertEmpty(t);
    await addQuantity(t);
    await addQuantity(t);
    await assertQuantity(t, 2);
    
    await t.click(counterPage.refreshButton);
    
    await assertEmpty(t);
});

test('Removing/restoring rows', async t => {
    const initRows = await counterPage.itemRow.count;
    await t.expect(initRows).eql(5, 'Unexpected initial row amount');
    await t.click(counterPage.trashButton.nth(0));
    await t.click(counterPage.trashButton.nth(-1));

    const reducedRows = await counterPage.itemRow.count;

    await t.expect(initRows).gt(reducedRows, 'Rows have not been reduced');
    await t.expect(reducedRows).eql(3);

    await t.click(counterPage.trashButton.nth(0));
    await t.click(counterPage.trashButton.nth(0));

    await t.expect(counterPage.itemRow.exists).ok();
    await t.expect(await counterPage.itemRow.count).eql(1, 'Incorrect row quantity');

    await t.click(counterPage.restoreButton);
    await t.expect(await counterPage.itemRow.count).eql(5, 'Rows have not been restored');
});