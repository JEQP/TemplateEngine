# Team Template Engine

This allows people to enter information via the command line interface and automatically generates a HTML page of the information. 

The program is started with "node cli2.js", and by following a series of prompts the user can enter data on three types of employees: Managers, Engineers, and Interns.
The fields include name, ID, e-mail, and role-specific fields of office number, Github username, and school.
Validation is performed on the input to ensure the responses are valid. 
Once finished, the program automatically generates a HTML page saved under the name of the first employee entered, in an output folder. The title of the page will also include the name of the first employee entered. 

PLEASE NOTE: The program runs under cli2.js, and *not* cli.js -- this is an earlier version that did not use classes, and lacks validation. 

![Screenshot of final product](https://github.com/JEQP/TemplateEngine/blob/master/teamtemplate.jpg "Screenshot of final product")

