{
  "languageModel": {
    "types": [
      {
        "name": "LIST_OF_PHRASES",
        "values": [
          {
            "id": null,
            "name": {
              "value": "she sees cheese",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "wrap the rope with rapper",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "penny paid a penny for a pumpkin",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "she sells sea shells on the sea shore",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "upper roller lower roller",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "penny’s pretty pink piggy bank",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "my sister’s shop sells shoes for sheep",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "a proper copper coffee pot",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "willie's really weary",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "4 fine fresh fish for you",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "mix a box of mixed biscuits with a boxed biscuit mixer",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "a box of mixed biscuits a mixed biscuit box",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "friendly fleas and fire flies",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "do tongue twisters twist your tongue",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "daddy draws doors daddy draws doors",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "3 twigs twined tightly",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "we surely shall see the sun shine soon",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "I thought I thought of thinking of thanking you",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "he threw 3 free throws",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "I saw Susie sitting in a shoe shine shop",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "Lisa laughed listlessly",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "Pete please pass the plate of peas",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "I wish to wash my Irish wristwatch",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "Fred fed Ted bread and Ted fed Fred bread",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "I saw a kitten eating chicken in the kitchen",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "Larry sent the latter a letter later",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "pirates private property",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "busy buzzing bumblebees",
              "synonyms": []
            }
          }
        ]
      },
      {
        "name": "List_of_Slow",
        "values": [
          {
            "id": null,
            "name": {
              "value": "slow down",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "slow",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "slower",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "repeat",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "say again",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "one more time",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "i didn't understand you",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "what",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "again",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "once more",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "say",
              "synonyms": []
            }
          }
        ]
      }
    ],
    "intents": [
      {
        "name": "AMAZON.CancelIntent",
        "samples": []
      },
      {
        "name": "AMAZON.HelpIntent",
        "samples": []
      },
      {
        "name": "AMAZON.NoIntent",
        "samples": []
      },
      {
        "name": "AMAZON.PreviousIntent",
        "samples": []
      },
      {
        "name": "AMAZON.StopIntent",
        "samples": []
      },
      {
        "name": "AMAZON.YesIntent",
        "samples": [
          "Are you ready"
        ]
      },
      {
        "name": "AnswerIntent",
        "samples": [
          "{phrase}"
        ],
        "slots": [
          {
            "name": "phrase",
            "type": "LIST_OF_PHRASES"
          },
          {
            "name": "slow",
            "type": "List_of_Slow"
          }
        ]
      },
      {
        "name": "NextIntent",
        "samples": [
          "next"
        ],
        "slots": []
      },
      {
        "name": "PracticeIntent",
        "samples": [
          "{Name}",
          "i'm {Name}",
          "i am {Name}",
          "my name is {Name}"
        ],
        "slots": [
          {
            "name": "Name",
            "type": "AMAZON.GB_FIRST_NAME"
          }
        ]
      },
      {
        "name": "SlowIntent",
        "samples": [
          "slow down",
          "slower",
          "can you speak slower",
          "repeat",
          "repeat please",
          "say it again",
          "one more time",
          "say again",
          "slow"
        ],
        "slots": []
      }
    ],
    "invocationName": "mr. tongue twister"
  }
}
