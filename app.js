if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require("mongoose")
const cors = require('cors')
const db = process.env.MONGODB || "default"


mongoose.connect("mongodb://localhost:27017/" + db, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB: ' + db))
	.catch((err) => {
		console.log("failed to connect to MongoDB")
		// * console.log(err)
	})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)


app.use(errorHandler)

app.listen(port, () => console.log('listening on port ' + port))
