# Usability Testing Contribution Guide

A usability test is a UX research methodology for evaluating user interfaces, being those paper prototypes, high-fidelity prototypes, a live version of a software, and so on. The basic procedure consists of having a **moderator** or **facilitator** watching representative users performing significant tasks in the interface to understand their thoughts and reporting the results.

Usability tests are widely recommended to have information not only about whether users are failing to complete the tasks or not, but also why are they failing, which is useful to have conclusions on how the interface should be improved.

The user testing process consists of three main steps:

1. Designing the test;
2. Running the test sessions;
3. Reporting test results.

## 1. Designing the test

Start by creating an issue in the repository to follow the test design template.

Decide on what needs to be tested, the **objective** of the test. It can be a user journey, an application feature, or something as small as understanding what a specific button does. If you have many objectives, prefer to write more than one test instead of running one big test. Short sessions of 15 minutes or less are better so as not to tire participants.

### Requirements

For the test sessions to happen, there might be a few requirements that need to be described beforehand:

* **User profile**
    - the participants for the tests should be representative of the application domain;
    - depending on the test goals, you may want to test with different user profiles. e.g.: users who already used your software, users who have used similar interfaces to your software or users who never got in touch with any software of this kind but are familiar to this field;
    - define how many participants you want for your test iteration: for each user profile you choose, you'll need the same amount of participants. Usually, 5 participants are enough, 7 participants are good and 10 or more participants are a waste of time - if you want your test session to run with 5 participants, you'll need to run with 5 people for each profile required.
* **Environment**
    - where the test should run: a paper prototype, a high fidelity prototype, the current version of the application;
    - describe how should the environment be prepared (populate database, open the application in a specific screen, reset for each test);
    - if necessary, provide steps to get this version of the software or prototype.

### Tasks

Prepare a list of significant **tasks** that the participants need to perform in the interface. A task itself does not contain details concerning context, it will be used to build the scenario tasks and can be useful as a guide to reporting results later.

You can create one or two warm up tasks to get started that not necessarily are related to the goals of the test itself, but they can be easy for the participant to get familiarized to the interface.

### Scenarios

Scenarios are the test script for the participants. Using the **tasks**, describe relatable scenarios for the test session. Make sure to write them as if the participant would be in the context of the application usage. Place the scenarios in an order that better helps you to extract information from the participants.

Not giving hints while choosing the words used in the scenarios descriptions is as important as creating well described and contextualized scenarios. Avoid suggesting button names, or naming any kind of element in the interface to instigate participants to figure out themselves where should they click.

A badly written scenario would be:

> :x:
>
> Edit your profile picture to a newer one.

This scenario is not well contextualized. In case the button for editing the profile picture is called "Edit", it suggests where the participant should click.

For this situation, a good example of a scenario could be:

> :heavy_check_mark:
>
> You received an e-mail asking you to update your personal information because your profile picture is outdated. Please, change your profile picture to a newer one.

This scenario puts a reason for doing the action on the application and does not suggest the participant click on "Edit" instantly.

For each scenario, also write down the participant's expected behavior:

> Expected behavior: Click on the user icon, choose "Profile Settings" in the dropdown menu and click "Edit".

Once you have finished designing your test, test the test: review it by running the test like you expect the participants to do. This is important to check if the test flow and tasks make sense.

## 2. Running the test sessions

### Participants

Find some participants accordingly to the profile requirements. Usually, 5 participants are enough for each user profile required in the test iteration, 7 are ideal and 10 or more is a waste of time. Collect some data from the participants, like their familiarity with similar software, or their technical background: it can be useful later to evaluate results.

### Preparation

Set the environment up like described on the test requirements. Run the test like it is expected from the participants, so that you'll know what you have to pay attention to.

Start the session by providing context to the participant on what the software is about and what the tests are for. It's a good idea to ask the participant permission to record the session so that you can focus on observing the task execution and rewatch the session later or show the videos to the software designers.

Encourage the participant to think aloud, telling what they are looking for, what they are trying to do, to help you follow their rationale. It is common that sometimes they forget to think aloud, so you can ask questions about what they are doing to remind them.

Explain how the session is going to be, and make it clear for the participant that what is being tested is the software, not their knowledge or technology skills, so if they fail, it's the interface fault. Allow them to give up on a task if they are stuck and can't figure it out.

Explicitly tell the participant that you expect them to be honest and that you won't be offended if the interface is not good.

### Test execution

For each scenario, read it aloud to the participant and watch they interact with the interface. Don't give hints, let the participant try on their own. If they ask questions, guide them with other questions, be careful not to bias the test result by helping the participant.

After each scenario, you can ask some follow-up questions to gather some information that may come up only when the task is finished, like "where were you expecting to find that button first?", "which icon were you looking for?".

During the test, besides observing the participant interacting with the interface, pay attention to thoose other aspects to ellaborate the test report later:
* Execution time;
* Amount of mistakes;
* Impressions;
* Comments;
* Peculiar or dissonant behaviors;
* Spontaneous suggestions.

### Concluding the test

When you finish all the tests, thank the participant for their inputs and how valuable they were and explain about what you were testing. Some participants can start giving you other feedbacks that were not your focus in the test because they want to be helpful, so making it clear your goals and that the test is over is important to avoid this.

## 3. Reporting results

Add your results to the corresponding issue comments. Once all the tests are finished, add the conclusions to the issue description.

Make sure to differentiate results considering user profiles, if you have more than one.

### Result analysis

Reporting the results well is essential for addressing usability problems and having useful insight to make improvements, especially when other people are going to read the report to work on the next design version. Write about what went well and what were the challenges, describe how the participants felt, what did they try and why.

> What went well?
>
> Participants intuitively clicked on the "?" icon to find the help documentation.

> What were the challenges?
>
> Some participants didn't understand how to create a new blog post inside a folder, they first created the post and then edited the folder to include the post inside of it. They said they were looking for a select input to choose where the blog post should be placed instead of a folder icon.

Add your notes about the aspects mentioned above that you observed (execution time, amount of mistakes, impressions, comments, peculiar or dissonant behaviors, and spontaneous suggestions).

Use screenshots to illustrate better your description, GIFs, or videos.

### Summarizing results

For each task, write down the number of participants who were able to complete the task and the number of participants who weren't. Use the raw number of participants who failed or succeeded, **do not use percentages**: it is not a good measure for a small amount of participants.