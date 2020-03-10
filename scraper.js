const tr = require('tor-request');
const cheerio = require('cheerio');
const fs = require("fs");

tr.TorControlPort.password = "blabla";

tr.renewTorSession((error, msg) => {
    // console.log(error);
    // console.log(msg);
    if(msg) {
        console.log(msg)
    }
});

tr.request('https://api.ipify.org', (error, response, body) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Current IP is ', body);
    }
});

// // Print Tor ip
// function torIp () {

// 	tr.request('https://api.ipify.org/', function(error, response, body) {
// 		// console.log('error:', error); // Print the error if one ocurred
// 		// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 		// console.log('body:', body); // Print the HTML for the Google homepage

// 		if (!error && response.statusCode == 200) {
// 			console.log("Your public IP is: " + body)
// 		}
// 	});
// }

// Print current IP
// torIp()

// Renew to new IP


// tor request for Zilok
tr.request('https://fr.zilok.com/c-501300400-location/pianos-et-claviers/w-Lyon', (err, resp, html) => {
    if(!err) {
        const $ = cheerio.load(html)

        const date = new Date()
        let todayDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        let todayHour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        console.log('\n')
        console.log('---------- Début du script ----------')
        console.log('\n')
        console.log('Date à laquelle le script a été lancé: ' + todayDate + ' à ' + todayHour)

        // Number of results find 
        let nbResultsFind = $('div.lead tbody').find('tr.result').length

        // All the results in html
        let resultsHtml = $('div.lead tbody').html()

        // Tableau comprenant tout les items trouvé (synthetiseur)
        let allItem = []

        for(let i = 1; i <= nbResultsFind; i++) {

            // Line break
            console.log('\n')

            let item = {}
            let itemJson

            // Print the number of the result
            console.log("result " + i + ": ")
            // console.log($('div.lead tbody tr#result-' + i).html())

            // Title of the item
            item.title = $('div.lead tbody tr#result-' + i + ' ' + '.item-title').text()
            console.log('Title: ', item.title)

            // sub-title of the item
            item.subTitle = $('div.lead tbody tr#result-' + i + ' ' + 'p.item-excerpt').text()
            console.log('subTitle: ', item.subTitle)

            // url of the item for more information
            item.url = $('div.lead tbody tr#result-' + i + ' ' + '.item-title').find('a').attr('href')
            console.log('urlHtml: ', item.url)

            // item distance from Lyon
            item.distance = $('div.lead tbody tr#result-' + i + ' ' + '.result-location .item-distance').text()
            console.log('Distance de Lyon: ', item.distance)

            // item address (postal code and city)
            item.adress = $('div.lead tbody tr#result-' + i + ' ' + '.result-location .item-address').text()
            item.postalCode = item.adress.slice(0, 5)
            console.log('Code Postale: ', item.postalCode)
            
            item.city = item.adress.slice(5, item.adress.length)
                console.log('Ville: ', item.city)

                item.price = $('div.lead tbody tr#result-' + i + ' ' + '.result-info .item-price').text()
                console.log('Prix: ', item.price)

                console.log('\n')

            allItem.push(item)
        }

        itemJson = JSON.stringify(allItem)
            console.log(itemJson)
            fs.writeFileSync("itemFile", itemJson, "UTF-8")


        console.log(allItem)

        console.log('\n')
            console.log('---------- Fin du script ----------')
            console.log('\n')
    }
})