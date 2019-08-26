var axios = require('axios');
var cheerio = require('cheerio');

module.exports = async function() {
  var url = 'https://intranet.embl.de/communication_outreach/internal_news/2019/index.html';
  return new Promise((resolve, reject) => {
    // go get it
    axios.get(url).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      let devtoList = [];

      $('.component_newsList').each(function(i, elem) {
        devtoList[i] = {
          title: $(this)
            .find('div p span.title')
            .text()
            .trim(),
          description: $(this)
            .find('div p span.description')
            .text()
            .trim(),
          url: $(this)
            .find('div p a')
            .attr('href'),
          date: $(this)
            .find('div p span.place_date')
            .text()
            .trim(),
          image: $(this)
            .find('a img')
            .attr('src'),
        };
      });


      const devtoListTrimmed = devtoList.filter(n => n != undefined);
      // we've giot all the data now. So resolve the promise to return the data
      // we've giot all the data now. So resolve the promise to return the data
      resolve({ items: devtoListTrimmed.slice(0,2)  });
    })
    .catch((error) => {
      // return a stub so build can continue
      resolve({ items: []  });

      console.log(error);
    });
  }); //end promise
};
