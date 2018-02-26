
const Alexa = require('alexa-sdk');



const languageStrings = {
  'en-US': {
    'translation': {
      'TITLE'  : "Tongue Twisters for Kids",
      'WELCOME_LAUNCH':  "Welcome to Mr Tongue Twister. What is your name?",
      // 'WELCOME_PRACTICE': "Repeat each tongue twister after me. Are you ready?",
      'HELP_MESSAGE': "Repeat each phrase after me. Are you ready to start?",
      'SLOW_DOWN': "I'll pronounce each phrase slower. Is that what you want?"
    }
  },
};
const questionList = [
  { question:'she sees cheese ',                                            answer:['she sees cheese']},
  { question:'wrap the rope with rapper ',                                  answer:['wrap the rope with rapper']},
  { question:'penny paid a penny for a pumpkin',                            answer:['penny paid a penny for a pumpkin']},
  { question:'she sells sea shells on the sea shore',                       answer:['she sells sea shells on the sea shore']},
  { question:'upper roller lower roller',                                   answer:['upper roller lower roller']},
  { question:'I thought I thought of thinking of thanking you',             answer:['I thought I thought of thinking of thanking you']},
  { question:'a proper copper coffee pot',                                  answer:['a proper copper coffee pot']},
  { question:'he threw 3 free throws',                                      answer:['he threw 3 free throws']},
  { question:'I saw Susie sitting in a shoe shine shop',                    answer:['I saw Susie sitting in a shoe shine shop']},
  { question:'Lisa laughed listlessly',                                     answer:['Lisa laughed listlessly']},
  { question:'Pete please pass the plate of peas',                          answer:['Pete please pass the plate of peas']},
  { question:'4 fine fresh fish for you',                                   answer:['4 fine fresh fish for you']},
  { question:'I wish to wash my Irish wristwatch',                          answer:['I wish to wash my Irish wristwatch']},
  { question:'Fred fed Ted bread and Ted fed Fred bread',                   answer:['Fred fed Ted bread and Ted fed Fred bread']},
  { question:'I saw a kitten eating chicken in the kitchen',                answer:['I saw a kitten eating chicken in the kitchen']},
  { question:'mix a box of mixed biscuits with a boxed biscuit mixer',      answer:['mix a box of mixed biscuits with a boxed biscuit mixer']},
  { question:'a box of mixed biscuits a mixed biscuit box',                 answer:['a box of mixed biscuits a mixed biscuit box']},
  { question:'friendly fleas and fire flies',                               answer:['friendly fleas and fire flies']},
  { question:'do tongue twisters twist your tongue',                        answer:['do tongue twisters twist your tongue']},
  { question:'daddy draws doors daddy draws doors',                         answer:['daddy draws doors daddy draws doors']},
  { question:'Larry sent the latter a letter later',                        answer:['Larry sent the latter a letter later']},
  { question:'3 twigs twined tightly',                                      answer:['3 twigs twined tightly']},
  { question:'we surely shall see the sun shine soon',                      answer:['we surely shall see the sun shine soon']},
  { question:'pirates private property',                                    answer:['pirates private property']},
  { question:'busy buzzing bumblebees',                                    answer:['busy buzzing bumblebees']},

];


const alexaArr = [
  { praise: '<break time="1s"/>is correct! good job'},
  { praise: '<break time="1s"/>is right! nice'},
  { praise: '<break time="1s"/>is perfect! wow, excellent'},
  { praise: '<break time="1s"/>is correct! excellent'},
];

const options = {
  QUESTIONS_PER_QUIZ: questionList,
  TITLE: 'Mr. Tongue Twister'
};


exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);

  alexa.resources = languageStrings;

  //alexa.appId = ;

  alexa.registerHandlers(
    newSessionHandlers

    , startSessionHandlers

    , practiceHandlers

    , recapPracticeHandlers

    , scoreHandlers
  );
  alexa.execute();
};


const states = {
  START:           "_START",

  PRACTICE:        "_PRACTICE",
  // QUIZ:            "_QUIZ",

  RECAP_PRACTICE:  "_RECAP_PRACTICE",
  // RECAP_QUIZ:      "_RECAP_QUIZ",
};

const newSessionHandlers = {
  'NewSession': function() {
    this.handler.state = states.START;
    this.emitWithState('NewSession');
  }
};

