import assert from "assert";

let clientGlobal;
let select;

export const testHelpers = {
    setClient: (client) => clientGlobal = client,
    getClient: () => clientGlobal,
    deleteSession: async () => await clientGlobal.deleteSession(),
    getElement,
    clickElement,
    setElementValue,
    setDateValue,
    setGender,
    fillSurvey,
    checkAllErrorsPresent,
    getElementText,
    checkPageTexts,
    formatDate
}

async function getElement(name, timeout = 600000) {
    const element = await clientGlobal.$(`~${name}`);
    await element.waitForDisplayed({timeout});
    return element;
}

async function getElementText(name) {
    let element = await getElement(name);
    let elementText = await element.getText();
    return elementText;
}

async function getElementBySelector(text, classname) {
    const selector = `new UiSelector().text("${text}").className("${classname}")`;
    return await clientGlobal.$(`android=${selector}`);
}

async function clickElement(name) {
    let btn = await getElement(name);
    await btn.click();
    await btn.click();
}

async function setElementValue(name, value) {
    let element = await getElement(name);
    await element.click();
    await element.click();
    await element.setValue(value);
    await clientGlobal.pressKeyCode(4);
}

async function getErrMsg(text, classname) {
    let element = await getElementBySelector(text, classname);
    return await element.getText();
}

async function setDateValue(day, month, year, leaveEmpty = false) {
    await clickElement('datePickerField');
    await clickElement(`${day} ${month} ${year}`);
    let btn = leaveEmpty ? 'CANCEL' : 'OK';
    let okBtn = await getElementBySelector(btn, 'android.widget.Button');
    okBtn.click();
}

async function setTenYrsAgoDateValue(leaveEmpty = false) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    await setDateValue(`${day}`, `${monthNames[date.getMonth()]}`, `${date.getFullYear()}`, leaveEmpty);
}

async function getGenderBtn(value) {
    let element;
    switch (value.toLowerCase()) {
        case 'male':
            select = 'Male';
            element = await clientGlobal.$(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup`);
            break;
        case 'female':
            select = 'Female';
            element = await clientGlobal.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup");
            break;
        case 'rather not say':
            select = 'Rather Not Say';
            element = await clientGlobal.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup/android.view.ViewGroup[3]");
            break;
    }
    return element;
}

async function setGender(value) {
    let element = await getGenderBtn(value);
    await element.click();
    await element.click();
}

async function checkAllErrorsPresent() {
    let allErrorsPresent;
    try {
        await getErrMsg("Name Surname is not valid.", "android.widget.TextView");
        await getErrMsg("Birth Date is required.", "android.widget.TextView");
        await getErrMsg("City is required.", "android.widget.TextView");
        await getErrMsg("Gender is required", "android.widget.TextView");
        await getErrMsg("Vaccine Applied is required.", "android.widget.TextView");
        allErrorsPresent = true;
    } catch (e) {
        allErrorsPresent = false;
    }
    return allErrorsPresent;
}

async function fillSurvey(nameSurname, leaveDateEmpty, city, vaccineType, gender = '', sideEffect = '', pcr = '') {
    await setElementValue('nameSurname', nameSurname);
    await setTenYrsAgoDateValue(leaveDateEmpty);
    await setElementValue('city', city);
    if (gender) await setGender(gender);
    await setElementValue('vaccineApplied', vaccineType);
    await setElementValue('sideEffects', sideEffect);
    await setElementValue('pcr', pcr);
}

async function getPageTexts() {
    let nameSurname = await getElementText("nameSurname");
    let date = await getElementText("datePickerField");
    let city = await getElementText("city");
    let vaccineApplied = await getElementText("vaccineApplied");
    let sideEffects = await getElementText("sideEffects");
    let pcr = await getElementText("pcr");
    return { nameSurname, date, city, gender: select, vaccineApplied, sideEffects, pcr };
}

async function checkPageTexts(nameSurnameC, dateC, cityC, genderC, vaccineAppliedC, sideEffectsC, pcrC) {
    let { nameSurname, date, city, gender, vaccineApplied, sideEffects, pcr } = await getPageTexts();
    assert.strictEqual(nameSurname, nameSurnameC);
    assert.strictEqual(date, dateC);
    assert.strictEqual(city, cityC);
    assert.strictEqual(gender, genderC);
    assert.strictEqual(vaccineApplied, vaccineAppliedC);
    assert.strictEqual(sideEffects, sideEffectsC);
    assert.strictEqual(pcr, pcrC);
}

function formatDate(date) {
    date.setFullYear(date.getFullYear() - 10);
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
}