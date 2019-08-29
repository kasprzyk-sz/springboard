var axios = require('axios');
var toJSON = require('xml2js').parseString;

var url = 'http://www-db.embl.de/jss/EmblGroupsCMS/events_0?dutystation=1&timeFrame=FUTURE&seminarTypeID=0';

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        // turn the feed XML into JSON
        toJSON(response.data, function(err, result) {

          // create a path for each item based on Medium's guid URL
          // result.events.forEach(element => {
          //     seminar_names['element'] = element
          // });
          var seminars = [];
          //create a path for each item based on Medium's guid URL
          result['events']['seminars'][0]['seminar'].forEach(element => {
            var item = {
              'org_name': element.emblOrgName[0],
              'color': element.color[0],
              'title': element.title[0],
              'date': element.date[0],
              'room': element.room[0],
              'firstname': element.firstname[0],
              'name': element.name[0]

            }

            seminars.push(item);

          });

          console.log(seminars);


          resolve({
            'url': url,
            'items': seminars.slice(0,5) // get the first 3 only
          });
        });
      })
      .catch((error) => {

        // return a stub so build can continue
        resolve({
          'url': url,
          'items': []
        });

        console.log(error);
      });
  });
};
