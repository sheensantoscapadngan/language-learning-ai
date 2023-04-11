# SymphAI Template
The goal is to make it seamless and easy for Symph Developers to Develop OpenAI Prompt Engineering Based Applications. 


## ✨ **This Template Features:** ✨
- A fully running PBA application with a working example of a prompt.
- A cloud build template that can be used to deploy the application to Google cloud.
- A theming and styling system that can be used to customize the application to your liking. (Via TailwindCSS and Daisy UI)

## ✨ **Now Let's Create a Prompt Based App:** ✨

1.) ***Use the template to create the repository and run the repo***. (requires at least Node v16+)
![Image](https://i.imgur.com/Qzx2EyB.png)

![Image](https://i.imgur.com/pySPb8T.png)

![Image](https://i.imgur.com/qKgP8Gs.png)

```
npm install
```
```
nx serve web
```

2.) ***Configure Theme to your liking.*** Change the featured image, color scheme according to your app. You can use [Daisy Theme Generator](https://daisyui.com/theme-generator/) to create a theme that you like (we will also AI-power this next time), or [choose an existing theme](https://daisyui.com/docs/themes/)  then you just edit ***tailwind.config.js***

![Customize](https://i.imgur.com/fRCqxkz.png)
![Tailwind Config](https://i.imgur.com/Q3lGVdS.png)

3.) ***Prepare your prompt.*** 
- Practice your prompt on ChatGPT.
![Image](https://i.imgur.com/baXuxlq.png)

- Identify what prompt(s) you need to build your application. In the example above, I have identified at least three prompts (You only need the initial/main prompt in firestore. The rest can be in your application frontend): 
    * The main prompt to start the game: "Let's play a game, give me a series of emoji that describes a movie of ${genre} genre and of ${difficulty} difficulty then I will try to guess."
    * The prompt to ask for the next movie to guess: "Give me more" 
    * The prompt to pass the current movie: "I give up, what is the movie?"
- Notice that on the prompts I added ${genre} and ${difficulty} as dynamic parts of the prompt. This is because I want to be able to change the genre and difficulty of the game.
- Once you have your prompt(s) ready, go to [Firebase Symph-GPT Project](https://console.firebase.google.com/u/1/project/symph-gpt)  (ask Raven/Albert to add you if you are not in it yet) -> Project: symph-gpt -> Firestore database
- Open Collection ***ai-apps***
- Add a document. The document id must be your ai app's identifier (you make this)
- Under that created document, add your main/initial prompt as a field key and the value as the prompt template.
- Add ${variableName} for any dynamic parts of your template. This will be substituted automatically with API use. See other documents for example.

![Image](https://i.imgur.com/IUeNqTr.png)

4.) ***Customize Nextjs App Code.*** Go back to your nextjs code `index.tsx` and see [ Symph AI Apps API:](https://symph-gpt.df.r.appspot.com/api-docs#/gpt/GptController_generateCustomAppPromptChatCompletion). Check the template example code so you can jumpstart yours easily. Basically we can categorize the structure of the prompt based application into:

    - One-off: This type of prompt is used to generate a single response. Applications such as resume builder, story generator, poem generetor etc. fall under this category.
    - Continuous: This type of prompt is used to generate a series of responses. Applications such as this emoji game where a conversation chain is necessary falls into this category.

The template example gives an example of a continuous prompt based application. The code is pretty self-explanatory. Basically we are saving the prompt send by user and the response by the AI to create the conversation chain.

You just need to edit the `appName` and the `promptName` according to what you have defined in the Firestore database. Then also edit the data you are sending to the api. They key names should be the variable names you defined in firestore such as ${genre} and ${difficulty} then value is actual value you want it to be substituted with.

![Image](https://i.imgur.com/MAZsx1u.png)

5.) ***Deploy!*** Finalize/Edit UI/UX to your liking and deploy via included Cloud Build Template (Ask Raven/Albert to create GCP project for you) and then share to the world! 

- Once your GCP project is created, create an app in App Engine: [App Engine](https://console.cloud.google.com/appengine/start/create?project=symph-ai-guess-movie-emoji<your-project-name>)
- Then go to [Cloud Build](https://console.cloud.google.com/cloud-build/triggers?project=<your-project-name>) and create a trigger.
- Connect your repository to the trigger.
- And follow configuration below:
![Image](https://i.imgur.com/rtueJyC.png)
![Image](https://i.imgur.com/dCkTCa7.png)
- Afterwards, run your trigger and you should see your app deployed to GCP App Engine.

6.) ***Create a Firebase Project under your GCP project with enabled Google Analytics***
Copy the Measurement ID from Google Analytics to your `pages/_app.tsx` file

Sample app made from template in few mins:
[Guess the movie emoji Repo](https://github.com/symphco/guess-the-movie-emoji)
[Guess the movie emoji App](https://symph-ai-guess-movie-emoji.et.r.appspot.com)
![Image](https://i.imgur.com/8QKzgtm.png)
![Image](https://i.imgur.com/f50akpH.png)

