import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAUJF5H2IUVYEFUTHG',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3();

export const uploadFile = (file, bucketName, folderName, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName}`,
    Body: file,
  };

  return s3.upload(params).promise();
};

export const listObjects = (bucketName) => {
  const params = {
    Bucket: bucketName,
  };

  return s3.listObjectsV2(params).promise();
};

export const downloadFile = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  return s3.getObject(params).promise();
};