const startSessionHandlers = Alexa.CreateStateHandler(states.START, {
  'NewSession': function() {

    this.attributes['questionList'] = questionList;
    this.attributes['correctCount'] = 0;
    this.attributes['wrongCount'] = 0;
    this.attributes['wrongList'] = [];
    this.attributes['randomArr'] = alexaArr;


    this.response.speak(this.t('WELCOME_LAUNCH')).listen(this.t("TITLE"));
    this.emit(':responseReady');

  },

  "PracticeIntent": function() {

    var userName = this.event.request.intent.slots.Name.value
    this.handler.state = states.PRACTICE;
    this.response.speak(this.t("Hi " + userName + "<break time='1s'/> Repeat each tongue twister after me. If you would like to go slower, say slower or slow down. I can also repeat each tongue twister again if you say repeat. <break time='1s'/> Are you ready to start?", questionList))
    .listen(this.t("Hi " + userName + "<break time='1s'/> Repeat each tongue twister after me. Are you ready?", questionList));
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function () {
    var helpText = 'Please repeat each tongue twister after me. Are you ready?';
    this.response.speak(helpText).listen('Yes');
    this.emit(':responseReady');
  },

  'Unhandled': function() {  // if we get any intents other than the above
    var unhandledText = 'Sorry, I didn\'t get that. Please repeat each tongue twister after me. Are you ready?';
    this.response.speak(unhandledText).listen('Yes');
    this.emit(':responseReady');
  },

  "AMAZON.CancelIntent": function() {
    this.response.speak("Goodbye!")
    this.emit(':responseReady');
  },
  "AMAZON.StopIntent": function() {
    this.response.speak("Goodbye! Hope you will come back soon");
    this.emit(':responseReady');
  }
});

const practiceHandlers = Alexa.CreateStateHandler(states.PRACTICE, {
  'NewSession': function () {
    this.emit('NewSession'); // Uses the handler in newSessionHandlers
  },

  'NextIntent': function () {
    var say = '';

    this.attributes['currentQuestionIndex'] = 0;

    if (this.attributes['wrongList'].length > 0) {  // we have taken the practice already and need to repeat
      this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['wrongList']);  // only practice those answered wrong
      this.attributes['wrongList'] = [];
      this.attributes['wrongCount'] = 0;
      this.attributes['correctCount'] = 0;
    } else {
      this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList']);
    }
    // say = 'First phrase is ' + this.attributes['sessionQuestionList'] + ', '
    say = '<prosody rate="x-fast">' + this.attributes['sessionQuestionList'][0].question + '</prosody>';

    this.response.speak(say).listen(say);
    this.emit(':responseReady');
  },

  'AMAZON.YesIntent': function() {  // Yes, I want to start the practice

    var say = '';

    this.attributes['currentQuestionIndex'] = 0;

    if (this.attributes['wrongList'].length > 0) {  // we have taken the practice already and need to repeat
      this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['wrongList']);  // only practice those answered wrong
      this.attributes['wrongList'] = [];
      this.attributes['wrongCount'] = 0;
      this.attributes['correctCount'] = 0;
    } else {
      this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList']);
    }
    // say = 'First phrase is ' + this.attributes['sessionQuestionList'] + ', '
    say = ' ' + this.attributes['sessionQuestionList'][0].question;

    this.response.speak(say).listen(say);
    this.emit(':responseReady');
  },

  'AnswerIntent': function() {

    var myState = '';

    if ( !this.event.request.intent.slots.phrase || this.event.request.intent.slots.phrase.value == '') {
      this.emitWithState('NextIntent');  // emitWithState = local version of this handler

    } else {
      myState = this.event.request.intent.slots.phrase.value;

      this.emit('rateAnswer', myState, (say) => {

        var currentQuestionIndex = this.attributes['currentQuestionIndex'];

        if (currentQuestionIndex < this.attributes['sessionQuestionList'].length) {  // MORE QUESTIONS
          say = say + "<break time='1s'/> Next <break time='1s'/>" + this.attributes['sessionQuestionList'][currentQuestionIndex].question;
          // say = say + this.attributes['randomAlexa'] + this.attributes['sessionQuestionList'][currentQuestionIndex].question;
          this.response.speak(say).listen(say);
          this.emit(':responseReady');

        } else  {

          this.handler.state = states.RECAP_PRACTICE;
          this.emitWithState('RecapSession', say);
        }


        if ( this.event.request.intent.slots.slow.value ) {

          this.emitWithState('SlowIntent')    // YOU ARE DONE

        } else  {

          this.handler.state = states.RECAP_PRACTICE;
          this.emitWithState('RecapSession', say);
        }

      });
    }
  },

  'AMAZON.StopIntent': function () {
    this.response.speak('Goodbye. Hope to hear you soon');
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {  // practice help
    var helpText = 'Please repeat each tongue twister after me. Are you ready?';
    this.response.speak(helpText).listen('Yes');
    this.emit(':responseReady');
  },

  'Unhandled': function() {  // if we get any intents other than the above
    var unhandledText = 'Sorry, I didn\'t get that. Please repeat each tongue twister after me. Are you ready?';
    this.response.speak(unhandledText).listen('Yes');
    this.emit(':responseReady');
  },

  "SlowIntent": function() {
    var currentQuestionIndex = this.attributes['currentQuestionIndex'];
    var say = 'Sure. I will say it slower <break time="1s"/> <prosody rate="x-slow">'+ this.attributes['sessionQuestionList'][currentQuestionIndex].question + '</prosody>';
    this.response.speak(say).listen(say);
    this.emit(':responseReady');
  },

});

