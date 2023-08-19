# bmx-onepiece

The Express.js Starter Template is a pre-built project structure that gives developers a head start in building web applications using the Express.js framework. It provides a foundation for developers to build their applications upon, with a set of pre-configured files and folders that are commonly used in Express.js applications.

The template includes basic features such as routing, middleware, error handling, and database integration. It also includes a basic user authentication system and a sample database schema to help developers get started quickly.

Using the Express.js Starter Template can save developers a significant amount of time and effort in setting up a new project. It provides a solid foundation for building scalable and maintainable web applications.

To use the Express.js Starter Template, developers can simply clone the repository, install the required dependencies, and start building their application on top of the existing structure. The template is easily customizable and can be modified to suit the specific needs of a project.

### Step: 1

Clone the repository and run `npm -i` to install dependencies.

### Step2:

Create `.env` file in the root level and set the following `environmental variables`

```
DB_URI = mongodb+srv://username:password@db-url/database-name
PORT = 3000
NVERSE_AES_KEY = 32 character secret key
NVERSE_AES_IV = 32 character secret key
NVERSE_PASSWORD_KEY = 16 character secret key
NVERSE_JWT_SECRET = 1024 character secret key
MULTER_PATH = path to store temp files
SERVER_URL = http://127.0.0.1:3000
```

you can generate these keys randomly as follows

```bash
// NVERSE_AES_KEY
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
// NVERSE_AES_IV
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
// NVERSE_PASSWORD_KEY
node -e "console.log(require('crypto').randomBytes(8).toString('hex'))"
// NVERSE_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(512).toString('hex'))"
```

### Step 3:

To run the app open two terminals

In the first terminal build and watch the application for changes (as in `package.json`)

```bash
npm run build-watch
```

In the second terminal run the build application (as in `package.json`)

```bash
npm run start-dev
```
The above command needs nodemon installed globally
```bash
npm install -g nodemon
```

## Run with multiple instances

Node.js is built on a single-threaded event loop, which means that it can only handle one task at a time. This can be a problem when dealing with tasks that are CPU-intensive or take a long time to complete, such as processing large amounts of data or handling complex calculations.

When a task is running in Node.js, it blocks the event loop, which means that other tasks have to wait until the current task is finished before they can run. This can lead to slow performance and can cause the server to become unresponsive.

One solution is to use a cluster module to enable multi-threading in Node.js. The cluster module allows you to create multiple instances of your application and distribute the workload across them. This can improve performance and make your application more scalable.

> T**o do so we use `pm2` package.**
>

To install pm2 package globally run: `npm install pm2 -g`

Then install to handle logs: `pm2 install pm2-logrotate`

Create `ecosystem.config.cjs` in your root directory.

💡 To know more about configs see [documentation](https://pm2.keymetrics.io/docs/usage/application-declaration/)

```jsx
module.exports = {
	apps: [
		{
			name: "app-name",
			exec_mode: "cluster",
			instances: "3",
			script: "./dist/index.js", // your script
			args: "start",
			watch: false, // only for development
			maxRetries: 2,
			log_date_format: "YYYY-MM-DD HH:mm:ss",
			time: true,
			combine_logs: true,
			out_file: "./logs/out.log", // current out logs
			error_file: "./logs/errors.log", // current error logs
			env: {
				DB_URI: "mongodb+srv://username:password@db-url/database-name",
				PORT: 3000,
				NVERSE_AES_KEY: "32 character secret key",
				NVERSE_AES_IV: "32 character secret key",
				NVERSE_PASSWORD_KEY: "16 character secret key",
				NVERSE_JWT_SECRET: "1024 character secret key",
				MULTER_PATH: "path to store temp files",
				SERVER_URL: "http://127.0.0.1:3000"
			},
		},
	],
};
```

In `pm2` logs can be very big to handle logs and delete old logs we set some log configs,

💡 To know more see [documentation](https://www.npmjs.com/package/pm2-logrotate)

```bash
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress false
pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:rotateInterval 0 0 * * *
pm2 set pm2-logrotate:rotateModule true
pm2 set pm2-logrotate:workerInterval 120
```

💡 To know more about `pm2` logs see [documentation](https://pm2.keymetrics.io/docs/usage/log-management/)

### PM2 Commands

- To start an application: `pm2 start ecosystem.config.cjs`
- To list all the running instances: `pm2 list`
- To delete clusters of a particular application: `pm2 delete application-name`
- To delete all clusters and applications: `pm2 delete all`
- To monitor resources usage: `pm2 monit`
- To display all logs: `pm2 logs`
- To display specific application logs: `pm2 logs application-name`
- To display last 100 lines of logs: `pm2 logs --lines 100`
- To display only error logs: `pm2 logs --err`
- To display only error logs: `pm2 logs --out`
- To start a pm2 process: `pm2 start pid`
- To stop a process: `pm2 stop pid`
