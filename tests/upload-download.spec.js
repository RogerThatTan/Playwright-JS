const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = await readExcel(worksheet, searchText);
  //write in the cell value
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  //print all the values in excel
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
//update Mango Price to 350
// writeExcelTest(
//   'Apple',
//   350,
//   { rowChange: 0, colChange: 2 },
//   'ExcelJSUtil/Data/excelDownloadTest.xlsx',
// );

test('Upload Download Excel Validation', async ({ page }) => {
  await page.goto(
    'https://rahulshettyacademy.com/upload-download-test/index.html',
  );
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  await downloadPromise;
  writeExcelTest(
    'Apple',
    350,
    { rowChange: 0, colChange: 2 },
    'ExcelJSUtil/Data/excelDownloadTest.xlsx',
  );

  await page.locator('#fileinput').click();
  await page
    .locator('#fileinput')
    .setInputFiles(
      'C:/Users/xtanv/OneDrive/Desktop/Github Repository/Playwright-JS/ExcelJSUtil/Data/excelDownloadTest.xlsx',
    );
  await page.pause();
});
