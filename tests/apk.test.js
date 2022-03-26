import assert from "assert";
import { testHelpers } from "./testHelpers";
import {remote} from "webdriverio";
import { capabilities, options } from "./testConfig";
jest.setTimeout(600000)


// install the apk once before testing for the first time for more reliable results, command below
// adb install PATH/TO/project2.apk
const setup = async () => {
    testHelpers.setClient(await remote({ ...options, capabilities}));
    await testHelpers.clickElement('startBtn');
}

describe('DummyTestForAppiumServerSetup', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('DummyTest', async () => {
        await testHelpers.setElementValue('nameSurname', 'Hello World!');
    });
});

describe('TestCase1', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('allFormInputsAreValid', async () => {
        await testHelpers.fillSurvey('Mannan Abdul', false, 'Ankara', 'Sinovac', 'male', 'Nope', 'Once');
        let surveyIsValid = await testHelpers.checkAllErrorsPresent();
        assert.strictEqual(surveyIsValid, false);
    });

    test('allFormInputsAreInvalid', async () => {
        await testHelpers.fillSurvey('', true, '', '', '');
        let surveyIsValid = await testHelpers.checkAllErrorsPresent();
        assert.strictEqual(surveyIsValid, true);
    });
});

describe('TestCase2', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('SubmitButtonAppears', async () => {
        await testHelpers.fillSurvey('Mannan Abdul', false, 'Ankara', 'Sinovac', 'male', 'Nope', 'Once');
        let submitButtonAppears;
        try {
            let btn = await testHelpers.getElement('submitBtn', 5000);
            submitButtonAppears = true;
        } catch (e) {
            submitButtonAppears = false;
        }
        assert.strictEqual(submitButtonAppears, true);
    });

    test('SubmitButtonDoesNotAppear', async () => {
        await testHelpers.fillSurvey('', true, '', '', '');
        let submitButtonAppears;
        try {
            let btn = await testHelpers.getElement('submitBtn', 5000);
            submitButtonAppears = true;
        } catch (e) {
            submitButtonAppears = false;
        }
        assert.strictEqual(submitButtonAppears, false);
    });
});

describe('TestCase3', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('atLeastTenYrsOld', async () => {
        let dateField = await testHelpers.getElement('datePickerField');
        await dateField.click();
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date();
        date.setFullYear(date.getFullYear() - 10);
        let dateToTest = await testHelpers.getElement(`${date.getDate() + 1} ${monthNames[date.getMonth()]} ${date.getFullYear()}`);
        let isEnabled = await dateToTest.isEnabled();
        assert.strictEqual(isEnabled, false);
    });
});

describe('TestCase4', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('disableBackWithoutPressingEditBtnOnSuccess', async () => {
        await testHelpers.fillSurvey('Mannan Abdul', false, 'Ankara', 'Sinovac', 'male', 'Nope', 'Once');
        await testHelpers.clickElement('submitBtn');
        let successTextField = await testHelpers.getElement('success');
        let successText = await successTextField.getText();
        assert.strictEqual(successText, 'Survey Answers');
        await testHelpers.getClient().pressKeyCode(4);
        let successTextExists;
        try {
            await testHelpers.getElement('success');
            successTextExists = true;
        } catch (e) {
            successTextExists = false;
        }
        assert.strictEqual(successTextExists, true);
    });
});

describe('TestCase5', () => {
    beforeEach(async () => {
        await setup();
    });
    afterEach(async () => {
        await testHelpers.deleteSession();
    });

    test('infoSameOnSuccessAndAfterEdit', async () => {
        let dateToTest = testHelpers.formatDate(new Date());
        await testHelpers.fillSurvey('Mannan Abdul', false, 'Ankara', 'Sinovac', 'male', 'Nope', 'Once');
        await testHelpers.clickElement('submitBtn');
        await testHelpers.getElement('success');
        await testHelpers.checkPageTexts('Mannan Abdul', dateToTest, 'Ankara', 'Male', 'Sinovac', 'Nope', 'Once');
        const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("editBtn"))`
        let editBtn = await testHelpers.getClient().$(`android=${selector}`);
        await editBtn.click();
        await testHelpers.getElement('success');
        await testHelpers.checkPageTexts('Mannan Abdul', dateToTest, 'Ankara', 'Male', 'Sinovac', 'Nope', 'Once');
    });
});