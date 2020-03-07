# homework-9

## About the Application

This application helps managers to make a visual organization of his team. By answering the questions provided by the system, the manager will be able to give the information needed to create the team structure in HTML. The team members are separated into cards that have essential pieces of information from this professional.


## Java Script

The application runs in Node.JS. It requires three modules to run the application:

* Inquirer: A promise that allows us to interact with the user and use its information in other functions.
* FS: Allow the application to create files, in this case, an HTML file.
* Axios: Connects with the Github API.

Using the inquirer module, the application makes questions related to the user's team, such as the manager's name, id, engineer Github username, etc.

After the function gets the answer, it inserts in an HTML string. The string is then pushed to an array located in the global scope. The array is then transformed in a string again through the method Split. Then the method FS generates the HTML file, which will display a visual representation of the manager's team with all the information provided.

The API is called through getting the user's ID, adding it to the URL, and requesting the API using Axios. The information returned to Github id and email) is then inserted in an HTML string and also pushed to an array.