const recapPracticeHandlers = Alexa.CreateStateHandler(states.RECAP_PRACTICE, {
  'NewSession': function () {
    this.emit('NewSession'); // Uses the handler in newSessionHandlers
  },
  'RecapSession': function (say) {  // append final results to previous answer result

    say = say + " <break time='1s'/> Wonderful! You got "
    + this.attributes['correctCount']
    + ' right out of '
    + this.attributes['sessionQuestionList'].length;

    if (this.attributes['wrongCount'] == 0) {
      say += ' Great job!  You can say stop if you are done.';
      this.response.speak(say).listen(say);
      this.emit(':responseReady');

    } else {
      say = say   +  ' I have sent the '
      + pluralize('question', this.attributes['wrongCount'])
      + ' you got wrong to the Alexa app. Say stop to exit';

      var cardText = '';
      var wrongList = this.attributes['wrongList'];
      for (var i = 0; i < wrongList.length; i++) {
        cardText += '\n\nQuestion : ' + wrongList[i].question;
        cardText += '\nAnswer   : ' + wrongList[i].answer[0];  // show the first acceptable answer
      }

      this.response.cardRenderer('Flash Cards to Practice', cardText);
      this.response.speak(say).listen('You can say yes to practice, or say no.');
      this.emit(':responseReady');
    }

  },

  'AMAZON.NoIntent': function () {  //
    var say = 'Okay, see you next time, goodbye!';
    this.response.speak(say);
    this.emit(':responseReady');
  },
  'Unhandled': function() {
    this.response.speak('Sorry, I didn\'t get that. Try again.').listen('Try again.');
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak('Goodbye. Hope to hear you soon');
    this.emit(':responseReady');
  },
});

const scoreHandlers = {
  'rateAnswer': function (stateGuess, callback) {

    var currentQuestionIndex = this.attributes['currentQuestionIndex'];
    var currentQuestion = this.attributes['sessionQuestionList'][currentQuestionIndex];
    if (currentQuestion.answer.indexOf(stateGuess) >= 0 ) {
      const alexaArr2 = [
        { praise: '<break time="1s"/>is correct! good job'},
        { praise: '<break time="1s"/>is right! nice'},
        { praise: '<break time="1s"/>is perfect! wow, excellent'},
        { praise: '<break time="1s"/>is correct! excellent'},
      ];
      // say = stateGuess + this.attribute['randomArr'].praise.length;
      say = stateGuess + alexaArr2[Math.floor(Math.random()*alexaArr2.length)].praise;
      this.attributes['correctCount'] += 1;
    } else {

      this.attributes['wrongCount'] += 1;

      var wrongList = this.attributes['wrongList'];
      wrongList.push(currentQuestion);
      this.attributes['wrongList'] = wrongList;

      say =  stateGuess + ' is unfortunately incorrect'
      + " <break time='1s'/> The phrase was "
      + currentQuestion.answer[0];

    }
    currentQuestionIndex += 1;
    this.attributes['currentQuestionIndex'] = currentQuestionIndex;

    callback(say);
  },
};

function randomizeArray(myArray, recordCount) { // Fisher-Yates shuffle
  var sliceLimit = myArray.length;
  if (recordCount) {
    sliceLimit = recordCount;
  }
  var m = myArray.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = myArray[m];
    myArray[m] = myArray[i];
    myArray[i] = t;
  }

  return myArray.slice(0, sliceLimit);

}
function pluralize(word, qty) {
  var newWord = '';
  if (qty == 1) {
    newWord = word;
  } else {
    newWord = word + 's';
  }
  return qty.toString() + ' ' + newWord;
}
