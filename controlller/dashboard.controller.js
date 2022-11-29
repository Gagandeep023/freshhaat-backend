
async function createEntry(req, res) {
	try {
		const user = new User(req.body);
		const userAddress = recoverPersonalSignature({
			data: "SIGN",
			signature: req.body.sign,
		});
		user.address = userAddress;
		const sign = await user.generateToken(req.body.sign);
		res.status(201).send({ user, sign });
	} catch (error) {
		res.send({ message: error.message });
	}
}

async function getDetails(req, res) {
	try {
		res.status(200).send(req.user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}