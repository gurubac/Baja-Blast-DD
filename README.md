# Bajablast.live
## A user report based down detector for Taco Bell's Baja Blast Freeze.
<p>
  <img src="https://raw.githubusercontent.com/gurubac/Baja-Blast-DD/main/public/img/HomepageScreenshot.png" />
    <img src="https://raw.githubusercontent.com/gurubac/Baja-Blast-DD/main/public/img/ResultsScreenshot.png" />
</p>

## What is it? How do you use it?
Bajablast.live is a website that displays the current status of the Baja Blast Freeze machine at a specific Taco Bell Location. Because there is no API for the Baja Blast machine, we decided to opt for a community driven, user reporting system to determine machine status. 

Users begin by searching for a Taco Bell location using the search bar, and can optionally use the embedded Google map to find the nearest Taco bell location. Once an address is clicked, users are directed to a page where they can view the most recent user submitted. Users can also choose to add to the recent results by clicking a button indicating if the machine is or is not working.

## Why? What problem did this solve?
One of the main reasons for going to Taco Bell is to get a Baja Blast Freeze. However, you only know whether or not the freeze machine is working once you order. It isn't uncommon to go to Taco Bell with the intention of getting a Baja Blast Freeze only to return empty handed because the freeze machine was not working. Wouldn't it be nice to know whether or not the freeze machine was working before you go? That's the problem we aimed to solve. 

## How did you make it? What did you use?
It took us about a month to develop. For languages, we used Javascript, HTML, and CSS.
We also used:

node.js - To run our code

Express.js - To render our webpages

Bootstrap Studio - To create our webpages

MongoDB - To store data of address information, and data values of machine status.

EJS - To generate elements of our HTML webpages while using javascript, such as the recent results, navbar, and footer.

NodeMailer - To add support for the Contact page. We can recieve suggestions or comments whether or not a user chooses to attach an email. 

Moment JS - To add timestamps to machine status submissions.

GIMP -  To edit photos used on the site as well as create designs for webpages. 

## What's Next? 
Adding support for other drinks would be nice. 