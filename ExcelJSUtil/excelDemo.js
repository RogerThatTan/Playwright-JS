const ExcelJs = require('exceljs');

async function excelTest() {
  let output = { row: -1, column: -1 };
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile('ExcelJSUtil/Data/excelDownloadTest.xlsx');
  const worksheet = workbook.getWorksheet('Sheet1');

  //print all the values in excel

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === 'Banana') {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  //write in the cell value
  const cell = worksheet.getCell(output.row, output.column);
  cell.value = 'Republic';
  await workbook.xlsx.writeFile('ExcelJSUtil/Data/excelDownloadTest.xlsx');
}

excelTest();
