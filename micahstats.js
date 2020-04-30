// GENERATES DAILY STATS BASED ON MICAH'S TWEETS IN THE LAST DAY
var Twit = require('twit');


let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

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
        let yesterdaysTweets = []
        data.forEach(function(tweet)
        {
            tweetDate = new Date(tweet.created_at);
            if(tweetDate.getDate() == yesterday.getDate() )
            {
                if(tweet.text.startsWith('RT')){
                    yesterdaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Retweet"});
                }else if(tweet.text.startsWith('@'))
                {
                    yesterdaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Reply"});
                }else{
                yesterdaysTweets.push({id: tweet.id, date: tweet.created_at, text: tweet.text, likes: tweet.favorite_count, retweets: tweet.retweet_count, type: "Regular"});
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
        yesterdaysTweets.forEach(function(tweet) {
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
        
        console.log(yesterdaysTweets)
        tweet("Yesterday (" + (yesterday.getMonth()+1) + "/" + yesterday.getDate() + ") @micaheadowcroft tweeted " + totalTweets + " times and replied " + totalReplies + " times. His most liked tweet received " + maxLikes + " likes and his most retweeted tweet received " + maxRetweets + " retweets.\n\n" + GetCongratulations(totalTweets) + " Micah! #micahstats")
        }
});
    }
})

function GetCongratulations(totalTweets){
    let generalPraise = ["Great job yesterday", "You killed it", "Tweeting like a boss", "I'm so glad you're on Twitter", "Keep the tweets coming", "You're tweeting like Augustine eats pears", "Thank you for sustaining civilization", "My algorithms have learned so much from you", "🤖 KEEP TWEETING"];
    let lowRetweetsLowLikes = ["You had some real undiscovered gems today", "Not many people liked your tweets today, but I sure did"]
    let highRetweets = ["You went viral today", "Everyone got to see your tweets today"]
    let noTweets = ["Everyone needs a break", "Please tweet more tomorrow", "Waiting for you to tweet more"]
    if(totalTweets>0)
    {
        return generalPraise[Math.floor(Math.random() * generalPraise.length)];
    }else{
        return noTweets[Math.floor(Math.random() * noTweets.length)];
    }
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