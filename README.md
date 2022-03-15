<!-- ABOUT THE PROJECT -->
## About The Project
This bot was written to inform the population of Russia about the real sorrowful actions in Ukraine during the Russian invasion on February 24, 2022. About how it all began, how the Russian army killed ukrainian civilians, how it destroyed ukrainian culture. It also contains information about what Russian citizens can do to stop the war.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/en/)
* [Telegraf-bot](https://telegraf.js.org/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

For using this bot you need to register new bot via BotFather in telegram social network.

### Installation

1. Contact [BotFather](https://telegram.me/BotFather) get a free bot API Key
2. Clone the repo
   ```sh
   git clone https://github.com/vlbut/telegraf-bot.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Bot gets data from MongoDB database. For getting access to database write me [b.butovskyi@gmail.com](mailto:b.butovskyi@gmail.com)
5. Project uses [dotenv](https://www.npmjs.com/package/dotenv) package  that loads environment variables from `.env` file.
So you need to create `.env` file and add your bot token: 
   ```js
   BOT_TOKEN='ENTER HERE YOUR BOT TOKEN'
   DB_USERNAME='ENTER HERE DB NAME, WHICH I GIVE YOU AFTER CONTACTING (see step 4)'
   DB_PASSWORD='ENTER HERE DB NAME, WHICH I GIVE YOU AFTER CONTACTING (see step 4)'
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Running -->
##Running
###Development mode
To start project in development mode run:
   ```
   npm run start:dev
   ```
###Production mode
To start project in production mode run:
   ```
   npm run start
   ``` 
<i>P.S. Don't forget to set environmental variables</i>
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Vladyslav Butovskyi - [b.butovskyi@gmail.com](mailto:b.butovskyi@gmail.com)
<p align="right">(<a href="#top">back to top</a>)</p>
