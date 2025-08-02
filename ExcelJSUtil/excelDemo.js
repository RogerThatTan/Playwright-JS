const ExcelJs = require('exceljs');

async function excelTest() {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile('ExcelJSUtil/Data/excelDownloadTest.xlsx');
  const worksheet = workbook.getWorksheet('Sheet1');

  //print all the values in excel

  worksheet.eachRow((row, rowNummber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);
    });
  });
}

excelTest();
