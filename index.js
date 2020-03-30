
var Twit = require('twit');



var bot = new Twit({
    consumer_key: process.env.MICAHBOT_CONSUMER_KEY,
    consumer_secret: process.env.MICAHBOT_CONSUMER_SECRET,
    access_token: process.env.MICAHBOT_ACCESS_TOKEN,
    access_token_secret: process.env.MICAHBOT_ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000
});
// USEFUL SCREENNAMES
// micaheadowcroft 💙💚
// AugustineQuots 
// CSLewis
// DuneQuoteBot




//THIS FUNCTION GETS MICAH'S TIMELINE
bot.get('users/show', {screen_name: 'micaheadowcroft'}, function(err, data, response){
    if (err){
        console.log(err);
    } else {
        bot.get('statuses/user_timeline', {id: data.id_str}, function(err, data, response){
        if (err){
            console.log(err);
         }else{
        let allTweets = []
        data.forEach(function(tweet)
        {
            today = Date()
            if(Date(timestamp).getUTCDate() == Date().getUTCDate() )
            {

            }else{
                
            }

            //if (tweet.created)
            // console.log("Date: ", tweet.created_at)
            // console.log("ID: ", tweet.id)
            // console.log("Text: ",tweet.text);
            // console.log("Likes: ",tweet.favorite_count);
            // console.log("Retweets: ",tweet.retweet_count + '\n');
        }
        )
        }
});
    }
})

// var TWEET = '1243923857876103174'
// postReply(TWEET, 'TESTING REPLY FUNCTION AGAIN', 'tweets_micah');



// SEARCH FOR TWEETS ABOUT MICAH
function searchTweets(searchParam, limit){
    bot.get('search/tweets', {q: searchParam, count: limit}, function(err, data, response){
        if (err){
            console.log(err);
        } else {
            data.statuses.forEach(function(s){
                console.log(s.text);
                console.log(s.user.screen_name);
                console.log('\n')
            })

        }
    })

}

// RETURNS THE SCREEN NAME OF THE PERSON WHO TWEETED SOMETHING
//
function getTweeter(tweetId){
    return bot.get('statuses/show/:id', {id: tweetId}, function(err, data, response){
        if (err){
            console.log(err);
        } else {
            console.log(data.user.screen_name);

        }
    })

}



//FIND OUT WHAT WE'VE TWEETED ABOUT MICAH
//
function getBotTimeline(){
    bot.get('statuses/home_timeline', {count: 5}, function(err, data, response){
            if (err){
                console.log(err);
            } else {
                data.forEach(function(d){
                    console.log(d.text);
                    console.log(d.user.screen_name);
                    console.log(d.id_str);
                    console.log('\n')
                })
            }
            });
    }


// RETWEET SOMEONE (PROBABLY MICAH)
//
function postRetweet(tweetId){
bot.post('statuses/retweet/:id', {id: tweetId}, function(err, data, response){
    if (err){
        console.log(err);
    } else {
        console.log(data);
    }
    
});
}

// UNRETWEET SOMEONE 
//
function postUnretweet(tweetId){
    bot.post('statuses/unretweet/:id', {id: tweetId}, function(err, data, response){
        if (err){
            console.log(err);
        } else {
            console.log(data.text + ' was unretweeted');
        }
        
    });
    }

// REPLY TO SOMEONE (PROBABLY MICAH)
//
function postReply(tweetId, reply, user){

    bot.post('statuses/update', {status: '@' + user + ' ' + reply, in_reply_to_status_id: tweetId}, function(err, data, response){
        if (err){
            console.log(err);
        } else {
            console.log('replied: ' + data.text);
        }
        
    });
}

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
function tweet(text)
{
    bot.post('statuses/update', {status: text}, function(err, data, response){
        if (err){
            console.log(err);
        } else {
            console.log(data.text + ' was tweeted.')
        }
    });
}