import { Selector } from "testcafe";

export const counterPage = {
    badge: Selector('span.badge'),
    addButton: Selector('button.btn-secondary'),
    subtractButton: Selector('button.btn-info'),
    refreshButton: Selector('button.btn-success'),
    restoreButton: Selector('button.btn-primary'),
    trashButton: Selector('button.btn-danger'),
    itemRow: Selector('div.row'),
};

export const addQuantity = async (runner) => {
    const aButtons = await counterPage.addButton.count;
    for(let x = 0; x < aButtons; x++){
        await runner.click(counterPage.addButton.nth(x));
    };
};

export const subtractQuantity = async (runner) => {
    const sButtons = await counterPage.subtractButton.count;
    for(let x = 0; x < sButtons; x++){
        await runner.click(counterPage.subtractButton.nth(x));
    };
};

export const assertQuantity = async (runner, quantity) => {
    const badges = await counterPage.badge.count;
    await runner.expect(counterPage.badge.nth(0).textContent).eql('4', 'Unexpected cart total');
    for(let x = 1; x < badges; x++){
        await runner.expect(counterPage.badge.nth(x).textContent).eql(quantity.toString(), `Incorrect quantity on Badge ${x}`);
    };
};


export const assertEmpty = async (runner) => {
    const badges = await counterPage.badge.count;
    await runner.expect(counterPage.badge.nth(0).textContent).eql('0', 'Unexpected cart total');
    for(let x = 1; x < badges; x++){
        await runner.expect(counterPage.badge.nth(x).textContent).eql('Zero', `Incorrect quantity on Badge ${x}`);
    };
};