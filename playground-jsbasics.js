/* PROMISES */
const getYouTubeChannelName = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			console.log("Getting YouTube channel name...");
			resolve("yt_frankevy");
		}, 2000);
	});
const getFacebookPageName = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			console.log("Getting Facebook page name...");
			resolve("fb_frankevy");
		}, 3000);
	});

/* How to use promises */
// getYouTubeChannelName()
// 	.then((result) => getFacebookPageName())
// 	.then((result) => console.log(result))
// 	.finally(() => console.log("Task ended."));

/* Runs multiple promises, then does something when all resolve */
// Promise.all([getYouTubeChannelName(), getFacebookPageName()]).then((results) => {
// 	console.log("Task ended. Results", results);
// });

/* As soon as one of the promise resolves, the then() method will be called */
// Promise.race([getYouTubeChannelName(), getFacebookPageName()]).then((results) => {
// 	console.log("Task ended. Results", results);
// });

/* ASYNC/AWAIT */
async function displayPublicPagesNames() {
	try {
		const youTubeChannelName = await getYouTubeChannelName();
		const facebookPageName = await getFacebookPageName();
		console.log("YouTube page:", youTubeChannelName);
		console.log("Facebook page:", facebookPageName);
	} catch (error) {
		console.log(error.message);
	}
}

displayPublicPagesNames();
