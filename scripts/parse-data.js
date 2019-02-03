const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");

const stations = [];

const fixName = name =>
  name
    .replace(" LU", " – London Underground")
    .replace(" NR", " – National Rail")
    .replace("(", " (")
    .replace("St ", "St. ")
    .replace("  ", " ");

const stationObject = (name, zone) => ({
  name: fixName(name),
  zone: zone.replace("zone_", ""),
});

settings.dataSets.forEach(key => {
  try {
    const body = fs.readFileSync(`${__dirname}/data/${key}.html`, "UTF-8");
    const $ = cheerio.load(body);
    const table = $("table.wikitable.sortable").parent();
    const tableDataTrs = $(table).find("tbody tr");
    tableDataTrs.each((i, tr) => {
      const data = $(tr)
        .children()
        .toArray()
        .map(td =>
          $(td)
            .text()
            .trim()
        );

      if (key !== "zones_7–W") {
        const [name] = data;

        if (name !== "Station") {
          stations.push(stationObject(name, key));

          console.log("pushed", fixName(name));
        }
      } else {
        const [name, services, auth, z07, z08, z10, z13, z15, z16] = data;
        let zone;

        if (z16 === "6 & 7") {
          zone = `zone_7`;
        } else {
          zone = `zone_${z16}`;
        }

        if (name !== "Station") {
          stations.push(stationObject(name, zone));

          console.log("pushed", fixName(name));
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

fs.writeFileSync(
  `${__dirname}/../src/stations.json`,
  JSON.stringify(stations),
  "UTF-8"
);
