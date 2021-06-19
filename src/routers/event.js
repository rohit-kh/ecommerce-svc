const express = require('express')
const moment = require('moment')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/events', auth, async (req, res) => {
	try{
		const event = new Event({
			...req.body,
			startDate: new Date(req.body.startAt).getTime(),
			endDate: new Date(req.body.endAt).getTime(),
			owner: req.user._id
		})

		await event.save() 
		res.status(201).send(event)
	}catch (e){
		res.status(400).send({error: e.message})
	}
})

router.get('/events', auth, async (req, res) => {
	let startAt = moment(req.query.startAt, 'DD-MM-YYYY', true);
	let endAt = moment(req.query.endAt, 'DD-MM-YYYY', true);
	if(!(startAt.isValid() && endAt.isValid() && startAt.isSameOrBefore(endAt))){
		res.status(400).send({error: 'Invalid date format. Please use DD-MM-YYYY format'})
	}

	startAt = startAt.format('YYYY-MM-DD')

	endAt = new Date(endAt.format('YYYY-MM-DD'))
	endAt.setUTCHours(23)
	endAt.setUTCMinutes(59)
	endAt.setUTCMilliseconds(59)

	console.log(new Date(startAt), new Date(endAt))
	try{
		const events = await Event.find({ 
			startAt: {
				$gte: new Date(startAt),
				$lte: new Date(endAt)
			},
			// endAt: {
			// 	$lte: new Date(endAt)
			// }	
		})
		res.send(events)
	}catch (e) {
		res.status(500).send({error: e.message})
	}
})

module.exports = router