# Bajablast.live
### A user report based down detector for Taco Bell's Baja Blast Freeze.
<p>
  <img src="https://raw.githubusercontent.com/gurubac/Baja-Blast-DD/main/public/img/HomepageScreenshot.png" />
    <img src="https://raw.githubusercontent.com/gurubac/Baja-Blast-DD/main/public/img/ResultsScreenshot.png" />
</p>

## What is it? How do you use it?
Bajablast.live is a website that displays the current status of the Baja Blast Freeze machine at a specific Taco Bell Location. Because there is no API for the Baja Blast machine, we decided to opt for a community driven, user reporting system to determine machine status. 

Users begin by searching for a Taco Bell location using the search bar, and can optionally use the embedded Google map to find the nearest Taco bell location. Once an address is clicked, users are directed to a page where they can view the most recent user submitted. Users can also choose to add to the recent results by clicking a button indicating if the machine is or is not working. 
## Why? What problem did this solve?
One of the main reasons for going to Taco Bell is to get a Baja Blast Freeze. However, you only know whether or not the freeze machine is working once you order. The machine could be in the process of mixing the syrup, freezing the drink to turn it into the slushy state, or just not working at all. It isn't uncommon to go to Taco Bell with the intention of getting a Baja Blast Freeze only to return empty handed because the freeze machine was not ready to serve/not working. Wouldn't it be nice to know whether or not the freeze machine was working before you go? That's the problem we aimed to solve. 

## Are all Taco Bell locations supported?
Currently we have over 6,000 locations supported in the United States and we will continue to add more, as users can submit requests for newer locations that just opened up through our contact page.

## How did you make it? What did you use?
It took us about a month to develop. For languages, we used Javascript and HTML/CSS.

**Our full tech stack includes:**

**Node.js** - Our runtime enviroment.

**Bootstrap Studio** - To design and create our webpages.

**GIMP** -  To edit photos used on the site as well as create designs for webpages. 

**EJS (Embedded JavaScript)** - To generate elements of our HTML webpages while using JS to display dynamic data, such as the recent results. We also used EJS partials for the header and footer, as well as google analytics code.

**Express.js** - Server Routing and Rendering EJS pages to client.

**MongoDB** - To store address of Taco Bell restaurant and machine status (working/not working + timestamp) information.

**Moment JS** - To add timestamps to machine status submissions.

**Google Maps API** - Displays Taco Bell locations close to the user in an embedded map on the home page. 

**NodeMailer** - To receive emails from users for the Contact page. We can recieve suggestions or comments whether or not a user chooses to input a legitimate email. This is done through a dummy email sending to our actual email.

## What's Next? 
Adding support for other flavors of the freeze would be nice. 