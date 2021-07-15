const cloudinary = require("cloudinary");
const config = require("config");

cloudinary.v2.config({
	cloud_name: config.get("nettserver_cloudinaryCloudName"),
	api_key: config.get("nettserver_cloudinaryApiKey"),
	api_secret: config.get("nettserver_cloudinaryApiSecret"),
});

exports.upload = (file, folder) => {
	return new Promise((resolve) => {
		cloudinary.v2.uploader.upload(
			file,
			(result) => {
				resolve({
					url: result.url,
					id: result.public_id,
				});
			},
			{
				resource_type: "auto",
				folder: folder,
			}
		);
	});
};
