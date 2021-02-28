# SES Website Code Challenge for 2021
Here's the challenge for anyone hoping to add their design to the [SES website](https://ses.jkuat.ac.ke).

### This challenge is due at 0900hr EAT on 30th March 2021

## Rules

Your submission will be reviewed by the committe heads. We take your experience level into consideration when reviewing.

We value quality over completeness. If you decide to leave things out, please call attention to it in your project's `README`.

Our assessment covers the following areas:

-   A correct fork, branch and pull request.
-   We will use github timestamp
-	Architecture - How have you decided to structure your app? Is there good separation of concerns?
-	Code quality - Are you following good coding practices? Is your code easy to follow and maintain? Is it testable?
-	Correctness - Does your application work? Does it meet the functional spec?
-	Technical choices - Are your choices of libraries, packages, and tooling appropriate?

Bonus points:

-	Testing - Is there adequate test coverage?
-	UX - Is your project easy to use and understand?

## Functional spec

Check out how the current [website](https://ses.jkuat.ac.ke) works


## Task
With the asssumption that you are using frontend framework of your choice redesign the [SES website](https://ses.jkuat.ac.ke). Check out the following guidelines:
- You host the site on either heroku, netlify, github pages or the site of your choice.
- Perfomance and speed is essential
- For content use the content that is in the [current website](https://ses.jkuat.ac.ke)

### Areas to redesign

**Home**

- [ ] Make it look like a landing site
- [ ] Remove unnecessary clutter
- [ ] Add pictures for various commmitte heads
- [ ] Remove navigation bar above the footer

**About**
- [ ] Ses gallery to load efficiently
- [ ] A way of updating the gallery
- [ ] Ses committee to be available.
- [ ] Ses committee to have profile picture, current position, linkedin link and twitter link

**Events**
- [ ] Update the events timeline.
- [ ] Provide form for notification via email address.

**Membership**
- [ ] Remove alumni and testimonies

**Projects**
- [ ] Add a small description of each project.
- [ ] Provide links for individual project content

**Contact us**
- [ ] Update the map.
- [ ] Make feedback button clear.
- [ ] Center the contents.
- [ ] Provide accurate links for the various external links.

### Areas for new design
**Yearly Archive**
- [ ] Archive for the various members profile photos.
- [ ] The position they held.
- [ ] Events in that year.

### Additional areas
**Blog**
- [ ] Make it have same design as the parent website.
- [ ] Clone medium, so that one can be able to create profile, write a blogs and get user feedback via comments and claps.
- [ ] Make it a better place.



### Technical spec

Choose one of the following technical tracks to build the functionality described in the Functional spec that best suits your skill set:

-	Back-end track: build a REST API and include a minimal front-end (e.g. a browsable API)
-	Front-end track: build your project as a purely client-side app
-	Full Stack: blend the former approaches, but be sure to demonstrate your competence across the stack

#### Back-end

Your task is to build a REST API that can support the functionality of the site. Your project can be built using any API framework/language, though we encourage the use of [Django Rest Framework](http://www.django-rest-framework.org/)/Python. Your API should be able to:

-   Perform CRUD actions for the gallery page, blog page, archive page, events page and about page.
-   Perform analytics from the page e.g number of visits per day, user location

You do not have to build a functional UI unless you want to show off your talents across the stack. We will test your API by using the Browsable API. You are encouraged to write tests to verify your own results.

#### Front-end

Your project can be built using any JavaScript or CSS framework, though we encourage ReactJS, Redux and CSS/SCSS. You are also welcome to use our [React-ions library](https://www.npmjs.com/package/react-ions) to help build your UI.

Alternatively, feel free to swap out similar JavaScript frameworks such as Angular and UI kits such as Bootstrap. In addition to building the application.

#### README

In your repo, please include the following items in your README:

-	Whether the solution focuses on back-end, front-end or full stack.
-	Reasoning behind your technical choices, including architecture.
-	Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
-	Link to the hosted application (where applicable).

This will give us insight into how you approached the challenge.

### Tips
- Comment your code to show your thought process
- Submit this web design as a directory in your pull request named "{yourname_Task}"
- Make sure your have deployed your site to [netlify](https://www.netlify.com/), [heroku](https://www.heroku.com) or [github pages](https://pages.github.com/)

### Resources
- [Deploying site to heroku](https://blog.teamtreehouse.com/deploy-static-site-heroku)
- [Deploying site to netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
- [Deploying site to github page](https://docs.github.com/en/github/working-with-github-pages)
- Another reference for [github pages](https://medium.com/pan-labs/dynamic-web-apps-on-github-pages-for-free-ffac2b776d45)

### Working on the Challenge

1. Fork the code challenge repository provided.

2. Make a topic branch. In your github, keep the master branch clean. Pull all changes, make sure your repository is up to date.
```shell
cd WebsiteChallenge2021
git pull origin main
```

3. Create a new branch as follows
```shell
git checkout -b rodney_osodo main
```

4. See all branches created
```shell
$ git branch
    main
* rodney_osodo
```

5. Push the new branch to github
```shell
$ git push origin -u rodney_osodo
```

6. Make changes to the fork following the Challenge provided.

7. Check the status of the repo
```shell
git status
```
8. Add your changed files
```shell
git add .
```
9. Commit your changes
```shell
git commit -m "Commit message 😇"
```
10. Push your code changes
```shell
git push --set-upstream origin rodney_osodo
```
8. Make a [pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) to the sesWebsiteChallenge2021 Repo.


**Submissions later than  0900hr EAT on 30th March 2021 will not be considered**
