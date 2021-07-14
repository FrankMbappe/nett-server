const config = require("config");
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const region = config.get("awsBucketRegion");
const bucketName = config.get("awsBucketName");
const accessKeyId = config.get("awsAccessKeyId");
const secretAccessKey = config.get("awsSecretAccessKey");

const s3 = new S3({ region, accessKeyId, secretAccessKey });

// Upload to S3
function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	return s3.upload(uploadParams).promise();
}

module.exports = { uploadFile };
