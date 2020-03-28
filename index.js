var Twit = require('twit');

var bot = new Twit({
    consumer_key: process.env.MICAHBOT_CONSUMER_KEY,
    consumer_secret: process.env.MICAHBOT_CONSUMER_SECRET,
    access_token: process.env.MICAHBOT_ACCESS_TOKEN,
    access_token_secret: process.env.MICAHBOT_ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000
});



// FIND OUT WHO MICAH FOLLOWS
//
// bot.get('friends/list', {screen_name: 'micaheadowcroft'}, function(err, data, response){
//     if (err){
//         console.log(err);
//         } else {
//         console.log(data)
//         }
// });


// FOLLOW MICAH
//
// bot.post('friendships/create', {screen_name: 'micaheadowcroft'}, function(err, data, response){
//     if (err){
//         console.log(err);
//         } else {
//         console.log(data)
//         }
// });

// GET LIST OF MICAH'S FOLLOWERS
//
// bot.get('followers/list', {screen_name: 'micaheadowcroft'}, function(err, data, response){
//     if (err){
//         console.log(err);
//     }else{
//         data.users.forEach(function(user){
//             console.log(user.screen_name)
//         })
//     }
// });


// POST A TWEET
//
// bot.post('statuses/update', {status: 'hello world!'}, function(err, data, response){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(data.text + ' was tweeted.')
//     }
// });