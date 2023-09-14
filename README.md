# Monorepo
This is a proof-of-concept showing how to use a monorepo to deploy to different projects onto different instances of App Engine (thus, in different projects)

# Steps
## Create the projects in the monorepo
Before anything, first create your projects. In each, create the files necessary for Cloud Build and App Engine. At least for this repository, `app.yaml` and `cloudbuild.yaml` is all that is needed. When installing and deploying, be sure to point to the path of the specific project. See the two files in `project-1/` or `project-2/` for examples.

## Cloud Build
### Create Triggers
Under "Event", choose "Webbhook event". We will be using this in our GitHub Action to invoke this trigger. If you click "SHOW URL PREVIEW", you will see the Webhook URL you will need to call. "Configuration" > "Location", choose "Repository". Then, point to the `cloudbuild.yaml` under the particular project that you want this instance of App Engine to contain (for example, `/project-1/cloudbuild.yaml`). Then save after filling out all of the other necessary information. Repeat this for as many projects you wish to deploy.

### Grant Permissions
In "Settings", enable permissions for "App Engine Admin".

## Create GitHub Secrets
The webhook needs API keys (the API key and the secret API key) in order for it to work, which need to be kept private. In the GitHub repository page, navigate to "Settings" > "Secrets and variables" > "Actions". Create an environment, naming it whatever you want. Then, create secrets holding the API keys. You can see the API keys in the webhook URL. Do this for all triggers that you have created.

## Create GitHub Actions
Create a folder in the root directory named `.github`. Then, create a folder in `.github` named `workflows`. `.github/workflows/` will contain the GitHub Actions. See the files in this repository for how to format them. Be sure to replace portions as needed.

## Run the actions
At this point, set up is finished. Once the conditions for an action has been met, the action will run, which in this case, runs the respective trigger in Cloud Build, which will deploy the respective project onto App Engine.