if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	require('dotenv').config()
	console.log("environment: " + process.env.NODE_ENV)
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require("mongoose")
const cors = require('cors')
const db = process.env.MONGODB


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB: ' + db))
	.catch((err) => {
		console.log("database_name",db)
		console.log(err)
		console.log("failed to connect to MongoDB")
		// * console.log(err)
	})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)


app.use(errorHandler)

app.listen(port, () => console.log('listening on port ' + port))
