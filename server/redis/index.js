const redis = require('redis');

const CHANNELS = {
  BLOCKCHAIN: 'BLOCKCHAIN',
};

class Redis {
  constructor({ blockchain, redisUrl }) {
    this.blockchain = blockchain;

    // play both roles publisher and subscriber in application
    this.publisher = redis.createClient(redisUrl);
    this.subscriber = redis.createClient(redisUrl);

    this.subscribeToChannels();

    // when have a new message, invoke a callback
    // which channel got fired 
    this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message));
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }

  handleMessage(channel, message) {
    console.log(`Received message from channel: ${channel}`);
    
    // we publish JSON type, so we must parse when receive it
    const parsedMessage = JSON.parse(message);

    this.blockchain.replaceChain(parsedMessage);
  }


  // publish to all subcribers on the BLOCKCHAIN channels
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain) // only publish a string
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

}

module.exports = Redis;
