// GENERATES DAILY STATS BASED ON MICAH'S TWEETS IN THE LAST DAY
var Twit = require('twit');



var bot = new Twit({
    consumer_key: process.env.MICAHBOT_CONSUMER_KEY,
    consumer_secret: process.env.MICAHBOT_CONSUMER_SECRET,
    access_token: process.env.MICAHBOT_ACCESS_TOKEN,
    access_token_secret: process.env.MICAHBOT_ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000
});

bot.get('users/show', {screen_name: 'micaheadowcroft'}, function(err, data, response){
    if (err){
        console.log(err);
    } else {
        bot.get('statuses/user_timeline', {id: data.id_str}, function(err, data, response){
        if (err){
            console.log(err);
         }else{
        let todaysTweets = []
        data.forEach(function(tweet)
        {
            today = new Date();
            tweetDate = new Date(tweet.created_at);
            if(tweetDate.getDate() == (today.getDate()) )
            {
                if(tweet.text.startsWith('RT')){
                    todaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Retweet"});
                }else if(tweet.text.startsWith('@'))
                {
                    todaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Reply"});
                }else{
                todaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Regular"});
                }
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
        let totalTweets = 0;
        let totalReplies = 0;
        let maxLikes = 0;
        let maxRetweets = 0;
        todaysTweets.forEach(function(tweet) {
            if(tweet.type != "Retweet"){
                totalTweets = totalTweets + 1;
                if(tweet.likes > maxLikes) {
                    maxLikes = tweet.likes;
                };
                if(tweet.retweets > maxRetweets) {
                    maxRetweets = tweet.retweets;
                }
            }
            if(tweet.type == "Reply") {
                totalReplies = totalReplies + 1;
            }
            
        })
        today = new Date()
        console.log(todaysTweets)
        tweet("Today (" + (today.getMonth()+1) + "/" + today.getDate() + ") Micah tweeted " + totalTweets + " times and replied " + totalReplies + " times. His most liked tweet received " + maxLikes + " likes and his most retweeted tweet received " + maxRetweets + " retweets.\n\n" + GetCongratulations() + " Micah! #micahstats")
        }
});
    }
})

function GetCongratulations(){
    let generalPraise = ["Great job today", "You killed it", "Tweeting like a boss", "I'm so glad you're on Twitter", "Keep the tweets coming", "Tweeting like Augustine eats pears"];
    let lowRetweetsLowLikes = ["You had some real undiscovered gems today", "Not many people liked your tweets today, but I sure did"]
    let highRetweets = ["You went viral today", "Everyone got to see your tweets today"]
    let noTweets = ["Everyone needs a break. Please tweet more tomorrow", "Waiting for you to tweet more"]
    let randomResponse = generalPraise[Math.floor(Math.random() * generalPraise.length)];
    return randomResponse
}
// CONGRATULATE MICAH



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