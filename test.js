const Client  = require('ssh2-sftp-client');
const XLSX = require('xlsx');
const fs = require('fs');

async function readExcelFromSFTP() {
  const sftpConfig = {
    host: '192.168.0.182',
    port: 22,
    username: 'umairts',
    password: 'Umair@123', // You may use other authentication methods like private key as well.
  };

  const remoteFilePath = '/calculate_cash_aum.xlsx';
  const localFilePath = './testexcel.xlsx';

  const sftp = new Client();

  try {
    await sftp.connect(sftpConfig);
    await sftp.get(remoteFilePath, localFilePath);

    const workbook = XLSX.readFile(localFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(sheetData);
  } catch (error) {
    console.error('Error reading Excel file from SFTP:', error.message);
  } finally {
    sftp.end();
  }
}

readExcelFromSFTP();

