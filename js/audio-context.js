document.querySelector('body').addEventListener('click', async () => {
	await Tone.start();
	console.log("context started");
});

export default {};
